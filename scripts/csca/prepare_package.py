"""Offline SQL proposal generator. Never loads credentials or connects to a database."""
import argparse
import collections
import csv
import hashlib
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "prisma/manual/csca"


def canonical(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def sha(value):
    return hashlib.sha256(value.encode()).hexdigest()


def scoped(sql):
    # SQL identifiers only; content and source hashes are never rewritten.
    sql = re.sub(r"\bcsca_", "saturday_csca_", sql)
    return sql.replace("csca-result", "saturday-csca-result").replace("csca-team-result", "saturday-csca-team-result")


def body(sql):
    return "\n".join(line for line in sql.splitlines()
                     if line.strip() not in ("BEGIN;", "COMMIT;")
                     and not line.startswith("SET LOCAL ")
                     and not line.startswith("NOTIFY pgrst"))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=Path("/home/linux/think-asia"))
    args = parser.parse_args()
    review = args.source / "reviews/csca"
    latest = review / "2026-11-01-database-svg"
    content = json.loads((latest / "content.PRIVATE.json").read_text())
    release = json.loads((latest / "release.json").read_text())
    questions, keys = content["questions"], content["answer_keys"]
    keymap = {key["question_id"]: key for key in keys}
    assert len(questions) == len(keys) == len(keymap) == release["total"] == 1433
    assert len({q["question_id"] for q in questions}) == len(questions)
    assert dict(collections.Counter(q["subject_id"] for q in questions)) == release["counts"]
    assert sum(q["diagram_svg"] is not None for q in questions) == release["svg_count"] == 36
    for q in questions:
        clean = {k: v for k, v in q.items() if k != "content_sha256"}
        assert sha(canonical({"question": clean, "answer_key": keymap[q["question_id"]]})) == q["content_sha256"]
        assert {o["key"] for o in q["options"]} == set("ABCD")
        assert keymap[q["question_id"]]["correct_option"] in "ABCD"
        if q["diagram_svg"]:
            assert sha(q["diagram_svg"]) == q["diagram_sha256"]
    parent = json.loads((review / "2026-11-01-math-diagrams-round2/release.json").read_text())
    assert sha(canonical({"format_version": 2, "parent_manifest": parent["manifest_sha256"],
                          "questions": questions, "answer_keys": keys})) == release["manifest_sha256"]

    sources = ["supabase-proposal/schema.proposed.sql", "supabase-integration/session-rpcs.proposed.sql",
               "contact-email-proposal/contact-email.proposed.sql", "full-paper-proposal/full-paper.proposed.sql",
               "team-result-notification/01-team-notification.proposed.sql"]
    sections = [scoped(body((review / p).read_text())) for p in sources]
    svg = (latest / "01-store-svg.proposed.sql").read_text()
    # Only the diagram DDL/projection; omit the historical clone/import entirely.
    svg = svg[svg.index("ALTER TABLE public.csca_questions"):svg.index("LOCK TABLE public.csca_question_sets")]
    sections.append(scoped(svg))
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "01-schema-and-functions.sql").write_text(
        "-- OWNER-RUN PROPOSAL. Saturday-only objects. Fails on any name conflict.\n"
        "-- No question imports, activation, emails, jobs, or changes to Think Asia/IMAT.\n"
        "BEGIN;\nSET LOCAL lock_timeout='5s';\nSET LOCAL statement_timeout='90s';\n" +
        "\n\n".join(sections) + "\nNOTIFY pgrst,'reload schema';\nCOMMIT;\n")

    private = OUT / "private-import"
    private.mkdir(exist_ok=True)
    for old in private.glob("*.sql"):
        old.unlink()  # Only generated files in this private output folder.
    rid = release["new_release"]
    subjects = list(csv.DictReader((review / "supabase-proposal/import/01-subjects.csv").open()))
    def literal(value):
        text = canonical(value)
        assert "$csca_data$" not in text
        return "$csca_data$" + text + "$csca_data$::jsonb"
    header = f"""-- Private content import. Owner-run only. Remains DRAFT.
DO $import$
BEGIN
  IF EXISTS(SELECT 1 FROM public.saturday_csca_question_sets) THEN
    RAISE EXCEPTION 'Saturday release already exists. Verify before retrying; do not overwrite.';
  END IF;
  INSERT INTO public.saturday_csca_subjects SELECT * FROM jsonb_populate_recordset(NULL::public.saturday_csca_subjects,{literal(subjects)});
  INSERT INTO public.saturday_csca_question_sets(id,review_date,manifest_sha256,status,expected_counts)
    VALUES('{rid}','2026-11-01','{release['manifest_sha256']}','draft','{canonical(release['counts'])}'::jsonb);
END $import$;
"""
    (private / "00-release.sql").write_text(header)
    names = ["00-release.sql"]
    # Small, individually atomic DO statements for SQL Editor; psql wraps all in one transaction.
    for start in range(0, len(questions), 40):
        batch = questions[start:start + 40]
        qb = [dict(q, question_set_id=rid) for q in batch]
        kb = [dict(keymap[q["question_id"]], question_set_id=rid) for q in batch]
        qcols = ",".join(qb[0])
        kcols = ",".join(kb[0])
        sql = f"""-- Private batch {start // 40 + 1}; {len(batch)} questions and keys. Never public.
DO $import$
BEGIN
  INSERT INTO public.saturday_csca_questions({qcols})
    SELECT {qcols} FROM jsonb_populate_recordset(NULL::public.saturday_csca_questions,{literal(qb)});
  INSERT INTO public.saturday_csca_answer_keys({kcols})
    SELECT {kcols} FROM jsonb_populate_recordset(NULL::public.saturday_csca_answer_keys,{literal(kb)});
END $import$;
"""
        name = f"{start // 40 + 1:02d}-questions.sql"
        (private / name).write_text(sql)
        names.append(name)
    includes = "\n".join("\\ir " + name for name in names)
    (private / "import.psql").write_text(
        "\\set ON_ERROR_STOP on\nBEGIN;\nSET LOCAL statement_timeout='120s';\n" + includes +
        "\n\\ir ../02-verify.sql\nCOMMIT;\n")
    qfinger = hashlib.md5("\n".join(q["question_id"] + ":" + q["content_sha256"] for q in sorted(questions, key=lambda q: q["question_id"])).encode()).hexdigest()
    kfinger = hashlib.md5("\n".join(k["question_id"] + ":" + k["correct_option"] + ":" + k["explanation_text"] for k in sorted(keys, key=lambda k: k["question_id"])).encode()).hexdigest()
    (OUT / "02-verify.sql").write_text(f"""-- Read-only verification. No activation or test attempts.
DO $verify$
DECLARE item record; role_name text;
BEGIN
  IF (SELECT count(*) FROM public.saturday_csca_subjects)<>5
    OR (SELECT count(*) FROM public.saturday_csca_question_sets)<>1
    OR NOT EXISTS(SELECT 1 FROM public.saturday_csca_question_sets WHERE id='{rid}' AND status='draft' AND manifest_sha256='{release['manifest_sha256']}')
    OR (SELECT count(*) FROM public.saturday_csca_questions WHERE question_set_id='{rid}')<>1433
    OR (SELECT count(*) FROM public.saturday_csca_answer_keys WHERE question_set_id='{rid}')<>1433
    OR (SELECT count(*) FROM public.saturday_csca_questions WHERE question_set_id='{rid}' AND diagram_svg IS NOT NULL)<>36
    THEN RAISE EXCEPTION 'Draft content/count verification failed'; END IF;
  IF (SELECT md5(string_agg(question_id||':'||content_sha256,E'\\n' ORDER BY question_id COLLATE "C")) FROM public.saturday_csca_questions WHERE question_set_id='{rid}') IS DISTINCT FROM '{qfinger}'
    OR (SELECT md5(string_agg(question_id||':'||correct_option||':'||explanation_text,E'\\n' ORDER BY question_id COLLATE "C")) FROM public.saturday_csca_answer_keys WHERE question_set_id='{rid}') IS DISTINCT FROM '{kfinger}'
    THEN RAISE EXCEPTION 'Content/key fingerprint mismatch'; END IF;
  IF (SELECT count(*) FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' AND c.relkind='r' AND left(c.relname,14)='saturday_csca_')<>9 THEN RAISE EXCEPTION 'Expected nine Saturday tables'; END IF;
  FOR item IN SELECT c.oid,c.relname,c.relrowsecurity FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
    WHERE n.nspname='public' AND c.relkind='r' AND left(c.relname,14)='saturday_csca_' LOOP
    IF NOT item.relrowsecurity THEN RAISE EXCEPTION 'RLS disabled: %',item.relname; END IF;
    FOREACH role_name IN ARRAY ARRAY['anon','authenticated'] LOOP
      IF has_table_privilege(role_name,item.oid,'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER') THEN RAISE EXCEPTION 'Browser table access: %',item.relname; END IF;
    END LOOP;
    IF NOT has_table_privilege('service_role',item.oid,'SELECT') OR has_table_privilege('service_role',item.oid,'DELETE,TRUNCATE') THEN RAISE EXCEPTION 'Incorrect service access: %',item.relname; END IF;
  END LOOP;
  FOR item IN SELECT p.oid,p.proname FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
    WHERE n.nspname='public' AND left(p.proname,14)='saturday_csca_' LOOP
    IF has_function_privilege('anon',item.oid,'EXECUTE') OR has_function_privilege('authenticated',item.oid,'EXECUTE') THEN RAISE EXCEPTION 'Browser RPC access: %',item.proname; END IF;
  END LOOP;
END $verify$;
SELECT subject_id,count(*) AS questions,count(diagram_svg) AS diagrams FROM public.saturday_csca_questions GROUP BY subject_id ORDER BY subject_id;
SELECT id,status,manifest_sha256 FROM public.saturday_csca_question_sets;
""")
    source_hashes = {p: hashlib.sha256((review / p).read_bytes()).hexdigest() for p in sources}
    for p in ["2026-11-01-database-svg/01-store-svg.proposed.sql",
              "2026-11-01-database-svg/content.PRIVATE.json", "2026-11-01-database-svg/release.json",
              "supabase-proposal/import/01-subjects.csv"]:
        source_hashes[p] = hashlib.sha256((review / p).read_bytes()).hexdigest()
    manifest = {"source": str(args.source), "release": rid, "manifest_sha256": release["manifest_sha256"],
                "counts": release["counts"], "total": len(questions), "diagrams": 36,
                "database_prefix": "saturday_csca_", "sources": source_hashes,
                "private_files": {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(private.iterdir()) if p.is_file()}}
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Prepared draft {rid}: {len(questions)} questions, {len(keys)} keys, 36 diagrams; no network/database access.")


if __name__ == "__main__":
    main()

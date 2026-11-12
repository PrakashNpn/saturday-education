# Manual Supabase database backup

Run these commands yourself in a terminal, not in Supabase SQL Editor. They read the database; they do not migrate or modify it. No credentials belong in this repository.

Install PostgreSQL client tools (`pg_dump` and `pg_restore`). Use the same PostgreSQL major version as the Supabase server, or a newer supported client. Check the client with `pg_dump --version`; the server version is shown in Supabase, or can be read using `SHOW server_version;` in SQL Editor.

In Supabase, open **Connect → Session pooler** and copy the host and username. Use session mode on port **5432**, not the transaction pooler on 6543. The username normally looks like `postgres.PROJECT_REF`. The direct connection also works when your network supports its address family; its username is normally `postgres`.

Replace the two placeholders below. The command prompts for the **database password**, keeping it out of shell history. The output is a compressed PostgreSQL custom archive of database schemas and data, including application tables, functions, indexes, grants and RLS policies. It is deliberately stored outside the repository.

```bash
umask 077
mkdir -p "$HOME/saturday-education-backups"
backup_file="$HOME/saturday-education-backups/saturday-$(date +%Y%m%d-%H%M%S).dump"

PGSSLMODE=require pg_dump \
  --host='YOUR_SESSION_POOLER_HOST' \
  --port=5432 \
  --username='postgres.YOUR_PROJECT_REF' \
  --dbname='postgres' \
  --password \
  --format=custom \
  --verbose \
  --file="$backup_file" \
  && pg_restore --list "$backup_file" > "$backup_file.contents.txt" \
  && sha256sum "$backup_file" > "$backup_file.sha256" \
  && echo "Backup completed: $backup_file"
```

If `pg_dump` reports any error, do not treat its partial output as a completed backup. `pg_restore --list` checks the archive's table of contents, not every data block or restore compatibility. A full restore into a separate disposable database is the stronger verification; never test restoration against production.

This is a logical database backup, **not a complete Supabase project backup**. Database roles are cluster-wide and are not included by `pg_dump`. Storage bucket files, project secrets/settings and externally hosted assets need separate backups. Storage metadata alone does not contain uploaded files. Keep the owner’s research archive and the application’s `public/images/imat` assets as well. Restoring into another managed Supabase project may require its supported migration procedure for managed schemas and roles.

Documentation: [Supabase database connections](https://supabase.com/docs/guides/database/connecting-to-postgres), [Supabase backup and restore](https://supabase.com/docs/guides/platform/migrating-within-supabase/backup-restore), [PostgreSQL pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html).

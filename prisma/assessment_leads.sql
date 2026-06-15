-- Run this on Supabase (SQL editor) to create the combined assessment_leads table.
-- Mirrors the AssessmentLead model in prisma/schema.prisma. The "ConsultationStatus"
-- enum already exists (used by consultations / career_leads).

create table if not exists public.assessment_leads (
  id                       text primary key,
  full_name                text not null,
  email                    text not null,
  phone                    text,
  education_level          text,
  preferred_country        text,

  holland_code             text not null,
  riasec_scores            jsonb not null,
  big_five_scores          jsonb not null,
  aptitude_scores          jsonb not null,
  aptitude_overall         integer not null,
  recommended_fields       jsonb not null,
  recommended_universities jsonb not null,
  raw_answers              jsonb not null,
  ai_brief                 text,

  status                   "ConsultationStatus" not null default 'NEW',
  source                   text default 'assessment',

  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create index if not exists assessment_leads_status_idx     on public.assessment_leads (status);
create index if not exists assessment_leads_created_at_idx on public.assessment_leads (created_at);
create index if not exists assessment_leads_email_idx      on public.assessment_leads (email);

-- Match what you did for career_leads: enable RLS so anon/public cannot read leads.
-- The app writes via the Prisma/service connection (which bypasses RLS).
alter table public.assessment_leads enable row level security;

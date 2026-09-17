create table if not exists projects (
  id text primary key,
  name text not null,
  district text not null,
  reported_progress integer not null default 0 check (reported_progress between 0 and 100),
  status text not null default 'normal',
  last_evidence_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists field_evidence (
  id uuid primary key default gen_random_uuid(),
  project_id text not null references projects(id) on delete cascade,
  inspector_name text not null,
  observation text,
  latitude double precision,
  longitude double precision,
  captured_at timestamptz not null default now(),
  image_path text,
  created_at timestamptz not null default now()
);

create table if not exists inspection_actions (
  id uuid primary key default gen_random_uuid(),
  project_id text not null references projects(id) on delete cascade,
  action text not null,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists field_evidence_project_idx on field_evidence(project_id, captured_at desc);
create index if not exists inspection_actions_project_idx on inspection_actions(project_id, created_at desc);

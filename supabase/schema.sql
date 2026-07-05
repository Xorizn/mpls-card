-- =====================================================================
--  MPLS Card — Supabase schema
--  Jalankan di dashboard Supabase → SQL Editor (sekali saja).
-- =====================================================================

-- 1) Tabel konten (satu baris, id = 1) --------------------------------
create table if not exists public.site_content (
  id         integer primary key default 1,
  data       jsonb   not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint site_content_single_row check (id = 1)
);

alter table public.site_content enable row level security;

-- Semua orang boleh membaca (halaman publik).
drop policy if exists "site_content read" on public.site_content;
create policy "site_content read"
  on public.site_content for select
  using (true);

-- Hanya user login yang boleh menulis (admin).
drop policy if exists "site_content insert" on public.site_content;
create policy "site_content insert"
  on public.site_content for insert
  to authenticated with check (true);

drop policy if exists "site_content update" on public.site_content;
create policy "site_content update"
  on public.site_content for update
  to authenticated using (true) with check (true);

-- Baris awal.
insert into public.site_content (id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

-- 2) Storage bucket untuk poster & logo -------------------------------
insert into storage.buckets (id, name, public)
values ('assets', 'assets', true)
on conflict (id) do nothing;

-- Publik boleh membaca file.
drop policy if exists "assets public read" on storage.objects;
create policy "assets public read"
  on storage.objects for select
  using (bucket_id = 'assets');

-- User login boleh upload / ubah / hapus.
drop policy if exists "assets auth insert" on storage.objects;
create policy "assets auth insert"
  on storage.objects for insert
  to authenticated with check (bucket_id = 'assets');

drop policy if exists "assets auth update" on storage.objects;
create policy "assets auth update"
  on storage.objects for update
  to authenticated using (bucket_id = 'assets');

drop policy if exists "assets auth delete" on storage.objects;
create policy "assets auth delete"
  on storage.objects for delete
  to authenticated using (bucket_id = 'assets');

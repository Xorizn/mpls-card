This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin & Supabase

Halaman publik (`/`) membaca isinya dari Supabase; jika Supabase belum
dikonfigurasi, halaman tetap tampil memakai isi bawaan (default). Halaman
editor ada di `/admin`.

### 1. Buat project Supabase

1. Buat project baru di [supabase.com](https://supabase.com).
2. Buka **SQL Editor**, tempel isi [`supabase/schema.sql`](supabase/schema.sql),
   lalu **Run**. Ini membuat tabel `site_content`, bucket storage `assets`,
   dan aturan akses (RLS).

### 2. Isi environment variables

Salin `.env.example` → `.env.local`, lalu isi dari **Project Settings → API**:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJ...   # "publishable"/anon key
```

Restart `npm run dev` setelah mengubah env.

### 3. Buat akun admin

Di dashboard Supabase → **Authentication → Users → Add user**, buat user
dengan email + password (aktifkan "Auto Confirm"). Login dengan akun itu di
`/admin/login`.

### 4. Edit

Buka `/admin`, ubah teks/link/poster/logo, upload gambar (tersimpan ke bucket
`assets`), lalu klik **Simpan**. Perubahan langsung tampil di `/`.

> Catatan: konvensi `middleware` Next.js diganti `proxy` di Next 16 —
> penjaga sesi & proteksi `/admin` ada di [`proxy.ts`](proxy.ts).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

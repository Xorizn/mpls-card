"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useTransition } from "react";
import type {
  SiteContent,
  Contact,
  GuideLink,
  LinkGroup,
  Social,
  SiteLogo,
  SocialPlatform,
} from "@/lib/content";
import { createClient } from "@/lib/supabase/client";
import { ASSETS_BUCKET, isSupabaseConfigured } from "@/lib/supabase/config";
import { saveContent, signOut } from "./actions";

async function uploadImage(file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop() || "png";
  const path = `uploads/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;
  const { error } = await supabase.storage
    .from(ASSETS_BUCKET)
    .upload(path, file, { upsert: true, cacheControl: "3600" });
  if (error) throw new Error(error.message);
  return supabase.storage.from(ASSETS_BUCKET).getPublicUrl(path).data.publicUrl;
}

/* ---------- small building blocks ---------- */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block font-mono text-[0.7rem] font-bold uppercase tracking-widest text-[var(--gold-deep)]">
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border-2 border-[var(--ink)] bg-white px-3 py-2 text-sm text-[var(--ink)] outline-none focus:border-[var(--gold-deep)]";

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        className={inputCls}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <textarea
        className={inputCls}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="nb-card p-5 sm:p-6">
      <h2 className="mb-4 font-display text-base font-bold uppercase text-[var(--ink)]">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function SmallButton({
  children,
  onClick,
  tone = "dark",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  tone?: "dark" | "danger";
  type?: "button" | "submit";
}) {
  const bg =
    tone === "danger"
      ? "bg-red-700 border-red-900"
      : "bg-[var(--ink)] border-[var(--ink)]";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg border-2 ${bg} px-3 py-1.5 font-mono text-xs font-bold uppercase text-[#fffdf5] transition hover:opacity-85`}
    >
      {children}
    </button>
  );
}

function ImagePicker({
  label,
  url,
  alt,
  onUrl,
  onAlt,
  onUploading,
}: {
  label: string;
  url: string;
  alt: string;
  onUrl: (v: string) => void;
  onAlt: (v: string) => void;
  onUploading: (busy: boolean) => void;
}) {
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(file?: File) {
    if (!file) return;
    setErr(null);
    setBusy(true);
    onUploading(true);
    try {
      const publicUrl = await uploadImage(file);
      onUrl(publicUrl);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload gagal");
    } finally {
      setBusy(false);
      onUploading(false);
    }
  }

  return (
    <div className="flex gap-4">
      <div className="flex h-24 w-24 flex-none items-center justify-center overflow-hidden rounded-lg border-2 border-[var(--ink)] bg-white">
        {url ? (
          <img src={url} alt={alt} className="h-full w-full object-contain" />
        ) : (
          <span className="text-[0.6rem] text-[var(--ink)]/50">Kosong</span>
        )}
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <Label>{label}</Label>
        <input
          type="file"
          accept="image/*"
          disabled={busy}
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="block w-full text-xs file:mr-3 file:rounded-md file:border-2 file:border-[var(--ink)] file:bg-[var(--gold)] file:px-2 file:py-1 file:font-mono file:text-xs file:font-bold"
        />
        <input
          className={inputCls}
          placeholder="atau tempel URL gambar"
          value={url}
          onChange={(e) => onUrl(e.target.value)}
        />
        <input
          className={inputCls}
          placeholder="Alt / deskripsi gambar"
          value={alt}
          onChange={(e) => onAlt(e.target.value)}
        />
        {busy && <p className="text-xs text-[var(--gold-deep)]">Mengunggah…</p>}
        {err && <p className="text-xs font-semibold text-red-700">{err}</p>}
      </div>
    </div>
  );
}

/* ---------- main editor ---------- */

export default function Editor({ initial }: { initial: SiteContent }) {
  const [c, setC] = useState<SiteContent>(initial);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function set<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setC((prev) => ({ ...prev, [key]: value }));
  }

  function save() {
    setStatus(null);
    startTransition(async () => {
      const res = await saveContent(c);
      setStatus(res.ok ? "✓ Tersimpan!" : "✗ " + (res.error ?? "Gagal"));
    });
  }

  /* array helpers */
  function updateItem<T>(
    key: keyof SiteContent,
    list: T[],
    i: number,
    patch: Partial<T>,
  ) {
    const next = list.map((it, idx) => (idx === i ? { ...it, ...patch } : it));
    set(key, next as SiteContent[typeof key]);
  }
  function removeItem<T>(key: keyof SiteContent, list: T[], i: number) {
    set(key, list.filter((_, idx) => idx !== i) as SiteContent[typeof key]);
  }
  function move<T>(key: keyof SiteContent, list: T[], i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    set(key, next as SiteContent[typeof key]);
  }

  /* link-group helpers (groups → links) */
  function updateGroup(gi: number, patch: Partial<LinkGroup>) {
    set(
      "linkGroups",
      c.linkGroups.map((g, i) => (i === gi ? { ...g, ...patch } : g)),
    );
  }
  function removeGroup(gi: number) {
    set(
      "linkGroups",
      c.linkGroups.filter((_, i) => i !== gi),
    );
  }
  function moveGroup(gi: number, dir: -1 | 1) {
    const j = gi + dir;
    if (j < 0 || j >= c.linkGroups.length) return;
    const next = [...c.linkGroups];
    [next[gi], next[j]] = [next[j], next[gi]];
    set("linkGroups", next);
  }
  function addGroup() {
    set("linkGroups", [...c.linkGroups, { title: "", links: [] }]);
  }
  function addLink(gi: number) {
    updateGroup(gi, {
      links: [...c.linkGroups[gi].links, { label: "", href: "" }],
    });
  }
  function updateLink(gi: number, li: number, patch: Partial<GuideLink>) {
    updateGroup(gi, {
      links: c.linkGroups[gi].links.map((l, i) =>
        i === li ? { ...l, ...patch } : l,
      ),
    });
  }
  function removeLink(gi: number, li: number) {
    updateGroup(gi, {
      links: c.linkGroups[gi].links.filter((_, i) => i !== li),
    });
  }
  function moveLink(gi: number, li: number, dir: -1 | 1) {
    const links = c.linkGroups[gi].links;
    const j = li + dir;
    if (j < 0 || j >= links.length) return;
    const next = [...links];
    [next[li], next[j]] = [next[j], next[li]];
    updateGroup(gi, { links: next });
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      {/* header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="headline-gradient font-display text-2xl font-extrabold uppercase">
            Editor Halaman
          </h1>
          <p className="text-sm text-[var(--ink)]/70">
            Ubah isi, lalu klik Simpan.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            className="rounded-lg border-2 border-[var(--ink)] bg-white px-3 py-1.5 font-mono text-xs font-bold uppercase text-[var(--ink)] hover:bg-[var(--gold)]/30"
          >
            Lihat Halaman
          </a>
          <form action={signOut}>
            <SmallButton type="submit" tone="danger">
              Keluar
            </SmallButton>
          </form>
        </div>
      </div>

      {!isSupabaseConfigured && (
        <div className="mb-4 rounded-lg border-2 border-[var(--ink)] bg-[var(--gold)]/40 px-3 py-2 text-xs font-semibold text-[var(--ink)]">
          Supabase belum dikonfigurasi — perubahan tidak akan tersimpan sampai
          env diisi.
        </div>
      )}

      <div className="space-y-6">
        {/* HERO / TITLE */}
        <Card title="Judul & Tema">
          <TextField
            label="Teks sambutan"
            value={c.welcomeText}
            onChange={(v) => set("welcomeText", v)}
          />
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Judul baris 1"
              value={c.titleLine1}
              onChange={(v) => set("titleLine1", v)}
            />
            <TextField
              label="Judul baris 2"
              value={c.titleLine2}
              onChange={(v) => set("titleLine2", v)}
            />
          </div>
          <TextArea
            label="Tema (kutipan)"
            rows={2}
            value={c.theme}
            onChange={(v) => set("theme", v)}
          />
        </Card>

        {/* POSTER */}
        <Card title="Poster">
          <ImagePicker
            label="Gambar poster"
            url={c.posterUrl}
            alt={c.posterAlt}
            onUrl={(v) => set("posterUrl", v)}
            onAlt={(v) => set("posterAlt", v)}
            onUploading={setUploading}
          />
        </Card>

        {/* LOGOS */}
        <Card title="Logo Header">
          {c.logos.map((logo: SiteLogo, i) => (
            <div key={i} className="rounded-lg border-2 border-dashed border-[var(--ink)]/30 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[var(--ink)]/70">
                  Logo #{i + 1}
                </span>
                <div className="flex gap-1">
                  <SmallButton onClick={() => move("logos", c.logos, i, -1)}>
                    ↑
                  </SmallButton>
                  <SmallButton onClick={() => move("logos", c.logos, i, 1)}>
                    ↓
                  </SmallButton>
                  <SmallButton
                    tone="danger"
                    onClick={() => removeItem("logos", c.logos, i)}
                  >
                    Hapus
                  </SmallButton>
                </div>
              </div>
              <ImagePicker
                label="Gambar logo"
                url={logo.url}
                alt={logo.alt}
                onUrl={(v) => updateItem("logos", c.logos, i, { url: v })}
                onAlt={(v) => updateItem("logos", c.logos, i, { alt: v })}
                onUploading={setUploading}
              />
            </div>
          ))}
          <SmallButton
            onClick={() => set("logos", [...c.logos, { url: "", alt: "" }])}
          >
            + Tambah logo
          </SmallButton>
        </Card>

        {/* DESCRIPTION */}
        <Card title="Deskripsi">
          <TextField
            label="Judul deskripsi"
            value={c.descriptionTitle}
            onChange={(v) => set("descriptionTitle", v)}
          />
          <TextArea
            label="Isi deskripsi"
            rows={5}
            value={c.description}
            onChange={(v) => set("description", v)}
          />
        </Card>

        {/* CONTACTS */}
        <Card title="Contact Person">
          <TextField
            label="Label bagian"
            value={c.contactLabel}
            onChange={(v) => set("contactLabel", v)}
          />
          {c.contacts.map((ct: Contact, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="w-24 flex-none">
                <Label>Nama</Label>
                <input
                  className={inputCls}
                  value={ct.name}
                  onChange={(e) =>
                    updateItem("contacts", c.contacts, i, {
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="min-w-0 flex-1">
                <Label>Nomor (untuk WhatsApp)</Label>
                <input
                  className={inputCls}
                  value={ct.phone}
                  onChange={(e) =>
                    updateItem("contacts", c.contacts, i, {
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <SmallButton
                tone="danger"
                onClick={() => removeItem("contacts", c.contacts, i)}
              >
                ✕
              </SmallButton>
            </div>
          ))}
          <SmallButton
            onClick={() =>
              set("contacts", [...c.contacts, { name: "", phone: "" }])
            }
          >
            + Tambah kontak
          </SmallButton>
        </Card>

        {/* LINK GROUPS */}
        <Card title="Grup Link">
          <p className="-mt-2 text-xs text-[var(--ink)]/60">
            Kelompokkan link ke beberapa grup (mis. &ldquo;Panduan &amp;
            Materi&rdquo;, &ldquo;Link Kelas X&rdquo;). Tiap grup punya judul dan
            daftar link sendiri.
          </p>
          {c.linkGroups.map((group: LinkGroup, gi) => (
            <div
              key={gi}
              className="space-y-3 rounded-lg border-2 border-[var(--ink)] bg-[var(--gold)]/10 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold uppercase text-[var(--ink)]">
                  Grup #{gi + 1}
                </span>
                <div className="flex gap-1">
                  <SmallButton onClick={() => moveGroup(gi, -1)}>↑</SmallButton>
                  <SmallButton onClick={() => moveGroup(gi, 1)}>↓</SmallButton>
                  <SmallButton tone="danger" onClick={() => removeGroup(gi)}>
                    Hapus grup
                  </SmallButton>
                </div>
              </div>
              <div>
                <Label>Judul grup</Label>
                <input
                  className={inputCls}
                  placeholder="mis. Panduan & Materi / Link Kelas X"
                  value={group.title}
                  onChange={(e) => updateGroup(gi, { title: e.target.value })}
                />
              </div>

              {group.links.map((lk, li) => {
                const ready = lk.href !== null;
                return (
                  <div
                    key={li}
                    className="rounded-lg border-2 border-dashed border-[var(--ink)]/30 bg-white/60 p-3"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[var(--ink)]/70">
                        #{li + 1}
                      </span>
                      <div className="flex gap-1">
                        <SmallButton onClick={() => moveLink(gi, li, -1)}>
                          ↑
                        </SmallButton>
                        <SmallButton onClick={() => moveLink(gi, li, 1)}>
                          ↓
                        </SmallButton>
                        <SmallButton
                          tone="danger"
                          onClick={() => removeLink(gi, li)}
                        >
                          Hapus
                        </SmallButton>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <input
                        className={inputCls}
                        placeholder="Judul link"
                        value={lk.label}
                        onChange={(e) =>
                          updateLink(gi, li, { label: e.target.value })
                        }
                      />
                      <label className="flex items-center gap-2 text-xs font-semibold text-[var(--ink)]">
                        <input
                          type="checkbox"
                          checked={ready}
                          onChange={(e) =>
                            updateLink(gi, li, {
                              href: e.target.checked ? "" : null,
                            })
                          }
                        />
                        Link sudah tersedia (jika tidak, tampil &ldquo;Masih
                        dibuat&rdquo;)
                      </label>
                      {ready && (
                        <input
                          className={inputCls}
                          placeholder="https://…"
                          value={lk.href ?? ""}
                          onChange={(e) =>
                            updateLink(gi, li, { href: e.target.value })
                          }
                        />
                      )}
                    </div>
                  </div>
                );
              })}
              <SmallButton onClick={() => addLink(gi)}>+ Tambah link</SmallButton>
            </div>
          ))}
          <SmallButton onClick={addGroup}>+ Tambah grup</SmallButton>
        </Card>

        {/* SOCIALS */}
        <Card title="Media Sosial">
          <TextField
            label="Label bagian"
            value={c.followLabel}
            onChange={(v) => set("followLabel", v)}
          />
          {c.socials.map((s: Social, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="w-28 flex-none">
                <Label>Platform</Label>
                <select
                  className={inputCls}
                  value={s.platform}
                  onChange={(e) =>
                    updateItem("socials", c.socials, i, {
                      platform: e.target.value as SocialPlatform,
                    })
                  }
                >
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                </select>
              </div>
              <div className="min-w-0 flex-1">
                <Label>URL</Label>
                <input
                  className={inputCls}
                  value={s.href}
                  onChange={(e) =>
                    updateItem("socials", c.socials, i, {
                      href: e.target.value,
                      label: e.target.value ? s.label : s.label,
                    })
                  }
                />
              </div>
              <SmallButton
                tone="danger"
                onClick={() => removeItem("socials", c.socials, i)}
              >
                ✕
              </SmallButton>
            </div>
          ))}
          <SmallButton
            onClick={() =>
              set("socials", [
                ...c.socials,
                { label: "Instagram", href: "", platform: "instagram" },
              ])
            }
          >
            + Tambah sosial
          </SmallButton>
        </Card>

        {/* FOOTER */}
        <Card title="Footer">
          <TextField
            label="Baris 1"
            value={c.footerLine1}
            onChange={(v) => set("footerLine1", v)}
          />
          <TextField
            label="Baris 2"
            value={c.footerLine2}
            onChange={(v) => set("footerLine2", v)}
          />
        </Card>
      </div>

      {/* sticky save bar */}
      <div className="sticky bottom-4 mt-6 flex items-center justify-between gap-3 rounded-xl border-[3px] border-[var(--ink)] bg-[#fffdf5] px-4 py-3 nb-shadow">
        <span className="text-sm font-semibold text-[var(--ink)]">
          {status ?? (uploading ? "Sedang mengunggah gambar…" : "")}
        </span>
        <button
          onClick={save}
          disabled={pending || uploading}
          className="link-btn rounded-xl border-[3px] border-[var(--ink)] bg-[var(--ink)] px-6 py-2.5 font-mono text-sm font-bold uppercase text-[#fffdf5] nb-shadow disabled:opacity-60"
        >
          {pending ? "Menyimpan…" : "Simpan"}
        </button>
      </div>
    </div>
  );
}

import { createClient } from "./supabase/server";
import { isSupabaseConfigured } from "./supabase/config";

export type GuideLink = { label: string; href: string | null };
export type Contact = { name: string; phone: string };
export type SocialPlatform = "instagram" | "tiktok" | "youtube";
export type Social = { label: string; href: string; platform: SocialPlatform };
export type SiteLogo = { url: string; alt: string };

export type SiteContent = {
  welcomeText: string;
  titleLine1: string;
  titleLine2: string;
  theme: string;
  sectionHeading: string;
  descriptionTitle: string;
  description: string;
  contactLabel: string;
  followLabel: string;
  posterUrl: string;
  posterAlt: string;
  logos: SiteLogo[];
  contacts: Contact[];
  links: GuideLink[];
  socials: Social[];
  footerLine1: string;
  footerLine2: string;
};

/** Baseline content — mirrors the original static card and is used whenever
 *  Supabase is not configured or has no saved row yet. */
export const DEFAULT_CONTENT: SiteContent = {
  welcomeText: "Welcome soon to",
  titleLine1: "Ozone",
  titleLine2: "Smanichi",
  theme: "MPLS ramah, hari baru aman dan nyaman di sekolah",
  sectionHeading: "Panduan & Materi",
  descriptionTitle: "Buku Panduan MPLS 2026",
  description:
    "Tautan ini merupakan Buku Panduan kegiatan MPLS SMA Negeri 1 Bangli tahun 2026! Telah termuat segala hal yang menjadi acuan seluruh calon murid SMA Negeri 1 Bangli selama berkegiatan di Masa Pengenalan Lingkungan Sekolah Tahun Ajaran 2026-2027.",
  contactLabel: "Contact Person",
  followLabel: "Ikuti Kami",
  posterUrl: "/images/poster.png",
  posterAlt: "Poster MPLS Smanichi 2026 — Ozone",
  logos: [
    { url: "/images/logo-sekolah.png", alt: "Logo SMA Negeri 1 Bangli" },
    { url: "/images/mpk.png", alt: "Logo MPK Smanichi" },
    { url: "/images/logo-osis-circle.png", alt: "Logo OSIS Smanichi" },
  ],
  contacts: [
    { name: "MPK", phone: "+62 812-3903-9132" },
    { name: "OSIS", phone: "+62 813-3940-5598" },
  ],
  links: [
    {
      label: "SMANICHI",
      href: "https://drive.google.com/file/d/1F4txAymybpIDFFydnoUMBUrlmJ8IYqTD/view?usp=drivesdk",
    },
    {
      label: "OZONE",
      href: "https://drive.google.com/file/d/1SjbNjv75ekxRQ332Yrsc8ZdGqvpploKI/view?usp=drivesdk",
    },
    {
      label: "PDM",
      href: "https://drive.google.com/file/d/1xAvMC5O8HgqfPJcwG7cb7jARiRA10e2f/view?usp=drivesdk",
    },
    {
      label: "TATA TERTIB KEGIATAN",
      href: "https://drive.google.com/file/d/16eOwuo2BQB7f7wbCBrQ1MBQf9pvbGfok/view?usp=drivesdk",
    },
    {
      label: "RUNDOWN KEGIATAN MPLS",
      href: "https://drive.google.com/file/d/16oCYLILmP9i8ryl0ijBzjl4urc5v3tEs/view?usp=drivesdk",
    },
    { label: "PENGGUNAAN TWIBBON", href: null },
    {
      label: "HYMNE & MARS SMA N 1 BANGLI",
      href: "https://drive.google.com/file/d/1-5KfTwJEsNct3-Br3HMuBHIMBWjey1ev/view?usp=drivesdk",
    },
    { label: "YEL - YEL", href: null },
  ],
  socials: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/ozone_smanichi/",
      platform: "instagram",
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@ozonesmanichi",
      platform: "tiktok",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/channel/UCpbxq4Kh-lJfVB-t7i0IPyg",
      platform: "youtube",
    },
  ],
  footerLine1: "MPLS SMA Negeri 1 Bangli · 2026",
  footerLine2: "OSIS & MPK Ozone Smanichi",
};

/** Merge a partial saved payload over the defaults so missing keys are safe. */
export function mergeContent(data: Partial<SiteContent> | null): SiteContent {
  if (!data) return DEFAULT_CONTENT;
  return {
    ...DEFAULT_CONTENT,
    ...data,
    logos: data.logos ?? DEFAULT_CONTENT.logos,
    contacts: data.contacts ?? DEFAULT_CONTENT.contacts,
    links: data.links ?? DEFAULT_CONTENT.links,
    socials: data.socials ?? DEFAULT_CONTENT.socials,
  };
}

/** Read the site content for the public page (Server Component). */
export async function getContent(): Promise<SiteContent> {
  if (!isSupabaseConfigured) return DEFAULT_CONTENT;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) return DEFAULT_CONTENT;
    return mergeContent(data.data as Partial<SiteContent>);
  } catch {
    return DEFAULT_CONTENT;
  }
}

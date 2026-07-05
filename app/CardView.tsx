/* eslint-disable @next/next/no-img-element */
import type { SiteContent, SocialPlatform } from "@/lib/content";

function toWa(phone: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

const socialIcons: Record<SocialPlatform, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-1/2 w-1/2 fill-[#fffdf5]">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.52.01-4.76.07-.9.04-1.38.2-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.33-.28.81-.32 1.71-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.9.2 1.38.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.33.13.81.28 1.71.32 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.9-.04 1.38-.2 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.33.28-.81.32-1.71.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.9-.2-1.38-.32-1.71a2.87 2.87 0 0 0-.69-1.06 2.87 2.87 0 0 0-1.06-.69c-.33-.13-.81-.28-1.71-.32-1.24-.06-1.61-.07-4.76-.07Zm0 2.76a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Zm0 1.62a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36Zm5.48-1.5a1.24 1.24 0 1 1-2.48 0 1.24 1.24 0 0 1 2.48 0Z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-1/2 w-1/2 fill-[#fffdf5]">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.02-2.82h-2.9v11.55a2.42 2.42 0 0 1-2.42 2.35 2.42 2.42 0 0 1-.61-4.77V9.1a5.3 5.3 0 1 0 6.44 5.17V8.62a7.06 7.06 0 0 0 4.13 1.32V7.06a4.28 4.28 0 0 1-3.62-1.24Z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-1/2 w-1/2 fill-[#fffdf5]">
      <path d="M21.58 7.19a2.76 2.76 0 0 0-1.94-1.95C17.92 4.77 12 4.77 12 4.77s-5.92 0-7.64.47a2.76 2.76 0 0 0-1.94 1.95A28.9 28.9 0 0 0 2 12a28.9 28.9 0 0 0 .42 4.81 2.76 2.76 0 0 0 1.94 1.95c1.72.47 7.64.47 7.64.47s5.92 0 7.64-.47a2.76 2.76 0 0 0 1.94-1.95A28.9 28.9 0 0 0 22 12a28.9 28.9 0 0 0-.42-4.81ZM10.1 15.3V8.7l5.5 3.3-5.5 3.3Z" />
    </svg>
  ),
};

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-[#fffdf5]">
      <path d="M6 2h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V7h3.5L13 3.5ZM7.5 12h9v1.5h-9V12Zm0 3h9v1.5h-9V15Zm0-6h4v1.5h-4V9Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M13.2 5.2 11.8 6.6 16.2 11H4v2h12.2l-4.4 4.4 1.4 1.4L20 12l-6.8-6.8Z" />
    </svg>
  );
}

export default function CardView({ content }: { content: SiteContent }) {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-10 sm:py-16">
      <main className="w-full max-w-xl">
        {/* ---- Header: logos ---- */}
        {content.logos.length > 0 && (
          <header className="mb-6 flex items-center justify-center gap-5">
            {content.logos.map((logo, i) => (
              <img
                key={`${logo.url}-${i}`}
                src={logo.url}
                alt={logo.alt}
                className="h-16 w-auto object-contain drop-shadow-sm sm:h-20"
              />
            ))}
          </header>
        )}

        {/* ---- Poster ---- */}
        {content.posterUrl && (
          <div className="nb-card mb-7 overflow-hidden p-0">
            <img
              src={content.posterUrl}
              alt={content.posterAlt}
              className="h-auto w-full"
            />
          </div>
        )}

        {/* ---- Title ---- */}
        <section className="mb-7 text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.35em] text-[var(--gold-deep)]">
            {content.welcomeText}
          </p>
          <h1 className="headline-gradient mt-2 font-display text-4xl leading-tight font-extrabold uppercase sm:text-5xl">
            {content.titleLine1}
            {content.titleLine2 && (
              <>
                <br />
                {content.titleLine2}
              </>
            )}
          </h1>
          {content.theme && (
            <div className="mx-auto mt-4 max-w-md rounded-2xl border-2 border-[var(--ink)] bg-[var(--gold)] px-4 py-3 text-[var(--ink)] nb-shadow-sm">
              <p className="font-display text-sm leading-snug font-bold sm:text-base">
                &ldquo;{content.theme}&rdquo;
              </p>
            </div>
          )}
        </section>

        {/* ---- Description ---- */}
        <section className="nb-card mb-6 p-5 sm:p-6">
          <h2 className="mb-3 font-display text-lg font-bold uppercase text-[var(--ink)]">
            {content.descriptionTitle}
          </h2>
          <p className="text-sm leading-relaxed whitespace-pre-line text-[var(--ink)]/85 sm:text-base">
            {content.description}
          </p>

          {content.contacts.length > 0 && (
            <div className="mt-5 border-t-2 border-dashed border-[var(--ink)]/30 pt-4">
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--gold-deep)]">
                {content.contactLabel}
              </p>
              <ul className="space-y-2">
                {content.contacts.map((c, i) => (
                  <li key={`${c.name}-${i}`} className="flex items-center gap-3">
                    <span className="inline-flex h-7 min-w-[3.2rem] items-center justify-center rounded-md border-2 border-[var(--ink)] bg-[var(--ink)] px-2 font-mono text-[0.65rem] font-bold uppercase text-[var(--gold-soft)]">
                      {c.name}
                    </span>
                    <a
                      href={toWa(c.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm font-bold text-[var(--ink)] underline decoration-[var(--gold)] decoration-2 underline-offset-2 hover:text-[var(--gold-deep)]"
                    >
                      {c.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* ---- Section heading ---- */}
        <div className="mb-4 flex items-center justify-center gap-2 text-[var(--ink)]">
          <span className="font-display text-base font-bold uppercase tracking-wide">
            {content.sectionHeading}
          </span>
          <span className="animate-bounce">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[var(--gold-deep)]">
              <path d="M12 16.5 5.5 10l1.4-1.4L12 13.7l5.1-5.1L18.5 10 12 16.5Z" />
            </svg>
          </span>
        </div>

        {/* ---- Guide links ---- */}
        <nav className="flex flex-col gap-3.5">
          {content.links.map((link, i) => {
            const isReady = Boolean(link.href);
            const inner = (
              <>
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border-2 border-[var(--ink)] bg-[var(--gold-deep)]">
                    <DocIcon />
                  </span>
                  <span className="flex min-w-0 flex-col text-left">
                    <span className="truncate font-mono text-sm font-bold uppercase leading-tight sm:text-base">
                      {link.label}
                    </span>
                    {!isReady && (
                      <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--gold-soft)]/90">
                        Masih dibuat
                      </span>
                    )}
                  </span>
                </span>
                <span className="flex-none">
                  {isReady ? (
                    <ArrowIcon />
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current opacity-60">
                      <path d="M17 8V7a5 5 0 0 0-10 0v1H5v13h14V8h-2Zm-8-1a3 3 0 0 1 6 0v1H9V7Zm3 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                    </svg>
                  )}
                </span>
              </>
            );

            const base =
              "link-btn flex items-center justify-between gap-3 rounded-xl border-[3px] border-[var(--ink)] px-4 py-3.5 nb-shadow";

            return isReady ? (
              <a
                key={`${link.label}-${i}`}
                href={link.href as string}
                target="_blank"
                rel="noopener noreferrer"
                className={`${base} link-gradient text-[#fffdf5]`}
              >
                {inner}
              </a>
            ) : (
              <div
                key={`${link.label}-${i}`}
                aria-disabled="true"
                className={`${base} link-gradient-muted cursor-not-allowed text-[#fffdf5]/80`}
              >
                {inner}
              </div>
            );
          })}
        </nav>

        {/* ---- Socials ---- */}
        {content.socials.length > 0 && (
          <section className="mt-9">
            <p className="mb-3 text-center font-mono text-xs font-bold uppercase tracking-[0.3em] text-[var(--gold-deep)]">
              {content.followLabel}
            </p>
            <ul className="flex items-center justify-center gap-4">
              {content.socials.map((s, i) => (
                <li key={`${s.label}-${i}`}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="icon-btn flex h-14 w-14 items-center justify-center rounded-xl border-[3px] border-[var(--ink)] bg-[var(--ink)] nb-shadow-sm"
                  >
                    {socialIcons[s.platform]}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ---- Footer ---- */}
        <footer className="mt-10 text-center">
          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-widest text-[var(--ink)]/70">
            {content.footerLine1}
          </p>
          <p className="mt-1 text-[0.7rem] text-[var(--ink)]/55">
            {content.footerLine2}
          </p>
        </footer>
      </main>
    </div>
  );
}

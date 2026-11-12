import Image from "next/image";
import { CONTACT_INFO, PROMOTION_PACKAGES } from "@/data/packages";
import PlatformMark from "./PlatformMark";
import WhatsAppIcon from "./WhatsAppIcon";

const waHref = (text: string) =>
  `${CONTACT_INFO.whatsappDirectUrl}?text=${encodeURIComponent(text)}`;

export default function Footer() {
  return (
    <footer className="grain relative isolate overflow-hidden bg-ink text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="spotlight absolute -left-[20%] -bottom-[75%] h-[130%] w-[75%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),transparent_65%)] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-16 sm:px-8 sm:pt-20">
        <h2 className="max-w-[14ch] text-[2.75rem] leading-[0.95] sm:text-[4.5rem]">
          Got a film?
          <br />
          <span className="text-outline text-paper">Let&apos;s push it.</span>
        </h2>

        <a
          href={waHref(
            "Hello Movie Mania, I would like to discuss promoting my project.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2.5 bg-paper px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-wash"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {CONTACT_INFO.whatsappNumber}
        </a>

        <div className="mt-14 grid gap-10 border-t border-paper/15 pt-9 sm:grid-cols-3">
          <div>
            <Image
              src="/images/logo white.jpeg"
              alt="Movie Mania"
              width={1280}
              height={1280}
              className="h-14 w-14 object-cover"
            />
            <p className="mt-3 max-w-[30ch] text-[13.5px] leading-relaxed text-paper/55">
              Film and cinema promotion for producers, distributors and
              streaming releases.
            </p>
          </div>

          <nav aria-label="Packages">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-paper/40">
              Packages
            </p>
            <ul className="mt-4 space-y-2.5">
              {PROMOTION_PACKAGES.map((p) => (
                <li key={p.id}>
                  <a
                    href="#rate-card"
                    className="inline-flex items-center gap-2 text-[14px] text-paper/70 transition-colors hover:text-paper"
                  >
                    <PlatformMark
                      platform={p.platform}
                      className="h-3.5 w-3.5"
                    />
                    {p.name.replace(" Promotion", "")} — {p.formattedPrice}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Site">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-paper/40">
              Site
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-paper/70">
              <li>
                <a href="#rate-card" className="transition-colors hover:text-paper">
                  Prices
                </a>
              </li>
              <li>
                <a href="#terms" className="transition-colors hover:text-paper">
                  Terms
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-paper">
                  FAQ
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-1 border-t border-paper/15 pt-6 text-[12px] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Movie Mania</p>
          <p>
            Designed & developed by{" "}
            <span className="text-paper/70">Marvex Technologies</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

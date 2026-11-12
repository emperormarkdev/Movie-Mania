import Image from "next/image";
import Link from "next/link";
import { CONTACT_INFO } from "@/data/packages";
import WhatsAppIcon from "./WhatsAppIcon";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Movie Mania — home" className="shrink-0">
          {/* White-ground mark, printed straight — no badge, no ring. */}
          <Image
            src="/images/logo-black.jpg"
            alt="Movie Mania"
            width={1280}
            height={1280}
            priority
            className="h-11 w-11 object-cover sm:h-12 sm:w-12"
          />
        </Link>

        <nav className="flex items-center gap-5 sm:gap-7">
          <a
            href="#rate-card"
            className="hidden text-[13px] font-semibold uppercase tracking-[0.08em] text-smoke transition-colors hover:text-ink sm:inline"
          >
            Prices
          </a>
          <a
            href="#socials"
            className="hidden text-[13px] font-semibold uppercase tracking-[0.08em] text-smoke transition-colors hover:text-ink sm:inline"
          >
            Socials
          </a>
          <a
            href="#faq"
            className="hidden text-[13px] font-semibold uppercase tracking-[0.08em] text-smoke transition-colors hover:text-ink sm:inline"
          >
            FAQ
          </a>
          <a
            href={`${CONTACT_INFO.whatsappDirectUrl}?text=${encodeURIComponent(
              "Hello Movie Mania, I would like to ask about promoting my project.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Movie Mania on WhatsApp"
            className="inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-paper transition-colors hover:bg-smoke"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

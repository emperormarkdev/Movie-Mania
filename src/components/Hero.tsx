import { CONTACT_INFO } from "@/data/packages";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Hero() {
  return (
    <section className="grain relative isolate overflow-hidden bg-ink text-paper">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="spotlight absolute -right-[15%] -top-[60%] h-[140%] w-[90%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_65%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-paper/15" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24">
       

        <h1 className="mt-5 max-w-[16ch] text-[3rem] leading-[0.95] tracking-[0.005em] sm:text-[5rem] lg:text-[6.5rem]">
          Promote your film. Every screen.
        </h1>

        <p className="mt-7 max-w-md text-[15px] leading-relaxed text-paper/65 sm:text-base">
          Movie Mania puts Nollywood films, series and cinema releases in front
          of the audience that already watches them. Instagram, Facebook,
          TikTok and Telegram promotion packages from ₦5,000. Pick a package,
          pay once.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#rate-card"
            className="inline-flex items-center justify-center bg-paper px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-wash"
          >
            See prices
          </a>
          <a
            href={`${CONTACT_INFO.whatsappDirectUrl}?text=${encodeURIComponent(
              "Hello Movie Mania, I would like to talk about promoting a project.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-paper ring-1 ring-inset ring-paper/30 transition-colors hover:bg-paper/10"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}

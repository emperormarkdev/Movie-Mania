import { SOCIAL_LINKS } from "@/data/packages";
import PlatformMark from "./PlatformMark";

export default function SocialLinks() {
  return (
    <section id="socials" className="scroll-mt-16 bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-[2.5rem] leading-none sm:text-[3.75rem]">
            Find us on
          </h2>
          <p className="text-[14px] font-medium text-smoke">
            Check the accounts before you book.
          </p>
        </div>

        <div className="mt-10 divide-y divide-line border-y-2 border-ink">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 transition-colors hover:bg-wash sm:gap-6 sm:py-6"
            >
              <PlatformMark
                platform={link.platform}
                className="h-5 w-5 text-ink sm:h-6 sm:w-6"
              />

              <span className="min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-2.5">
                  <span className="text-[1.15rem] font-semibold leading-none text-ink sm:text-[1.35rem]">
                    {link.label}
                  </span>
                  <span className="text-[13px] font-medium text-faint">
                    {link.handle}
                  </span>
                </span>
                <span className="mt-1.5 block text-[13.5px] text-smoke">
                  {link.description}
                </span>
              </span>

              <span
                aria-hidden="true"
                className="text-[18px] leading-none text-faint transition-transform duration-200 group-hover:translate-x-1 group-hover:text-ink"
              >
                &rarr;
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

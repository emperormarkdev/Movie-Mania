"use client";

import { useState } from "react";
import {
  PROMOTION_PACKAGES,
  ALL_IN_ONE_BUNDLE,
  CONTACT_INFO,
  type PromotionPackage,
} from "@/data/packages";
import PlatformMark from "./PlatformMark";
import WhatsAppIcon from "./WhatsAppIcon";
import BookingDialog from "./BookingDialog";

const LINES: Record<string, string> = {
  instagram: "2 clips · Reels & feed",
  facebook: "2 clips · viral reach",
  tiktok: "1 clip · algorithm-first",
  telegram: "1 post · direct to fans",
};

const INCLUDED: Record<string, string[]> = {
  instagram: ["Handles & cast tagged", "Film hashtags", "Permanent feed spot"],
  facebook: ["Synopsis & ticket link", "Group sharing", "Click-through traffic"],
  tiktok: ["Vertical 9:16 cut", "Trending sound sync", "Handle tagged"],
  telegram: ["Poster or preview", "Direct watch link", "Pinned alert"],
};

function whatsappLink(text: string) {
  return `${CONTACT_INFO.whatsappDirectUrl}?text=${encodeURIComponent(text)}`;
}

export default function RateCard() {
  const [booking, setBooking] = useState<PromotionPackage | null>(null);
  const separately = PROMOTION_PACKAGES.reduce((sum, p) => sum + p.price, 0);

  return (
    <section id="rate-card" className="scroll-mt-16 bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-[2.5rem] leading-none sm:text-[3.75rem]">
            Prices
          </h2>
          <p className="text-[14px] font-medium text-smoke">
            One-time fee. No retainer.
          </p>
        </div>

        <div className="mt-10 divide-y divide-line border-y-2 border-ink">
          {PROMOTION_PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className="grid gap-5 py-7 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 sm:py-8"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <PlatformMark
                    platform={pkg.platform}
                    className="h-5 w-5"
                  />
                  <h3 className="text-[1.65rem] leading-none sm:text-[2rem]">
                    {pkg.name.replace(" Promotion", "")}
                  </h3>
                  {pkg.popular && (
                    <span className="bg-ink px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-paper">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.06em] text-faint">
                  {LINES[pkg.platform]}
                </p>
                <p className="mt-3 text-[14px] text-smoke">
                  {INCLUDED[pkg.platform].join(" · ")}
                </p>
              </div>

              <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end sm:gap-3 sm:text-right">
                <span className="price">{pkg.formattedPrice}</span>
                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={whatsappLink(
                      `Hello Movie Mania, I want to book ${pkg.name} (${pkg.formattedPrice}).`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Book ${pkg.name} on WhatsApp`}
                    className="inline-flex h-11 w-11 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setBooking(pkg)}
                    className="inline-flex h-11 items-center bg-ink px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-smoke"
                  >
                    Pay online
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-4 text-[12.5px] text-faint">
          Facebook & Instagram include two clips — same day or staggered. Prices
          in Naira. Custom campaigns on request.
        </p>

        {/* Bundle */}
        <div className="mt-10 bg-ink px-6 py-8 text-paper sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-9">
          <div>
            <h3 className="text-[1.9rem] leading-none sm:text-[2.5rem]">
              All-Platform Takeover
            </h3>
            <p className="mt-2.5 text-[14px] text-paper/60">
              {ALL_IN_ONE_BUNDLE.totalClips} clips everywhere at once. Save{" "}
              ₦{(separately - ALL_IN_ONE_BUNDLE.price).toLocaleString("en-NG")}.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between gap-4 sm:mt-0 sm:flex-col sm:items-end">
            <span className="font-display text-[2.6rem] leading-none sm:text-[3rem]">
              {ALL_IN_ONE_BUNDLE.formattedPrice}
            </span>
            <a
              href={whatsappLink(
                `Hello Movie Mania, I want to book the ${ALL_IN_ONE_BUNDLE.name} (${ALL_IN_ONE_BUNDLE.formattedPrice}).`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 bg-paper px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-wash"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Book
            </a>
          </div>
        </div>
      </div>

      <BookingDialog pkg={booking} onClose={() => setBooking(null)} />
    </section>
  );
}

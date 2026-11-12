"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CONTACT_INFO, type PromotionPackage } from "@/data/packages";
import WhatsAppIcon from "./WhatsAppIcon";

type PaystackHandler = { openIframe: () => void };
declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: Record<string, unknown>) => PaystackHandler;
    };
  }
}

type Status = "form" | "processing" | "paid";

const FIELD =
  "mt-2 block w-full border border-line-strong bg-paper px-4 py-3.5 text-[15px] text-ink placeholder:text-faint transition-colors focus:outline-none focus:ring-2 focus:ring-ink focus:ring-inset";
const LABEL =
  "block text-[11px] font-bold uppercase tracking-[0.14em] text-smoke";

export default function BookingDialog({
  pkg,
  onClose,
}: {
  pkg: PromotionPackage | null;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  const [status, setStatus] = useState<Status>("form");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    link: "",
    schedule: "same_day" as "same_day" | "next_day",
  });

  const isOpen = pkg !== null;

  const close = useCallback(() => {
    onClose();
    setStatus("form");
    setError("");
    returnFocusTo.current?.focus();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    returnFocusTo.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(t);
    };
  }, [isOpen, close]);

  if (!pkg) return null;

  const scheduleLabel = pkg.schedulingSupport
    ? form.schedule === "same_day"
      ? "Both clips on the same day"
      : "One clip today, one tomorrow"
    : null;

  const whatsappText = [
    "*Movie Mania booking*",
    reference && `Reference: ${reference}`,
    `Name: ${form.name || "—"}`,
    `Package: ${pkg.name} (${pkg.formattedPrice})`,
    `Project: ${form.title || "—"}`,
    form.phone && `Phone: ${form.phone}`,
    form.link && `Clips: ${form.link}`,
    scheduleLabel && `Schedule: ${scheduleLabel}`,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappHref = `${CONTACT_INFO.whatsappDirectUrl}?text=${encodeURIComponent(
    whatsappText
  )}`;

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const startPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.title.trim()
    ) {
      setError("Fill in your name, email, phone and project title.");
      return;
    }

    const ref = `MM-${Date.now().toString(36).toUpperCase()}`;
    setReference(ref);

    const key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (!window.PaystackPop || !key) {
      setError("Online payment is down right now — book on WhatsApp instead.");
      return;
    }

    setStatus("processing");

    const handler = window.PaystackPop.setup({
      key,
      email: form.email.trim(),
      amount: pkg.price * 100,
      currency: "NGN",
      reference: ref,
      metadata: {
        custom_fields: [
          {
            display_name: "Client",
            variable_name: "client_name",
            value: form.name,
          },
          { display_name: "Phone", variable_name: "phone", value: form.phone },
          {
            display_name: "Package",
            variable_name: "package",
            value: pkg.name,
          },
          {
            display_name: "Project",
            variable_name: "project",
            value: form.title,
          },
          {
            display_name: "Clips link",
            variable_name: "clips_link",
            value: form.link,
          },
          {
            display_name: "Schedule",
            variable_name: "schedule",
            value: scheduleLabel ?? "Standard",
          },
        ],
      },
      callback: () => setStatus("paid"),
      onClose: () => setStatus("form"),
    });
    handler.openIframe();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/70 sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="max-h-[92dvh] w-full max-w-lg overflow-y-auto border-t-4 border-ink bg-paper sm:border-4"
      >
        <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-7 sm:pt-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-faint">
              {status === "paid" ? "Confirmed" : "Booking"}
            </p>
            <h2
              id="booking-title"
              className="mt-1 text-[1.7rem] leading-none sm:text-[2rem]"
            >
              {status === "paid" ? "You're in." : pkg.name}
            </h2>
            <p className="mt-2 text-[14px] text-smoke">
              {status === "paid"
                ? `Receipt sent to ${form.email}.`
                : `${pkg.formattedPrice} · ${pkg.clipsCount} clip${pkg.clipsCount > 1 ? "s" : ""} on ${pkg.name.replace(" Promotion", "")}`}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close booking"
            className="border border-line p-2 text-smoke transition-colors hover:border-ink hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {status === "paid" ? (
          <div className="px-5 py-7 sm:px-7">
            <div className="flex items-center justify-between border-y-2 border-ink py-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
                Reference
              </span>
              <span className="font-display text-[1.4rem] tracking-wide">
                {reference}
              </span>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-smoke">
              Send your clip link on WhatsApp so we can schedule the post.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 bg-ink py-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-smoke"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Send clips on WhatsApp
            </a>
            <button
              type="button"
              onClick={close}
              className="mt-2 w-full py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-smoke transition-colors hover:text-ink"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={startPayment} className="space-y-5 px-5 py-6 sm:px-7">
            {pkg.schedulingSupport && (
              <fieldset>
                <legend className={LABEL}>Clip schedule</legend>
                <div className="mt-2 grid grid-cols-2 border border-line-strong">
                  {(
                    [
                      ["same_day", "Same day"],
                      ["next_day", "One a day"],
                    ] as const
                  ).map(([value, label], i) => (
                    <label
                      key={value}
                      className={`cursor-pointer px-3 py-3 text-center text-[13px] font-semibold uppercase tracking-[0.06em] transition-colors ${
                        i === 0 ? "border-r border-line-strong" : ""
                      } ${
                        form.schedule === value
                          ? "bg-ink text-paper"
                          : "bg-paper text-smoke hover:bg-wash"
                      }`}
                    >
                      <input
                        type="radio"
                        name="schedule"
                        value={value}
                        checked={form.schedule === value}
                        onChange={() => setForm((f) => ({ ...f, schedule: value }))}
                        className="sr-only"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="bk-name" className={LABEL}>
                  Full name
                </label>
                <input
                  ref={firstFieldRef}
                  id="bk-name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={set("name")}
                  className={FIELD}
                  placeholder="Adaeze Okonkwo"
                />
              </div>
              <div>
                <label htmlFor="bk-phone" className={LABEL}>
                  WhatsApp number
                </label>
                <input
                  id="bk-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  className={FIELD}
                  placeholder="0814 730 0090"
                />
              </div>
            </div>

            <div>
              <label htmlFor="bk-email" className={LABEL}>
                Email — receipt goes here
              </label>
              <input
                id="bk-email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                className={FIELD}
                placeholder="you@studio.com"
              />
            </div>

            <div>
              <label htmlFor="bk-title" className={LABEL}>
                Film or project title
              </label>
              <input
                id="bk-title"
                required
                value={form.title}
                onChange={set("title")}
                className={FIELD}
                placeholder="The Lagos Heist"
              />
            </div>

            <div>
              <label htmlFor="bk-link" className={LABEL}>
                Clip link <span className="text-faint">(optional)</span>
              </label>
              <input
                id="bk-link"
                type="url"
                value={form.link}
                onChange={set("link")}
                className={FIELD}
                placeholder="Drive, Dropbox or WeTransfer"
              />
              <p className="mt-1.5 text-[12px] text-faint">
                Set sharing to “anyone with the link”.
              </p>
            </div>

            {error && (
              <p
                role="alert"
                className="border-l-4 border-ink bg-wash px-4 py-3 text-[13px] font-medium"
              >
                {error}
              </p>
            )}

            <div className="space-y-2 pt-1">
              <button
                type="submit"
                disabled={status === "processing"}
                className="flex w-full items-center justify-between bg-ink px-5 py-4 text-paper transition-colors hover:bg-smoke disabled:opacity-60"
              >
                <span className="text-[12px] font-semibold uppercase tracking-[0.08em]">
                  {status === "processing" ? "Opening Paystack…" : "Pay now"}
                </span>
                <span className="font-display text-[1.35rem] leading-none">
                  {pkg.formattedPrice}
                </span>
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-line-strong py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-wash"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Book on WhatsApp
              </a>
            </div>

            <p className="text-[12px] text-faint">
              Card, transfer, USSD, Apple Pay. Payment locks your slot.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

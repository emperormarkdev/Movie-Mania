import { CONTACT_INFO } from "@/data/packages";
import WhatsAppIcon from "./WhatsAppIcon";

const FAQS = [
  {
    q: "What happens after I pay?",
    a: "Your slot is locked. You get a booking reference and receipt by email, and we're notified with your clip link and posting choice.",
  },
  {
    q: "How do the two FB & IG clips work?",
    a: "Both clips on the same day for a release-day push, or one today and one tomorrow to stay visible longer.",
  },
  {
    q: "Which payment methods work?",
    a: "Nigerian cards (Visa, Mastercard, Verve), bank transfer, USSD and Apple Pay — via Paystack.",
  },
  {
    q: "Can I promote a non-film project?",
    a: "Yes. Shorts, series, streaming releases and creator channels all fit. Unsure? Ask us first.",
  },
  {
    q: "How do I send my clips?",
    a: "Drive, Dropbox or WeTransfer link in the booking form, set to “anyone with the link”.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="scroll-mt-16 bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="text-[2.5rem] leading-none sm:text-[3rem]">FAQ</h2>

        <div className="mt-8 grid gap-x-16 lg:grid-cols-2">
          {FAQS.map((item, i) => (
            <details
              key={item.q}
              className="group border-t border-line last:border-b lg:[&:nth-last-child(2)]:border-b"
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-sans text-xl font-light leading-none text-faint transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-lg pb-5 text-[14px] leading-relaxed text-smoke">
                {item.a}
              </p>
            </details>
          ))}

          <a
            href={`${CONTACT_INFO.whatsappDirectUrl}?text=${encodeURIComponent(
              "Hello Movie Mania, I have a question before booking.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 border-t border-line py-4 text-[14px] font-semibold text-ink transition-colors hover:bg-wash lg:col-span-2"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Still unsure — ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

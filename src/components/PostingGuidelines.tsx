const TERMS = [
  {
    title: "Two clips on FB & IG",
    body: "Both packages include two separate clips. You choose how they run when you book.",
  },
  {
    title: "Same day or staggered",
    body: "Both clips on release day, or one today and one tomorrow for a longer window.",
  },
  {
    title: "Payment locks the slot",
    body: "Your posting date is confirmed the moment payment clears. Receipt and reference by email.",
  },
  {
    title: "Send clips by link",
    body: "Google Drive, Dropbox or WeTransfer link in the booking form, set to “anyone with the link”.",
  },
];

export default function PostingGuidelines() {
  return (
    <section id="terms" className="scroll-mt-16 border-y border-line bg-wash">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div>
          <h2 className="text-[2.5rem] leading-none sm:text-[3rem]">Terms</h2>
          <p className="mt-3 max-w-xs text-[14px] text-smoke">
            Read this before you pay. It covers nearly everything.
          </p>
        </div>

        <ol className="divide-y divide-line border-t border-line">
          {TERMS.map((term, i) => (
            <li
              key={term.title}
              className="grid grid-cols-[2.5rem_1fr] gap-4 py-5"
            >
              <span
                aria-hidden="true"
                className="font-display text-[1.4rem] leading-8 text-faint"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[1.05rem] leading-tight">{term.title}</h3>
                <p className="mt-1.5 max-w-md text-[14px] leading-relaxed text-smoke">
                  {term.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

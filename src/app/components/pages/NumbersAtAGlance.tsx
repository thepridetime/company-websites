export type GlanceItem = {
  indicator: string;
  figure: string;
  source: string;
};

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-4 border-t-[3px] border-black pt-2">
      <h2 className="text-[13px] font-extrabold uppercase tracking-[0.04em] text-gray-950">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   NUMBERS AT A GLANCE
   Bordered grid: 1 column on mobile, 2 on tablet, 4 on
   desktop. Borders are drawn on each cell, so the grid stays
   neat whatever the number of items.
========================================================= */

export function NumbersAtAGlance({
  items,
  subtitle,
  title = "Numbers at a Glance",
}: {
  items: GlanceItem[];
  subtitle?: string;
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section aria-label={title} className="mb-16">
      <SectionTitle title={title} />

      {subtitle && (
        <p className="-mt-1 mb-6 text-[12px] text-gray-400">{subtitle}</p>
      )}

      <div className="grid grid-cols-1 border-l border-t border-gray-200 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          /* Long figures get a smaller size so every row stays even. */
          const longFigure = item.figure.length > 18;

          return (
            <div
              key={item.indicator}
              className="group flex flex-col border-b border-r border-gray-200 p-5 transition-colors hover:bg-gray-50"
            >
              <span className="min-h-[2.6em] text-[10px] font-bold uppercase leading-[1.3] tracking-[0.08em] text-gray-500">
                {item.indicator}
              </span>

              <span
                className={`mt-3 break-words font-extrabold leading-[1.1] tracking-tight text-gray-950 tabular-nums ${
                  longFigure
                    ? "text-[20px] md:text-[22px]"
                    : "text-[26px] md:text-[28px]"
                }`}
              >
                {item.figure}
              </span>

              <span className="mt-auto pt-3 text-[11px] leading-[1.4] text-gray-400">
                {item.source}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default NumbersAtAGlance;

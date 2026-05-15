"use client";

import { getBreakingNews, getLatestArticles } from "@/lib/data/articles";

export function Ticker() {
  const breaking = getBreakingNews();
  const latest = breaking.length > 0 ? breaking : getLatestArticles(5);

  const items = latest.map((a) => a.title);
  const doubled = [...items, ...items];

  return (
    <div
      className="bg-[#0D1B2A] h-10 flex items-center overflow-hidden relative z-[100]"
      role="marquee"
      aria-label="Actualités défilantes"
    >
      <div className="bg-[#C01D35] text-white text-[0.68rem] sm:text-[0.72rem] font-bold tracking-wider uppercase px-2.5 sm:px-3.5 py-1 whitespace-nowrap shrink-0 h-full flex items-center z-10">
        {breaking.length > 0 ? "⚡ Breaking" : "Flash Info"}
      </div>
      <div className="flex items-center w-full overflow-hidden flex-1 h-full">
        <div className="flex whitespace-nowrap animate-ticker hover:[animation-play-state:paused]">
          {doubled.map((title, i) => (
            <span
              key={i}
              className="text-[#E8E4DC] text-[0.75rem] sm:text-[0.8rem] font-medium px-6 sm:px-12 inline-flex items-center gap-2"
            >
              <span className="w-1 h-1 bg-[#C01D35] rounded-full shrink-0" />
              {title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

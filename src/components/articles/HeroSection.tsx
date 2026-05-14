import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import type { Article } from "@/types";

interface HeroSectionProps {
  main: Article;
  sidebar: Article[];
}

export function HeroSection({ main, sidebar }: HeroSectionProps) {
  return (
    <section className="py-10 pb-12 bg-white dark:bg-[#1a1a2e] border-b border-[#DEDBD4] dark:border-[#2a2a3e]">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          <Link
            href={`/article/${main.slug}`}
            className="relative overflow-hidden rounded group"
          >
            <div className="relative w-full aspect-[16/9] lg:h-[480px]">
              <Image
                src={main.image}
                alt={main.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/90 via-[#0D1B2A]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <span className="inline-flex bg-[#C01D35] text-white text-[0.68rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm mb-3">
                {main.category.name}
              </span>
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white leading-tight mb-2.5">
                {main.title}
              </h2>
              <p className="text-sm text-white/80 leading-relaxed mb-4 line-clamp-2">
                {main.subtitle}
              </p>
              <div className="flex items-center gap-4 text-xs text-white/70">
                <span>{main.author.name}</span>
                <span>·</span>
                <time dateTime={main.publishedAt}>
                  {formatDistanceToNow(new Date(main.publishedAt), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </time>
                <span>·</span>
                <span>{main.readTime} min de lecture</span>
              </div>
            </div>
          </Link>

          <div className="flex flex-col gap-4">
            {sidebar.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="flex gap-3.5 p-3.5 rounded border border-[#DEDBD4] dark:border-[#2a2a3e] bg-[#F2F1EE] dark:bg-[#12121e] transition-all hover:border-[#CCCAC3] hover:bg-white dark:hover:bg-[#1a1a2e] hover:shadow-md group"
              >
                <div className="relative w-[90px] h-[72px] rounded overflow-hidden shrink-0">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="90px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.65rem] font-bold tracking-wider uppercase text-[#C01D35] mb-1">
                    {article.category.name}
                  </div>
                  <h3 className="font-serif text-[0.92rem] font-semibold leading-snug text-[#1A1A1A] dark:text-white line-clamp-3 group-hover:text-[#C01D35] transition-colors">
                    {article.title}
                  </h3>
                  <div className="text-[0.7rem] text-[#7A7A7A] mt-1.5">
                    {formatDistanceToNow(new Date(article.publishedAt), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

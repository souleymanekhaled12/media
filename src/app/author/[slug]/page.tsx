import { notFound } from "next/navigation";
import Image from "next/image";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { articles } from "@/lib/data/articles";
import { getAuthorBySlug, authors } from "@/lib/data/authors";
import type { Metadata } from "next";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};

  return {
    title: `${author.name} — ${author.role}`,
    description: author.bio,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) notFound();

  const authorArticles = articles
    .filter((a) => a.authorSlug === slug && a.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-12">
          <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
              sizes="96px"
              quality={100}
              unoptimized
            />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-extrabold text-[#0D1B2A] dark:text-white mb-2">
              {author.name}
            </h1>
            <div className="text-sm text-[#C01D35] font-semibold uppercase tracking-wider mb-3">
              {author.role}
            </div>
            <p className="text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed max-w-2xl">
              {author.bio}
            </p>
          </div>
        </div>

        <div className="mb-6 pb-3 border-b-2 border-[#DEDBD4] dark:border-[#2a2a3e]">
          <h2 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white flex items-center gap-2.5">
            <span className="w-[3px] h-5 bg-[#C01D35] rounded-sm block shrink-0" />
            Articles par {author.name} ({authorArticles.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}

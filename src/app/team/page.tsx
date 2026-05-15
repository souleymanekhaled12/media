import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { authors } from "@/lib/data/authors";
import { articles } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "Notre Équipe",
  description:
    "Découvrez l'équipe de journalistes et analystes de Ligne Rouge, dédiée à l'information rigoureuse et indépendante.",
};

const leadership = [
  {
    name: "Ousmane Ndiaye",
    role: "Directeur de la Publication",
    bio: "Ancien correspondant de Reuters en Afrique de l'Ouest, 20 ans d'expérience dans le journalisme international. Diplômé de Sciences Po Paris et de la Columbia Journalism School.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&fit=crop",
  },
  {
    name: "Marie-Claire Dupont",
    role: "Directrice Générale",
    bio: "Experte en médias numériques et transformation digitale. Ancienne directrice de la stratégie digitale chez Le Monde.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&fit=crop",
  },
];

export default function TeamPage() {
  return (
    <div className="py-16 bg-white dark:bg-[#1a1a2e]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[#C01D35] text-xs font-bold tracking-[0.12em] uppercase mb-4">
            L&apos;Équipe
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-extrabold text-[#0D1B2A] dark:text-white leading-tight mb-6">
            Notre Rédaction
          </h1>
          <p className="text-lg text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed max-w-[600px] mx-auto">
            Une équipe de journalistes et analystes expérimentés, engagés pour
            une information de qualité au service du public.
          </p>
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-2.5 mb-8 pb-3 border-b-2 border-[#DEDBD4] dark:border-[#2a2a3e]">
            <span className="w-[3px] h-5 bg-[#C01D35] rounded-sm block shrink-0" />
            <h2 className="font-serif text-2xl font-bold text-[#0D1B2A] dark:text-white">
              Direction
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="flex gap-5 p-6 rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] bg-[#F2F1EE] dark:bg-[#12121e]"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={person.avatar}
                    alt={person.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0D1B2A] dark:text-white">
                    {person.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#C01D35] uppercase tracking-wider">
                    {person.role}
                  </span>
                  <p className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed mt-2">
                    {person.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-2.5 mb-8 pb-3 border-b-2 border-[#DEDBD4] dark:border-[#2a2a3e]">
            <span className="w-[3px] h-5 bg-[#C01D35] rounded-sm block shrink-0" />
            <h2 className="font-serif text-2xl font-bold text-[#0D1B2A] dark:text-white">
              Journalistes & Analystes
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {authors.map((author) => {
              const authorArticles = articles.filter(
                (a) => a.authorSlug === author.slug
              );
              return (
                <Link
                  key={author.id}
                  href={`/author/${author.slug}`}
                  className="group p-6 rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] bg-white dark:bg-[#1a1a2e] hover:border-[#C01D35] hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={author.avatar}
                        alt={author.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-[#0D1B2A] dark:text-white group-hover:text-[#C01D35] transition-colors">
                        {author.name}
                      </h3>
                      <span className="text-xs font-semibold text-[#C01D35] uppercase tracking-wider">
                        {author.role}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed line-clamp-3 mb-4">
                    {author.bio}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[#7A7A7A]">
                    <span>{authorArticles.length} article{authorArticles.length !== 1 ? "s" : ""}</span>
                    <div className="flex gap-2">
                      {author.social?.twitter && (
                        <span className="text-[#1DA1F2]">𝕏</span>
                      )}
                      {author.social?.linkedin && (
                        <span className="text-[#0077B5]">in</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="text-center p-8 rounded-lg bg-[#0D1B2A] text-white">
          <h2 className="font-serif text-xl font-bold mb-3">
            Rejoindre la rédaction
          </h2>
          <p className="text-sm text-white/70 mb-4 max-w-[400px] mx-auto">
            Ligne Rouge recrute des journalistes talentueux et engagés.
            Envoyez-nous votre candidature.
          </p>
          <a
            href="mailto:recrutement@lignerouge.info"
            className="inline-block bg-[#C01D35] text-white text-sm font-bold px-6 py-3 rounded hover:bg-[#A01728] transition-colors"
          >
            Postuler
          </a>
        </div>
      </div>
    </div>
  );
}

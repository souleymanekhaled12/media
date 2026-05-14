import type { Author } from "@/types";

export const authors: Author[] = [
  {
    id: "author-1",
    name: "Aminata Diallo",
    slug: "aminata-diallo",
    bio: "Rédactrice en chef adjointe. Spécialiste en géopolitique africaine et relations internationales. 15 ans d'expérience dans le journalisme d'investigation.",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&h=200&fit=crop",
    role: "Rédactrice en chef adjointe",
    social: {
      twitter: "https://twitter.com/aminatadiallo",
      linkedin: "https://linkedin.com/in/aminatadiallo",
    },
  },
  {
    id: "author-2",
    name: "Moussa Keita",
    slug: "moussa-keita",
    bio: "Correspondant international. Couvre l'actualité politique et économique en Afrique de l'Ouest depuis plus de 10 ans.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop",
    role: "Correspondant international",
    social: {
      twitter: "https://twitter.com/moussakeita",
    },
  },
  {
    id: "author-3",
    name: "Fatou Sow",
    slug: "fatou-sow",
    bio: "Journaliste spécialisée en technologie et innovation. Passionnée par la transformation numérique du continent africain.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&fit=crop",
    role: "Journaliste Tech & Innovation",
    social: {
      twitter: "https://twitter.com/fatousow",
      linkedin: "https://linkedin.com/in/fatousow",
    },
  },
  {
    id: "author-4",
    name: "Ibrahim Touré",
    slug: "ibrahim-toure",
    bio: "Analyste économique et financier. Expert des marchés africains et des politiques monétaires.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop",
    role: "Analyste économique",
    social: {
      linkedin: "https://linkedin.com/in/ibrahimtoure",
    },
  },
  {
    id: "author-5",
    name: "Aïssatou Ba",
    slug: "aissatou-ba",
    bio: "Journaliste culturelle et critique d'art. Couvre les événements artistiques majeurs du continent.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop",
    role: "Journaliste Culture",
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

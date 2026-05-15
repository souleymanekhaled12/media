import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { categories } from "@/lib/data/categories";
import { authors } from "@/lib/data/authors";
import { articles as localArticles } from "@/lib/data/articles";

export async function POST() {
  try {
    // Seed categories
    for (const cat of categories) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: { name: cat.name, description: cat.description ?? "", color: cat.color },
        create: {
          name: cat.name,
          slug: cat.slug,
          description: cat.description ?? "",
          color: cat.color,
        },
      });
    }

    // Seed editor profile
    const editor = authors[0];
    const user = await prisma.user.upsert({
      where: { email: "alassane.ibraima@lignerouge.info" },
      update: {
        name: editor.name,
        bio: editor.bio,
        avatar: editor.avatar,
        role: "EDITOR",
      },
      create: {
        email: "alassane.ibraima@lignerouge.info",
        name: editor.name,
        bio: editor.bio,
        avatar: editor.avatar,
        role: "EDITOR",
      },
    });

    // Seed articles
    const dbCategories = await prisma.category.findMany();
    const catMap = new Map(dbCategories.map((c) => [c.slug, c.id]));

    let seededCount = 0;
    for (const art of localArticles) {
      const categoryId = catMap.get(art.categorySlug);
      if (!categoryId) continue;

      const existing = await prisma.article.findUnique({ where: { slug: art.slug } });
      if (existing) continue;

      await prisma.article.create({
        data: {
          slug: art.slug,
          title: art.title,
          subtitle: art.subtitle || null,
          excerpt: art.excerpt,
          body: art.body,
          image: art.image,
          imageCaption: art.imageCaption || null,
          status: art.status === "published" ? "PUBLISHED" : "DRAFT",
          featured: art.featured,
          breaking: art.breaking,
          readTime: art.readTime,
          views: art.views,
          locale: art.locale,
          publishedAt: new Date(art.publishedAt),
          authorId: user.id,
          categoryId,
        },
      });
      seededCount++;
    }

    return NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
      categoriesSeeded: categories.length,
      articlesSeeded: seededCount,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

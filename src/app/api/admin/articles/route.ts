import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const where = status ? { status: status.toUpperCase() as "PUBLISHED" | "DRAFT" | "REVIEW" | "SCHEDULED" | "ARCHIVED" } : {};

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          category: { select: { id: true, name: true, slug: true, color: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.article.count({ where }),
    ]);

    return NextResponse.json({ articles, total, page, limit });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, subtitle, excerpt, content, categoryId, authorId, image, imageCaption, status, featured, breaking, tags } = body;

    if (!title || !excerpt || !content || !categoryId || !authorId) {
      return NextResponse.json(
        { error: "title, excerpt, content, categoryId, and authorId are required" },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 100);

    const existingSlug = await prisma.article.findUnique({ where: { slug } });
    const finalSlug = existingSlug ? `${slug}-${Date.now()}` : slug;

    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    const article = await prisma.article.create({
      data: {
        slug: finalSlug,
        title,
        subtitle: subtitle || null,
        excerpt,
        body: content,
        image: image || null,
        imageCaption: imageCaption || null,
        status: status === "published" ? "PUBLISHED" : "DRAFT",
        featured: featured || false,
        breaking: breaking || false,
        readTime,
        publishedAt: status === "published" ? new Date() : null,
        authorId,
        categoryId,
      },
      include: {
        author: { select: { id: true, name: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
    });

    // Handle tags
    if (tags && Array.isArray(tags) && tags.length > 0) {
      for (const tagName of tags) {
        const tagSlug = tagName
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        const tag = await prisma.tag.upsert({
          where: { slug: tagSlug },
          update: {},
          create: { name: tagName, slug: tagSlug },
        });

        await prisma.articleTag.create({
          data: { articleId: article.id, tagId: tag.id },
        });
      }
    }

    revalidatePath("/");
    revalidatePath(`/article/${finalSlug}`);
    revalidatePath("/admin");

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

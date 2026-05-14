import { NextRequest, NextResponse } from "next/server";
import { articles } from "@/lib/data/articles";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = parseInt(searchParams.get("offset") || "0");

  let filtered = articles.filter((a) => a.status === "published");

  if (category) {
    filtered = filtered.filter((a) => a.categorySlug === category);
  }

  filtered.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const total = filtered.length;
  const data = filtered.slice(offset, offset + limit);

  return NextResponse.json({
    articles: data,
    total,
    hasMore: offset + limit < total,
  });
}

import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@/lib/data/articles";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ articles: [], total: 0, query: query || "" });
  }

  const results = searchArticles(query);

  return NextResponse.json({
    articles: results,
    total: results.length,
    query,
  });
}

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  return NextResponse.json({ favorites: [], userId });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, articleSlug, action } = body;

    if (!userId || !articleSlug) {
      return NextResponse.json({ error: "userId and articleSlug are required" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      action: action || "add",
      articleSlug,
      userId,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

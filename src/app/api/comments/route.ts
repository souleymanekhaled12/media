import { NextRequest, NextResponse } from "next/server";

const PROFANITY_PATTERNS = [
  /\bspam\b/i,
  /\bscam\b/i,
  /https?:\/\/[^\s]+\.(xyz|tk|ml|ga|cf)\b/i,
];

function moderateContent(content: string): { approved: boolean; reason?: string } {
  if (content.length < 3) return { approved: false, reason: "Comment too short" };
  if (content.length > 2000) return { approved: false, reason: "Comment too long" };
  for (const pattern of PROFANITY_PATTERNS) {
    if (pattern.test(content)) return { approved: false, reason: "Content flagged by moderation" };
  }
  return { approved: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { articleSlug, author, content, parentId } = body;

    if (!articleSlug || !author || !content) {
      return NextResponse.json(
        { error: "articleSlug, author and content are required" },
        { status: 400 }
      );
    }

    if (typeof author !== "string" || author.length < 2 || author.length > 100) {
      return NextResponse.json({ error: "Invalid author name" }, { status: 400 });
    }

    const moderation = moderateContent(content);

    const comment = {
      id: `comment-${Date.now()}`,
      articleSlug,
      author: author.trim(),
      content: content.trim(),
      parentId: parentId || null,
      createdAt: new Date().toISOString(),
      approved: moderation.approved,
      moderationReason: moderation.reason || null,
    };

    return NextResponse.json({
      success: true,
      comment,
      message: moderation.approved
        ? "Commentaire publié avec succès"
        : "Commentaire en attente de modération",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const articleSlug = searchParams.get("articleSlug");

  if (!articleSlug) {
    return NextResponse.json({ error: "articleSlug is required" }, { status: 400 });
  }

  return NextResponse.json({
    comments: [],
    total: 0,
    articleSlug,
  });
}

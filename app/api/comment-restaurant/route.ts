import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { restaurantId, content } = await request.json();

    if (!restaurantId || isNaN(restaurantId)) {
      return NextResponse.json(
        { error: "Invalid restaurant ID" },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        userId: session.user.id,
        restaurantId,
      },
      include: { user: true },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error submitting comment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

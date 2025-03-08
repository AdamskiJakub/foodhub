import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { restaurantId, value } = await req.json();

    const existingRating = await prisma.rating.findFirst({
      where: {
        userId: session.user.id,
        restaurantId,
      },
    });

    if (existingRating) {
      return NextResponse.json(
        { error: "You have already rated this restaurant" },
        { status: 400 }
      );
    }

    await prisma.rating.create({
      data: {
        value,
        userId: session.user.id,
        restaurantId,
      },
    });

    const newRating = await prisma.rating.create({
      data: {
        value,
        userId: session.user.id,
        restaurantId,
      },
    });

    const ratings = await prisma.rating.findMany({
      where: { restaurantId },
    });

    const averageRating =
      ratings.reduce((sum, rating) => sum + rating.value, 0) / ratings.length;

    return NextResponse.json({ newRating, averageRating }, { status: 200 });
  } catch (error) {
    console.error("Error submitting rating:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

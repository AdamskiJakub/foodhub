import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const restaurantId = parseInt(id);

    if (isNaN(restaurantId)) {
      return NextResponse.json(
        { error: "Invalid restaurant ID" },
        { status: 400 }
      );
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: { ratings: true, comments: { include: { user: true } } },
    });

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    const averageRating =
      restaurant.ratings.length > 0
        ? restaurant.ratings.reduce((sum, rating) => sum + rating.value, 0) /
          restaurant.ratings.length
        : 0;

    return NextResponse.json({
      ...restaurant,
      averageRating,
    });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

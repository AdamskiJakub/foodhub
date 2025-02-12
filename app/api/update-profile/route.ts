import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, dateOfBirth, location, phoneNumber, address } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    const parsedDateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        dateOfBirth: parsedDateOfBirth,
        location: location || null,
        phoneNumber: phoneNumber || null,
        address: address || null,
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error updating profile:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { message: "An error occurred while updating the profile" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email: rawEmail,
      password,
      dateOfBirth,
      location,
      phoneNumber,
      name,
    } = body;
    const email = rawEmail?.toLowerCase().trim();

    if (typeof rawEmail !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { message: "Invalid email or password format" },
        { status: 400 },
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing email or password" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already taken" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        location,
        phoneNumber,
      },
      select: {
        id: true,
        name: true,
        email: true,
        dateOfBirth: true,
        location: true,
        phoneNumber: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Registration error:", error.message);
    } else {
      console.error("Unknown registration error:", error);
    }

    return NextResponse.json(
      {
        message: "Failed to create user",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

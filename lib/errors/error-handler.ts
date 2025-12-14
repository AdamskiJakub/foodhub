import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ApiError } from "./api-error";

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      },
      { status: 422 }
    );
  }

  if (error instanceof ApiError) {
    const response: { error: string; details?: unknown } = {
      error: error.message,
    };

    if (error.details) {
      response.details = error.details;
    }

    return NextResponse.json(response, { status: error.statusCode });
  }

  console.error("[API Error Handler] Unhandled error:", {
    error,
    message: error instanceof Error ? error.message : "Unknown error",
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString(),
  });
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

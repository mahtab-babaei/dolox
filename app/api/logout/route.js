import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set("access", "", { maxAge: -1 });
    response.cookies.set("refresh", "", { maxAge: -1 });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during logout" },
      { status: 500 }
    );
  }
}

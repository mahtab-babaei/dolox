import { destroyCookie } from "nookies";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Destroy cookies on the server-side
    destroyCookie({ res: NextResponse.next() }, "access");
    destroyCookie({ res: NextResponse.next() }, "refresh");

    // Return success message
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred during logout" }, { status: 500 });
  }
}
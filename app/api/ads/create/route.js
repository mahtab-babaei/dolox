import { BackendURL } from "@/utils/URL";
import { NextResponse } from "next/server";
import { getToken } from "@/utils/Auth";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const token = await getToken();
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "Token not found" }),
        { status: 401 }
      );
    }

    // Forward the request to the backend
    const backendResponse = await fetch(`${BackendURL}/ads/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

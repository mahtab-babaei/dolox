import { BackendURL } from "@/utils/URL";
import { getToken } from "@/utils/Auth";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { adId } = await params;
    const formData = await req.formData();

    const token = await getToken();
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "Token not found" }),
        { status: 401 }
      );
    }

    const backendResponse = await fetch(
      `${BackendURL}/ads/cars/${adId}/images/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Error uploading images:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}

import { BackendURL } from "@/utils/URL";
import { getToken } from "@/utils/Auth";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { autoId } = params;
    if (!autoId) {
      throw new Error("autoId is missing");
    } else {
      console.log("AUTOID: ", autoId);
    }

    const formData = await req.formData();
    console.log("FormData received:", formData);

    const token = await getToken();
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "Token not found" }),
        { status: 401 }
      );
    }

    const backendResponse = await fetch(
      `${BackendURL}/ads/exhibitions/${autoId}/videos/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error("Backend error response:", errorText);
      throw new Error(`Backend error: ${backendResponse.status}`);
    }

    const backendResponseText = await backendResponse.text();
    console.log("Backend response body:", backendResponseText);

    let data;
    try {
      data = JSON.parse(backendResponseText);
    } catch (error) {
      console.error("Error parsing backend response JSON:", error);
      throw new Error("Invalid JSON response from backend");
    }

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Error uploading videos:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}

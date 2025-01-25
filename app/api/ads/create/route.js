import { BackendURL } from "@/utils/URL";
import { NextResponse } from "next/server";
import { getToken } from "@/utils/Auth";

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Convert formData to object to check values
    const formDataObject = {};
    for (let [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // Parse features
    if (formDataObject.features) {
      try {
        formDataObject.features = JSON.parse(formDataObject.features);
      } catch (error) {
        console.error("Error parsing features:", error.message);
        return NextResponse.json(
          { success: false, message: "Invalid features format" },
          { status: 400 }
        );
      }
    }


    console.log("Processed formDataObject:", formDataObject);

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

import { getToken } from "@/utils/Auth";
import jwt from "jsonwebtoken";
import { BackendURL } from "@/utils/URL";

export async function GET(request) {
  try {
    // Get the token
    const token = await getToken();
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "Token not found" }),
        { status: 401 }
      );
    }

    // Decode the token to extract userId
    const decoded = jwt.decode(token);
    const userId = decoded?.user_id;
    if (!userId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User ID not found in token",
        }),
        { status: 400 }
      );
    }

    const response = await fetch(`${BackendURL}/accounts/profile/${userId}/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null); 
      return new Response(
        JSON.stringify({
          success: false,
          message: errorData?.message || "خطا در دریافت اطلاعات پروفایل",
        }),
        { status: response.status }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(
      JSON.stringify({ success: false, message: "خطای داخلی سرور" }),
      { status: 500 }
    );
  }
}

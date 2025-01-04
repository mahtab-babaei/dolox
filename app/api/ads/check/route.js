import { BackendURL } from "@/utils/URL";
import { getToken } from "@/utils/Auth";

export async function GET(request) {
  try {
    // Get token
    const token = await getToken();
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "Token not found" }),
        { status: 401 }
      );
    }

    // Define headers
    const myHeaders = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    // Make the GET request
    const response = await fetch(`${BackendURL}/ads/check-athorization`, {
      method: "GET",
      headers: myHeaders,
    });

    // Parse the response
    console.log("Raw Response:", response);
    const result = await response.json();
    console.log("Response Data:", result);

    if (response.ok) {
      return new Response(
        JSON.stringify({
          success: true,
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: result.message || "درخواست با خطا مواجه شد",
      }),
      { status: response.status }
    );
  } catch (error) {
    console.error("Error in PATCH request:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "خطای داخلی سرور رخ داد",
      }),
      { status: 500 }
    );
  }
}

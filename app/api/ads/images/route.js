import { BackendURL } from "@/utils/URL";
import { getToken } from "@/utils/Auth";

export async function POST(request) {
  try {
    const { adID, images } = await request.json();

    // Get the token
    const token = await getToken();
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "Token not found" }),
        { status: 401 }
      );
    }

    // Create formData
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    // Make POST request
    const response = await fetch(`${BackendURL}/ads/cars/${adID}/images/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    // Parse the response
    console.log("Raw Response:", response);
    const result = await response.json();
    console.log("Response Data:", result);

    if (response.ok) {
      return new Response(
        JSON.stringify({
          success: true,
          data: result,
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
    console.error("Error uploading image:", error);
    return new Response(
      JSON.stringify({ success: false, message: "خطای داخلی سرور رخ داد" }),
      { status: 500 }
    );
  }
}

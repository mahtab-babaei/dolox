import { getToken } from "@/utils/Auth";
import jwt from "jsonwebtoken";
import { BackendURL } from "@/utils/URL";

export async function PATCH(request) {
  try {
    const { firstName, lastName, email, city, gender, picture } =
      await request.json();

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

    // Create FormData to handle both text and file data
    const formData = new FormData();

    // Append fields to the form data
    formData.append("first_name", firstName);
    formData.append("gender", gender);
    formData.append("city", city);
    formData.append("last_name", lastName);
    formData.append("email", email);
    if (picture) {
      formData.append("picture", picture);
    }

    // Define headers
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`); // Authorization header only

    // Make the PATCH request
    const response = await fetch(`${BackendURL}/accounts/profile/${userId}/`, {
      method: "PATCH",
      headers: myHeaders,
      body: formData,
    });

    // Parse the response
    const result = await response.json();

    if (response.ok) {
      return new Response(
        JSON.stringify({
          success: true,
          message: result.message || "بروزرسانی اطلاعات با موفقیت انجام شد",
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: result.message || "بروزرسانی اطلاعات با مشکل مواجه شد",
        }),
        { status: response.status }
      );
    }
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

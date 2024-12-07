import { cookies } from "next/headers";
import { BackendURL } from "@/utils/URL";

export async function GET(req, { params }) {
  const { id } = params; // get auctionId from URL

  try {
    // get token
    const cookieStore = cookies();
    const token = cookieStore.get("access")?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401 }
      );
    }

    const response = await fetch(`${BackendURL}/auction/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      const error = await response.json();
      return new Response(
        JSON.stringify({ message: error.message || "خطا در دریافت اطلاعات" }),
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error fetching auction details:", error);
    return new Response(
      JSON.stringify({ message: "خطای داخلی سرور رخ داد" }),
      { status: 500 }
    );
  }
}

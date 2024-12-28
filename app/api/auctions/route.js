import { getToken } from "@/utils/Auth";
import { BackendURL } from "@/utils/URL";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const priceRangeMax = searchParams.get("priceRangeMax");
    const priceRangeMin = searchParams.get("priceRangeMin");
    const city = searchParams.get("city");
    const query = searchParams.get("query");
    const page = searchParams.get("page") || 1; // مقدار پیش‌فرض برای صفحه

    // Get the token
    const token = await getToken();

    // Define headers
    const myHeaders = new Headers();
    if (token) {
      myHeaders.append("Authorization", `Bearer ${token}`);
    }

    // Make the GET request
    const response = await fetch(
      `${BackendURL}/auction/?auction_type=${category}&base_price_max=${priceRangeMax}&base_price_min=${priceRangeMin}&city=${city}&page=${page}&search=${query}`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    );

    // Parse the response
    const result = await response.json();

    if (response.ok) {
      return new Response(
        JSON.stringify({
          success: true,
          data: result,
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "درخواست با خطا مواجه شد",
        }),
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "خطای داخلی سرور رخ داد",
      }),
      { status: 500 }
    );
  }
}

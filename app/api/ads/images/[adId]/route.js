// import { BackendURL } from "@/utils/URL";
// import { getToken } from "@/utils/Auth";

// export async function POST(request, { params }) {
//   try {
//     const { adID } = params;
//     const formData = await request.formData();

//     const token = await getToken();
//     if (!token) {
//       return new Response(
//         JSON.stringify({ success: false, message: "Token not found" }),
//         { status: 401 }
//       );
//     }

//     const response = await fetch(`${BackendURL}/ads/cars/${adID}/images/`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     });

//     const data = await response.json();
//     if (!response.ok) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           message: data.message || "درخواست با خطا مواجه شد",
//         }),
//         { status: response.status }
//       );
//     }

//     return new Response(
//       JSON.stringify({
//         success: true,
//         data,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error in API route:", error.message);
//     return new Response(
//       JSON.stringify({ success: false, message: "خطای داخلی سرور" }),
//       { status: 500 }
//     );
//   }
// }

import { BackendURL } from "@/utils/URL";
import { getToken } from "@/utils/Auth";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { adId } = params;
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

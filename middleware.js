import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  // دریافت کوکی توکن
  const token = req.cookies.get("access");
  // بررسی وجود توکن
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // بررسی صحت توکن
  const decoded = jwt.decode(token.value);

  if (!decoded || !decoded.user_id) {
    // اگر توکن معتبر نیست، هدایت به صفحه ورود
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // اجازه ادامه به درخواست
}

  // ادامه درخواست در صورتی که احراز هویت موفق باشد
  export const config = {
  matcher: ["/dashboard/:path*"], // فقط مسیرهای داشبورد را هدف قرار می‌دهد
};

// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/table", "/dashboard", "/settings", "/analytics"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("JSESSIONID")?.value;

  // Проверяем только защищённые маршруты
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );



  // ✅ Есть сессия → запрещаем заходить на login
  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/table", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/table/:path*",
    "/dashboard/:path*",
    "/settings/:path*",
    "/analytics/:path*",
    "/login",
  ],
};

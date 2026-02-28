import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./src/constants/roles";

const roleRedirectMap: Record<string, string> = {
  [Roles.student]: "/dashboard",
  [Roles.tutor]: "/tutor-dashboard",
  [Roles.admin]: "/admin-dashboard",
};

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // PUBLIC ROUTE
  if (pathname.startsWith("/find-tutors")) {
    return NextResponse.next();
  }

  // get from cookies (EDGE SAFE)
  const token = request.cookies.get("__Secure-better-auth.session_token")?.value;
  const role = request.cookies.get("role")?.value;

  // not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // dashboard role protection
  if (role) {
    const correctDashboard = roleRedirectMap[role];

    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/tutor-dashboard") ||
      pathname.startsWith("/admin-dashboard")
    ) {
      if (!pathname.startsWith(correctDashboard)) {
        return NextResponse.redirect(new URL(correctDashboard, request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tutor-dashboard/:path*",
    "/admin-dashboard/:path*",
  ],
};

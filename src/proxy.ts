import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

const roleRedirectMap: Record<string, string> = {
  [Roles.student]: "/dashboard",
  [Roles.tutor]: "/tutor-dashboard",
  [Roles.admin]: "/admin-dashboard",
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // PUBLIC ROUTE → allow without login
  if (pathname.startsWith("/find-tutors")) {
    return NextResponse.next();
  }

  let isAuthenticated = false;
  let userRole: string | null = null;

  const { data } = await userService.getSession();

  if (data?.user) {
    isAuthenticated = true;
    userRole = data.user.role;
  }

  // Not logged in → redirect
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Dashboard protection
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/tutor-dashboard") ||
    pathname.startsWith("/admin-dashboard")
  ) {
    const correctDashboard = roleRedirectMap[userRole!];

    if (!pathname.startsWith(correctDashboard)) {
      return NextResponse.redirect(new URL(correctDashboard, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/find-tutors/:path*",
    "/dashboard/:path*",
    "/tutor-dashboard/:path*",
    "/admin-dashboard/:path*",
  ],
};

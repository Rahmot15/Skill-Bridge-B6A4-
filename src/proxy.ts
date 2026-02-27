import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let userRole: string | null = null;

  const { data } = await userService.getSession();

  if (data?.user) {
    isAuthenticated = true;
    userRole = data.user.role;
  }

  // Not logged in → redirect to login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Find Tutor Details (Private - all roles allowed)
  if (pathname.startsWith("/find-tutors")) {
    return NextResponse.next();
  }

  // Student Routes
  if (pathname.startsWith("/dashboard") && userRole !== Roles.student) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Tutor Routes
  if (pathname.startsWith("/tutor-dashboard") && userRole !== Roles.tutor) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Admin Routes
  if (pathname.startsWith("/admin-dashboard") && userRole !== Roles.admin) {
    return NextResponse.redirect(new URL("/", request.url));
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

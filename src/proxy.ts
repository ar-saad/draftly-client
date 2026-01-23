import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { UserRoles } from "./constants/userRoles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let isAuthenticated: Boolean = false;
  let isAdmin: Boolean = false;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === UserRoles.admin;
  }

  //* User is not authenticated
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //* User is authenticated and role = admin
  //* User can not visit user dashboard
  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  //* User is authenticated and role = user
  //* User can not visit admin dashboard
  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // default return
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};

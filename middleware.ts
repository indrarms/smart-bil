import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Hanya lindungi admin routes
  if (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/customers") ||
      pathname.startsWith("/invoices") ||
      pathname.startsWith("/payments") ||
      pathname.startsWith("/reports") ||
      pathname.startsWith("/settings")) {

    const role = req.cookies.get("role")?.value;

    // Belum login
    if (!role) {
      return NextResponse.redirect(
        new URL("/auth/login", req.url)
      );
    }

    // Bukan admin
    if (role !== "ADMIN") {
      return NextResponse.redirect(
        new URL("/my-invoices", req.url)
      );
    }
  }

  return NextResponse.next();
}

import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const isApi = pathname.startsWith("/api");
  if (isApi) return NextResponse.next();

  const isPublicAsset = pathname.startsWith("/_next") || pathname === "/favicon.ico";
  if (isPublicAsset) return NextResponse.next();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (!sessionCookie && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (sessionCookie && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};

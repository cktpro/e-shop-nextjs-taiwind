import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default async function middleware(req, event) {
  if (req.nextUrl.pathname === "/log-in" || req.nextUrl.pathname === "/sign-up") {
    const currentUrl = req.nextUrl.clone();

    const session = await getToken({
      req,
      secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    });

    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.rewrite(currentUrl);
  }

  const authMiddleware = withAuth({
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    pages: {
      signIn: "/log-in",
    },
  });

  return authMiddleware(req, event);
}

export const config = {
  matcher: ["/cart", "/wish-list", "/account", "/log-in", "/sign-up"],
};

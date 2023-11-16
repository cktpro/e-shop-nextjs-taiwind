// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
// });

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default async function middleware(req, event) {
  // If the user is already logged in and tries to access the login or sign-up page, redirect to "/"
  if (req.nextUrl.pathname === "/log-in" || req.nextUrl.pathname === "/sign-up") {
    console.log("««««« run »»»»»");
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
    });

    console.log("««««« session »»»»»", session);

    if (session) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
  }

  // Use withAuth middleware for protected routes
  const authMiddleware = withAuth({
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    pages: {
      signIn: "/log-in",
    },
  });

  return authMiddleware(req, event);
}

export const config = {
  matcher: ["/cart", "/wish-list", "/account", "/log-in"],
};

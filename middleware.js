import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { withAuth } from "next-auth/middleware";

// export default async function middleware(req, event) {
//   if (req.nextUrl.pathname === "/log-in" || req.nextUrl.pathname === "/sign-up") {
//     const currentUrl = req.nextUrl.clone();

//     const session = await getToken({
//       req,
//       secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
//     });

//     if (session) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     return NextResponse.rewrite(currentUrl);
//   }

//   const authMiddleware = withAuth({
//     secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
//     pages: {
//       signIn: "/log-in",
//       error: "/error-auth",
//     },
//   });

//   return authMiddleware(req, event);
// }

export default async function middleware(req, res) {
  const currentUrl = req.nextUrl.clone();

  const getToken = getCookie("TOKEN", { req, res });
  const getRefreshToken = getCookie("REFRESH_TOKEN", { req, res });

  if (req.nextUrl.pathname === "/log-in" || req.nextUrl.pathname === "/sign-up") {
    if (getToken && getRefreshToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.rewrite(currentUrl);
  }

  if (
    req.nextUrl.pathname === "/cart" ||
    req.nextUrl.pathname === "/wish-list" ||
    req.nextUrl.pathname === "/account"
  ) {
    if (getToken && getRefreshToken) {
      return NextResponse.rewrite(currentUrl);
    }

    return NextResponse.redirect(new URL("/log-in", req.url));
  }

  return NextResponse.rewrite(currentUrl);
}

export const config = {
  matcher: ["/cart", "/wish-list", "/account", "/log-in", "/sign-up"],
};

import { auth as middleware } from "@/auth";
import { NextResponse } from "next/server";

export default middleware((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAccountPage = req.nextUrl.pathname.startsWith("/account");

  if (isOnAccountPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

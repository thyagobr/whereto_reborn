import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const blockedPaths = ["/signup", "/login"];

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  //return NextResponse.next();
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const { pathname } = req.nextUrl;

  if (blockedPaths.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  } else {
    return NextResponse.next();
  }

  //const authMiddleware = withAuth({
  //   pages: {
  //     signIn: `/login`,
  //   },
  //});

  //// // @ts-expect-error - `authMiddleware` is not compatible with the Next.js middleware type
  //return authMiddleware(req, event);
}

export const config = { matcher: ["/((?!static|image|favicon.ico|events).*)"] };

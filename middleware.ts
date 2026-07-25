import { NextResponse, type NextRequest } from "next/server";

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false;
  }
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = atob(base64Credentials);
  const [user, password] = credentials.split(":");
  const expectedUser = process.env.ADMIN_BASIC_USER;
  const expectedPassword = process.env.ADMIN_BASIC_PASSWORD;

  console.log("DEBUG auth check:", {
    receivedUser: user,
    receivedPasswordLength: password?.length,
    expectedUserExists: !!expectedUser,
    expectedPasswordExists: !!expectedPassword,
    expectedPasswordLength: expectedPassword?.length,
    userMatches: user === expectedUser,
    passwordMatches: password === expectedPassword,
  });

  return user === expectedUser && password === expectedPassword;
}

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nalex-pathname", request.nextUrl.pathname);

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!isAuthorized(request)) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="NALEX Admin"' },
      });
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = { matcher: ["/((?!_next/|images/|favicon.ico).*)"] };

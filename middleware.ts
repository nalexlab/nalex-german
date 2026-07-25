import { NextResponse, type NextRequest } from "next/server";

function decodeBasicCredentials(encoded: string): {
  user: string;
  password: string;
} | null {
  try {
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, (character) =>
      character.charCodeAt(0),
    );
    const credentials = new TextDecoder("utf-8", {
      fatal: true,
    }).decode(bytes);

    const separatorIndex = credentials.indexOf(":");

    if (separatorIndex < 0) {
      return null;
    }

    return {
      user: credentials.slice(0, separatorIndex),
      password: credentials.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

function isAuthorized(request: NextRequest): boolean {
  const expectedUser = process.env.ADMIN_BASIC_USER;
  const expectedPassword = process.env.ADMIN_BASIC_PASSWORD;

  // Admin bleibt gesperrt, falls eine Variable fehlt.
  if (!expectedUser || !expectedPassword) {
    return false;
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Basic ")) {
    return false;
  }

  const encodedCredentials = authHeader.slice("Basic ".length).trim();
  const credentials = decodeBasicCredentials(encodedCredentials);

  if (!credentials) {
    return false;
  }

  return (
    credentials.user === expectedUser &&
    credentials.password === expectedPassword
  );
}

export function middleware(request: NextRequest) {
  if (!isAuthorized(request)) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="NALEX Admin", charset="UTF-8"',
        "Cache-Control": "no-store",
      },
    });
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nalex-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};

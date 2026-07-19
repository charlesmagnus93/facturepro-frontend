import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/clients", "/invoices"];
const publicRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isLoggedIn = request.cookies.has("logged_in");

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );
    const isPublic = publicRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtected && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isPublic && isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

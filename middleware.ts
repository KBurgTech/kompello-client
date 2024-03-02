import { auth } from "@/auth"
import createMiddleware from 'next-intl/middleware';

const langMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'de'],

    // Used when no locale matches
    defaultLocale: 'en',
    localePrefix: 'never'
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

// @ts-ignore
export const middleware = auth((req) => {
    const isLoggedIn = !!req.auth
    if (isLoggedIn) {
        if(!req.cookies.has("KOMPELLO_TENANT") && req.nextUrl.pathname !== ('/')){
            return Response.redirect(new URL("/", req.nextUrl));
        }
        return langMiddleware(req)
    }

    if (req.nextUrl.pathname.startsWith('/api/auth')) {
        return req
    }
    return Response.redirect(new URL("/api/auth/signin", req.nextUrl));
})
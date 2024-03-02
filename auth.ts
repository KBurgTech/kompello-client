import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth"
import { apiConfiguration } from "@/server-api"
import { AuthApi, AuthRefreshCreateRequest, Configuration, UserInformation, UsersApi } from "./kompello-api";
import { UserPasswordLogin } from "@/kompello-api"

const BACKEND_ACCESS_TOKEN_LIFETIME = 60 * 55;            // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;  // 6 days

const getCurrentEpochTime = () => {
    return Math.floor(new Date().getTime() / 1000);
};

export interface KompelloUser extends UserInformation {
    permissions: string[]
}

export interface KompelloAuthInfo {
    accessToken: string
    refreshToken: string
    expriresAt: number
    user: KompelloUser
}

async function getCurrentUserFromServer(access_token: string) {
    const api = new UsersApi(apiConfiguration(() => { return access_token }))
    return await api.usersMe({next: { tags: ['currentUser'] }})
}

async function getPermissionsForUser(access_token: string, uuid: string) {
    const api = new UsersApi(apiConfiguration(() => { return access_token }))
    return await api.permissions({uuid: uuid}, {next: { tags: ['currentUser'] }})
}

async function updateSessionUser(token: KompelloAuthInfo){
    const api = new AuthApi(apiConfiguration(() => { return "" }))
    try{
        const param = {
            tokenRefresh:
            {
                refresh: token.refreshToken
            }} as AuthRefreshCreateRequest
        const newToken = await api.authRefreshCreate(param)
        
        const updUser = await getCurrentUserFromServer(newToken.access)
        token.accessToken = newToken.access
        token.refreshToken = newToken.refresh
        token.expriresAt = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME
        token.user = {...token.user, ...(updUser)}
        token.user.permissions = (await getPermissionsForUser(newToken.access, token.user.uuid)).permissions
        return token
    }
    catch(e){
        signOut()
    }
}

const providers = [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" }
        },
        // @ts-ignore
        async authorize(credentials, req): Promise<KompelloAuthInfo | null> {
            const api = new AuthApi(new Configuration({basePath: process.env.KOMPELLO_BACKEND}))
            try {
                return await api.passwordAuth({ userPasswordLogin: credentials as UserPasswordLogin }) as KompelloAuthInfo
            }
            catch (e) {
                return null
            }
        }
    })
]

export const config = {
    theme: {
        logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    },
    session: {
        strategy: "jwt",
        maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
    },
    providers: providers,
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            if (!pathname.startsWith("/auth/")) return !!auth
            return true
        },
        async jwt({ user, token, account, trigger, session }) {
            if (user && account) {
                token.kompello = user
            }

            const kompelloToken = (token.kompello as KompelloAuthInfo)
            if (kompelloToken.user.permissions === undefined) {
                kompelloToken.user.permissions = (await getPermissionsForUser(kompelloToken.accessToken, kompelloToken.user.uuid)).permissions
            }
            // Refresh the backend token if necessary
            // @ts-ignore
            if (trigger === "update" | kompelloToken.expriresAt < getCurrentEpochTime()) {
                await updateSessionUser(kompelloToken)
            }
            return token;
        },
        // @ts-ignore
        async session({ token, session, trigger }) {
            if (trigger === "update") {
                await updateSessionUser(token.kompello as unknown as KompelloAuthInfo)
            }
            return token.kompello;
        },
    },
} satisfies NextAuthConfig

//@ts-ignore
export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth(config)
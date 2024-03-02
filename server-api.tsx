import { KompelloAuthInfo, auth } from "@/auth"
import { Configuration, UsersApi, AuthApi as AuthsApi, TenantsApi } from "./kompello-api";
import { cookies } from 'next/headers'


async function accessTokenFetcher(){
    const session = await auth() as unknown as KompelloAuthInfo
    return session?.accessToken
}

export const apiConfiguration = (accessTokenFetcher: Function) => new Configuration({
    basePath: process.env.KOMPELLO_BACKEND,
    accessToken: async () => {
        return await accessTokenFetcher()
    },
    middleware: [{
        async pre(context) {
            // @ts-ignore
            context.init.headers["X-KOMPELLO-TENANT"] = cookies().get("KOMPELLO_TENANT")?.value as string
            return context
        }
    }]
})

export const UserApi = new UsersApi(apiConfiguration(accessTokenFetcher));
export const AuthApi = new AuthsApi(apiConfiguration(accessTokenFetcher));
export const TenantApi = new TenantsApi(apiConfiguration(accessTokenFetcher));
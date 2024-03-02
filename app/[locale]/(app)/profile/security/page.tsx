import { Separator } from "@/components/ui/separator"
import { KompelloAuthInfo, auth } from "@/auth"
import { getTranslations } from "next-intl/server"
import { UserApi } from "@/server-api"
import { ProfileSecurityForm } from "./security-form"
import { ResponseError, UsersSetPasswordRequest } from "@/kompello-api"

async function updatePassword(data: { password: string; }) {
    'use server'
    const session = await auth() as unknown as KompelloAuthInfo
    const payload: UsersSetPasswordRequest = {
        uuid: session?.user.uuid,
        password: {
            password: data.password
        }
    }

    try {
        const res = await UserApi.usersSetPassword(payload)
        return {
            success: true,
            message: "Password updated successfully"
        }
    }
    catch (e) {
        const responseError = e as ResponseError
        return {
            success: false,
            message: responseError.response.statusText
        }
    }
}

export default async function SecurityProfilePage() {
    const t = await getTranslations()
    const text = {
        password: t("options.password"),
        update: t("options.update"),
    }
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">{t("options.security")}</h3>
                <p className="text-sm text-muted-foreground">
                    {t("longTitles.userSecuritySettings")}
                </p>
            </div>
            <Separator />
            <ProfileSecurityForm text={text} updatePasswordAction={updatePassword} />
        </div>
    )
}
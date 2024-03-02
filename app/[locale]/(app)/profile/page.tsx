import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "./profile-form"
import { KompelloAuthInfo, auth, unstable_update } from "@/auth"
import { getTranslations } from "next-intl/server"
import { UserApi } from "@/server-api"
import { ResponseError, UsersPartialUpdateRequest } from "@/kompello-api"

async function updateUser(data: { email: string; firstName: string; lastName: string; }) {
    'use server'

    const session = await auth() as unknown as KompelloAuthInfo
    const payload: UsersPartialUpdateRequest = {
        uuid: session?.user.uuid,
        patchedUser: data
    }

    try {
        const res = await UserApi.usersPartialUpdate(payload)
        const test = {...session, ...res}
        unstable_update(test)
        return {
            success: true,
            message: "Profile updated successfully"
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

export default async function SettingsProfilePage() {
    const session = await auth() as unknown as KompelloAuthInfo
    const t = await getTranslations()
    const text = {
        email: t("profile.email"),
        firstname: t("profile.firstname"),
        lastname: t("profile.lastname"),
        save: t("options.save"),
    }
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">{t("options.profile")}</h3>
                <p className="text-sm text-muted-foreground">
                    {t("profile.longDescription")}
                </p>
            </div>
            <Separator />
            <ProfileForm user={session?.user} text={text} updateUserAction={updateUser} />
        </div>
    )
}
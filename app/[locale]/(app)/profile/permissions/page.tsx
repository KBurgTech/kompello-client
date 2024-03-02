import { KompelloAuthInfo, auth } from "@/auth"
import { Separator } from "@/components/ui/separator"
import { getTranslations } from "next-intl/server"

export default async function SecurityProfilePage() {
    const t = await getTranslations()
    const session = await auth() as unknown as KompelloAuthInfo
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">{t("options.permissions")}</h3>
                <p className="text-sm text-muted-foreground">
                    {t("longTitles.userPermissions")}
                </p>
            </div>
            <Separator />
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                {session?.user.permissions.map((permission: string) => {
                    return <li key={permission}>{permission}</li>
                })}
            </ul>
        </div>
    )
}
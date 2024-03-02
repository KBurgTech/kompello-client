import { Separator } from "@/components/ui/separator"
import { getTranslations } from "next-intl/server";
import { SidebarNav } from "./side-nav";

export default async function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const t = await getTranslations();
    const sidebarNavItems = [
        {
            title: t("options.profile"),
            href: "/profile",
        },
        {
            title: t("options.security"),
            href: "/profile/security",
        },
        {
            title: t("options.permissions"),
            href: "/profile/permissions",
        }
    ]
    return (
        <div className="hidden space-y-6 p-10 pb-16 md:block">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">{t("options.settings")}</h2>
                <p className="text-muted-foreground">
                    {t("longTitles.userSettings")}
                </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
        </div>
    )
}
import Link from "next/link"

import { cn } from "@/lib/utils"
import { getTranslations } from "next-intl/server";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserInfo } from "./user-info";
import { TenantSelector } from "./tenant-selector";
import { TenantApi } from "@/server-api";

export async function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const t = await getTranslations();

  const childText = {

  }
  const tenants = await TenantApi.tenantsList({next: { tags: ['tenants'] }})

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <nav
          className={cn("flex items-center space-x-4 lg:space-x-6", className)}
          {...props}
        >
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('titles.dashboard')}
          </Link>
          <Link
            href="/customers"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {t('titles.customers')}
          </Link>
          <Link
            href="/bills"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {t('titles.bills')}
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <TenantSelector tenants={tenants} text={childText}/>
          <UserInfo/>
        </div>
      </div>
    </div>
  )
}
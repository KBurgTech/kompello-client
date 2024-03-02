import { KompelloAuthInfo, auth, signOut } from "@/auth"
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, UserCog } from "lucide-react"

import { getTranslations } from "next-intl/server"
import Link from "next/link"

export async function UserInfo() {
    const session = await auth() as unknown as KompelloAuthInfo

    const t = await getTranslations();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>{session?.user.firstName?.charAt(0)}{session?.user.lastName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session?.user.firstName} {session?.user.lastName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session?.user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href="/profile" className="flex items- w-full">
                            <UserCog className="mr-2 h-4 w-4" />
                            <span>{t("options.settings")}</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <form
                    action={async () => {
                        "use server"
                        await signOut()
                    }}
                    className="w-full"
                >
                    <DropdownMenuItem>
                        <button className="flex items-center">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>{t("options.signout")}</span>
                        </button>
                    </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
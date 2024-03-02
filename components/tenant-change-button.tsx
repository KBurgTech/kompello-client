'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export function TenantChangeButton({children, tenant_uuid, ...props}: {children?: React.ReactNode, tenant_uuid: string}) {
    const router = useRouter()

    const setCookieAndNavigate = () => {
        const d = new Date();
        d.setTime(d.getTime() + (180 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = "KOMPELLO_TENANT" + "=" + tenant_uuid + ";" + expires + ";path=/";
        router.push("/dashboard")
    }

    return <Button {...props} onClick={() => setCookieAndNavigate()}>{children}</Button>
}
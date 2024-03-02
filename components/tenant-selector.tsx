"use client"

import * as React from "react"
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tenant } from "@/kompello-api";
import { useRouter } from 'next/navigation'
import { Skeleton } from "@/components/ui/skeleton"

export function TenantSelector({ tenants, text }: { tenants: any, text: any }) {
    const [selectedTenant, setSelectedTenant] = React.useState("")
    const router = useRouter()

    function getCookie(cname: string) {
        if(typeof window === "undefined") return ""
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    
    const changeTenant = (tenant_uuid: string) => {
        if(typeof window === "undefined") return
        const d = new Date();
        d.setTime(d.getTime() + (180 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = "KOMPELLO_TENANT" + "=" + tenant_uuid + ";" + expires + ";path=/";
        setSelectedTenant(tenant_uuid)
        router.refresh()
    }

    React.useEffect(() => {
        setSelectedTenant(getCookie("KOMPELLO_TENANT"))
      }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-label="Select a team"
                    className="w-[200px] justify-start"
                >
                    {selectedTenant === "" ? <Skeleton className="w-[100px] h-[20px]" /> : <span>{tenants.filter((tenant: Tenant) => tenant.uuid === selectedTenant)[0].name}</span>}
                    <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
                <DropdownMenuGroup>
                    {tenants.map((tenant: Tenant) => {
                        return (
                            <DropdownMenuItem key={tenant.uuid} onClick={() => changeTenant(tenant.uuid)}>
                                {tenant.uuid == selectedTenant ? <Check className="mr-2 h-4 w-4" /> : <span className="mr-2 h-4 w-4" />}
                                <span>{tenant.name}</span>
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>)
}
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ResponseError, Tenant, TenantsCreateRequest, TenantsPartialUpdateRequest } from "@/kompello-api";
import { TenantEditForm } from "./tenant-edit-form";
import { X } from "lucide-react";
import { TenantApi } from "@/server-api";
import { revalidateTag } from "next/cache";

async function newTenantAction(data: TenantsCreateRequest) {
    'use server'

    try {
        await TenantApi.tenantsCreate(data)
        return {
            success: true,
            message: "Tenant created"
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

async function updateTenantAction(data: TenantsPartialUpdateRequest) {
    'use server'

    try {
        await TenantApi.tenantsPartialUpdate(data, { next: { revalidate: 0 } })
        return {
            success: true,
            message: "Tenant updated"
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

async function action(data: Tenant) {
    'use server'
    let res
    if (data.uuid) {
        const payload = {
            uuid: data.uuid,
            patchedTenant: {
                ...data
            }
        }
        res = await updateTenantAction(payload)
    }
    else{
        const payload = {
            tenant: {
                ...data
            }
        }
        res = await newTenantAction(payload)
    }

    revalidateTag("tenants")
    return res
}


export enum TenantDialogMode {
    New = 0,
    Edit = 1,
}

export default function TenantEditDialog({ trigger, mode, tenant }: { trigger: React.ReactNode, mode: TenantDialogMode, tenant?: Tenant }) {
    if (!tenant) {
        tenant = {
            uuid: "",
            name: "",
            slug: ""
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{mode === TenantDialogMode.New ? "New Tenant" : tenant.name}</DialogTitle>
                    <DialogDescription>
                        <TenantEditForm
                            tenant={tenant}
                            action={action}
                        />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="default">
                            <X className="mr-2 h-4 w-4" /> Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
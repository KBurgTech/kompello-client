import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import TenantEditDialog, { TenantDialogMode } from "@/components/tenant-edit-dialog";
import { TenantApi } from "@/server-api";
import { TenantChangeButton } from "@/components/tenant-change-button";


export default async function Page() {
    const tenants = await TenantApi.tenantsList({next: { tags: ['tenants'] }})

    return (
        <div className="grid gap-4 justify-items-center p-10">
            <Card className="w-9/12">
                <CardHeader>
                    <CardTitle>Tenants</CardTitle>
                    <CardDescription>Please select a tenant or create a new one</CardDescription>
                    <Separator />
                </CardHeader>
                <CardContent>
                    <TenantEditDialog
                        trigger={<Button><Plus className="mr-2 h-4 w-4" />New Tenant</Button>}
                        mode={TenantDialogMode.New} />
                    <div className="flex flex-wrap justify-center items-stretch gap-4 mt-4 mb-4">
                        {tenants.map((tenant) => {
                            return (
                                <Card className="w-[350px] grow" key={tenant.uuid}>
                                    <CardHeader>
                                        <CardTitle>{tenant.name}</CardTitle>
                                        <CardDescription>{tenant.slug}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <TenantEditDialog
                                            trigger={<Button variant="secondary"><Edit className="mr-2 h-4 w-4" />Edit</Button>}
                                            mode={TenantDialogMode.Edit}
                                            tenant={tenant} />
                                        <TenantChangeButton tenant_uuid={tenant.uuid}>Open</TenantChangeButton>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
        </div>
    )
}
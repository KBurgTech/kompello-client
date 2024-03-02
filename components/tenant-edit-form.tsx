"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Save } from "lucide-react"

const formSchema = z.object({
    uuid: z.string(),
    name: z.string(),
    slug: z.string().toLowerCase()
})

export function TenantEditForm({ tenant, text, action, ...props }: any) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            uuid: tenant.uuid,
            name: tenant.name,
            slug: tenant.slug,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await action(values)
        if (res.success) {
            toast.success(res.message)
            return
        }

        toast.error(res.message)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="uuid"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>UUID</FormLabel>
                            <FormControl>
                                <Input disabled {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button><Save className="mr-2 h-4 w-4" />Save</Button>
            </form>
        </Form>
    )
}
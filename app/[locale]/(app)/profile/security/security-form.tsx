"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"

const formSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters")
})

export function ProfileSecurityForm({ text, updatePasswordAction, ...props }: any) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await updatePasswordAction(values)
        if (res.success) {
            toast.success(res.message)
            return
        }

        toast.error(res.message)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-8">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{text.password}</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{text.update}</Button>
            </form>
        </Form>
    )
}
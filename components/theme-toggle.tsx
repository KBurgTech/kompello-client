'use client'

import { Moon, Sun } from "lucide-react";
import { Toggle } from "./ui/toggle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (<Toggle aria-label="Toggle bold" onClick={() => theme === "light" ? setTheme('dark') : setTheme('light')}>
        {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Toggle>)
}
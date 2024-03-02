import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
    title: "Komello Client",
    description: "Web Client to interact with a Kompello Server",
};

export default function RootLayout({
    children,
    params: { locale }
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    return (
        <html lang={locale} suppressHydrationWarning>
            <body>
                <Providers
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </Providers>
                <Toaster position="top-right" />
            </body>
        </html>
    );
}

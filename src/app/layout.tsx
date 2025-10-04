import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";

const roboto = Roboto_Flex({
    subsets: ["latin"],
    variable: "--font-roboto",
    display: "swap",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "MontGovia",
    description: "Somos Montgovia, un dúo que combina distintas habilidades para crear soluciones y proyectos útiles para empresas e individuos.",
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        title: "MontGovia",
        description: "Somos Montgovia, un dúo que combina distintas habilidades para crear soluciones y proyectos útiles para empresas e individuos.",
        url: "https://montgovia.online",
        siteName: "MontGovia",
        images: [
            {
                url: "https://montgovia.com/og-image.png",
                width: 1200,
                height: 630,
                alt: "MontGovia",
            },
        ],
        locale: "es_ES",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${roboto.variable} antialiased bg-primary`}
            >
                {children}
            </body>
        </html>
    );
}

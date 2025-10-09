import Image from "next/image";
import { motion } from "motion/react";
import { useIsDesktop } from "@/hooks/DeviceDetector";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

const MenuItems = [
    { id: "home", href: "/", label: "Inicio" },
    { id: "projects", href: "/proyects", label: "Proyectos" },
    { id: "clients", href: "/clients", label: "Clientes" },
    { id: "about", href: "/about", label: "Nosotros" },
    { id: "contact", href: "/contact", label: "Contacto" },
];

function MobileFrostedGlassNavbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="items-center w-full bg-frosted-glass rounded-md px-4 py-3">
            {/* NavContet Container */}
            <div className="flex w-full h-full justify-between">
                {/* Left Side - Logo */}
                <div className="flex items-center space-x-3 bg-frosted-glass p-3 rounded-lg">
                    <Image
                        src="/montgovia-complete.svg"
                        alt="MontGovia Logo"
                        width={70}
                        height={40}
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Right Side - Navigation Links */}
                <div className="flex justify-between space-x-8">
                    <motion.button className="bg-frosted-glass p-3 rounded-lg cursor-pointer"
                        whileTap={{ scale: 0.90 }}
                        aria-label="Open Menu"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Menu />
                    </motion.button>
                </div>
            </div>

            {/* Bottom - Dropdown Menu */}
            {isOpen && (
                <ul className="mt-4 flex flex-col space-y-4 bg-frosted-glass p-4 rounded">
                    {MenuItems.map((item) => (
                        <li key={item.id} className="cursor-pointer">
                            <Link href={item.href} className="relative py-2 group transition-colors hover:text-zinc-300">
                                <span className="capitalize">{item.label}</span>
                                <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}

function DesktopFrostedGlassNavbar() {
    return (
        <nav className="flex justify-between items-center w-full bg-frosted-glass rounded-md px-6 py-3">
            {/* Left Side - Logo */}
            <div className="flex items-center space-x-3 bg-frosted-glass p-3 rounded-lg">
                <Image
                    src="/montgovia-complete.svg"
                    alt="MontGovia Logo"
                    width={90}
                    height={40}
                    className="object-contain"
                    priority
                />
            </div>

            {/* Right Side - Navigation Links */}
            <div className="flex justify-between space-x-8 bg-frosted-glass p-5 rounded-lg">
                <ul className="flex space-x-8 justify-end">
                    {MenuItems.map((item) => (
                        <li key={item.id} className="cursor-pointer">
                            <Link href={item.href} className="relative py-2 group transition-colors hover:text-zinc-300">
                                <span className="capitalize">{item.label}</span>
                                <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default function FrostedGlassNavbar() {
    const isDesktop = useIsDesktop(false);
    return isDesktop ? <DesktopFrostedGlassNavbar /> : <MobileFrostedGlassNavbar />;
}
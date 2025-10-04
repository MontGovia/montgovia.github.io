import Image from "next/image";
import { motion } from "motion/react";
import { useIsDesktop } from "@/hooks/DeviceDetector";

function MobileFrostedGlassNavbar() {
    return (
        <nav className="flex justify-between items-center w-full bg-frosted-glass rounded-md px-1 py-2">
            {/* Left Side - Logo */}
            <div className="flex items-center space-x-3">
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
            <div className="flex justify-between space-x-8">
                
            </div>
        </nav>
    );
}

function DesktopFrostedGlassNavbar() {
    return (
        <nav className="flex justify-between items-center w-full bg-frosted-glass rounded-md px-2 py-5">
            {/* Left Side - Logo */}
            <div className="flex items-center space-x-3">
                <Image
                    src="/montgovia-complete.svg"
                    alt="MontGovia Logo"
                    width={120}
                    height={40}
                    className="object-contain"
                    priority
                />
            </div>

            {/* Right Side - Navigation Links */}
            <div className="flex justify-between space-x-8">
                
            </div>
        </nav>
    );
}

export default function FrostedGlassNavbar() {
    const isDesktop = useIsDesktop(false);
    return isDesktop ? <DesktopFrostedGlassNavbar /> : <MobileFrostedGlassNavbar />;
}
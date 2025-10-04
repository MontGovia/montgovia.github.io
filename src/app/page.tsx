"use client"

import FrostedGlassNavbar from "@/components/navigation/FrostedGlassNavbar";
import AnimatedGrid from "@/components/effects/AnimatedGrid";
import GlowingBlob from "@/components/effects/GlowingBlob";
import { useIsDesktop } from "@/hooks/DeviceDetector";

export default function Home() {
    const isDesktop = useIsDesktop(false);
    return (
        <div className="w-full min-h-screen">

            {/* Content */}
            <main className={`flex flex-col items-center text-white pt-5 ${isDesktop ? "px-20" : "px-5"}`}>
                <FrostedGlassNavbar />
            </main>

            {/* Background Effects */}
            {isDesktop && <GlowingBlob />}
            <AnimatedGrid />
        </div>
    );
}

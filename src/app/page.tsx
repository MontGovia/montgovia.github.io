"use client"

import AnimatedGrid from "@/components/ui/AnimatedGrid";
import GlowingBlob from "@/components/ui/GlowingBlob";
import { useIsDesktop } from "@/hooks/DeviceDetector";

export default function Home() {
    const isDesktop = useIsDesktop(false);
    return (
        <div className="w-full min-h-screen">

            {/* Content */}
            <main className="flex flex-col items-center text-white">
                
            </main>

            {/* Background Effects */}
            {isDesktop && <GlowingBlob />}
            <AnimatedGrid />
        </div>
    );
}

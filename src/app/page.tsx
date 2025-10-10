"use client"

import FrostedGlassNavbar from "@/components/common/FrostedGlassNavbar";
import AnimatedGrid from "@/components/effects/AnimatedGrid";
import GlowingBlob from "@/components/effects/GlowingBlob";
import HomeSineWaveBanner from "@/components/pages/home/HomeSineWaveBanner";
import { useIsDesktop } from "@/hooks/DeviceDetector";
import HomeContent from "@/components/pages/home/HomeContent";

export default function Home() {
    const isDesktop = useIsDesktop(false);
    return (
        <div className={`w-full min-h-screen text-white ${isDesktop ? "pb-5" : "pb-6"}`}>

            {/* Content */}
            <FrostedGlassNavbar />
            <main className={`flex flex-col items-center ${isDesktop ? "px-15 pt-24" : "px-5 pt-21"}`}>
                <HomeSineWaveBanner />
                <HomeContent />
            </main>

            {/* Background Effects */}
            {isDesktop && <GlowingBlob />}
            <AnimatedGrid />
        </div>
    );
}

"use client";
import { useEffect, useRef } from "react";

export default function GlowingBlob() {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const blob = ref.current;
        if (!blob) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let x = mouseX;
        let y = mouseY;

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        const onTouch = (e: TouchEvent) => {
            if (e.touches && e.touches[0]) {
                mouseX = e.touches[0].clientX;
                mouseY = e.touches[0].clientY;
            }
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("touchmove", onTouch, { passive: true });

        let raf = 0;
        const loop = () => {
            x += (mouseX - x) * 0.14;
            y += (mouseY - y) * 0.14;
            blob.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("touchmove", onTouch);
        };
    }, []);

    return (
        <div
            ref={ref}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 -z-10 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl filter"
            style={{
                background:
                    "radial-gradient(circle,rgba(255, 255, 255, 1) 0%, rgba(71, 71, 71, 1) 50%, rgba(46, 46, 46, 0.03) 99%)",
                willChange: "transform",
            }}
        />
    );
}
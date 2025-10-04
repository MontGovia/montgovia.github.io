"use client"
import { useEffect, useRef } from "react";

export default function AnimatedGrid() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = Math.max(1, window.devicePixelRatio || 1);
        let width = 0;
        let height = 0;
        let raf = 0;
        const start = performance.now();

        const config = {
            spacing: 68,
            amplitude: 12,
            speed: 0.0018,
            color: "rgba(255,255,255,0.045)",
            strokeWidth: 1,
        };

        function resize() {
            const w = window.innerWidth;
            const h = window.innerHeight;
            if (w === width && h === height) return;
            width = w;
            height = h;

            if (canvas && ctx) {
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
                canvas.width = Math.floor(w * dpr);
                canvas.height = Math.floor(h * dpr);

                ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels
            }
        }

        function draw(now: number) {
            const time = now - start;

            if (ctx) {
                ctx.clearRect(0, 0, width, height); // clear whole canvas
                ctx.lineWidth = config.strokeWidth;
                ctx.strokeStyle = config.color;
                ctx.lineCap = "round";

                // X lines
                for (let y = 0; y < height + config.spacing; y += config.spacing) {
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    for (let x = 0; x < width + config.spacing; x += config.spacing) {
                        const offsetY = Math.sin((x * 0.5 + time * config.speed)) * config.amplitude;
                        ctx.lineTo(x, y + offsetY);
                    }
                    ctx.stroke();
                }

                // Y lines
                for (let x = 0; x < width + config.spacing; x += config.spacing) {
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    for (let y = 0; y < height + config.spacing; y += config.spacing) {
                        const offsetX = Math.sin((y * 0.5 + time * config.speed)) * config.amplitude;
                        ctx.lineTo(x + offsetX, y);
                    }
                    ctx.stroke();
                }
            }

            raf = requestAnimationFrame(draw);
        }

        // Resize Listener
        const ro = typeof ResizeObserver !== "undefined"
            ? new ResizeObserver(resize)
            : null;
        ro?.observe(document.body);

        // Initial call
        resize();
        raf = requestAnimationFrame(draw);
        
        // Cleanup
        return () => {
            cancelAnimationFrame(raf);
            ro?.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 -z-10 h-full w-full"
            style={{ willChange: "transform" }}
        />
    );
}
"use client"
import { Signature } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function HomeSineWaveBanner() {
    const router = useRouter();
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
            sampleStep: 2,
            waves: [
                { amplitude: 18, speed: 0.0009, period: 0.008, color: "rgba(255,255,255,0.14)", lineWidth: 1.6, yOffset: 0.44 },
                { amplitude: 10, speed: 0.0016, period: 0.012, color: "rgba(255,255,255,0.07)", lineWidth: 1.0, yOffset: 0.62 },
            ],
        };

        function resize() {
            if (!canvas) return;
            const parent = canvas.parentElement;
            if (!parent) return;
            const w = parent.clientWidth;
            const h = parent.clientHeight;
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

                for (const wave of config.waves) {
                    const centerY = height * wave.yOffset;

                    // build the top curve as a Path2D
                    const curve = new Path2D();
                    let first = true;
                    for (let x = 0; x <= width; x += config.sampleStep) {
                        const phase = (x * wave.period) + (time * wave.speed);
                        const y = centerY + Math.sin(phase) * wave.amplitude;
                        if (first) {
                            curve.moveTo(x, y);
                            first = false;
                        } else {
                            curve.lineTo(x, y);
                        }
                    }

                    // stroke the curve
                    ctx.lineWidth = wave.lineWidth;
                    ctx.strokeStyle = wave.color;
                    ctx.stroke(curve);

                    // create closed path to fill under the curve to the bottom of the canvas
                    const fillPath = new Path2D(curve);
                    fillPath.lineTo(width, height);
                    fillPath.lineTo(0, height);
                    fillPath.closePath();

                    // gradient fill that fades to transparent toward the bottom
                    const grad = ctx.createLinearGradient(0, centerY - wave.amplitude, 0, height);
                    grad.addColorStop(0, wave.color);
                    grad.addColorStop(1, "rgba(255,255,255,0)");
                    ctx.fillStyle = grad;
                    ctx.fill(fillPath);
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
        <div className="relative w-full h-[60vh] max-h-96 overflow-hidden bg-frosted-glass mt-5 rounded-lg">
            <div className="relative flex flex-col items-center justify-center text-center h-[60vh] max-h-96 rounded-lg p-5">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Bienvenido, somos MontGovia</h1>
                <p className="text-lg md:text-2xl max-w-2xl">El dúo dinamico que trae tu idea tecnológica, a la realidad.</p>
                <motion.button
                    className="mt-6 cursor-pointer inline-flex items-center justify-center px-3 py-2 bg-opaque-glass rounded-lg min-w-[10rem] w-auto text-sm font-medium overflow-hidden"
                    aria-label="Contactanos"
                    whileHover={{
                        backgroundColor: "rgba(255, 255, 255, 0.158)",
                        transition: { duration: 0.2, ease: "easeIn" },
                    }}
                    onClick={() => {router.push('/contact')}}
                >
                    <Signature className="mr-2 h-4 w-4" />
                    <span className="pointer-events-none select-none">Contactanos</span>
                </motion.button>
            </div>
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 -z-10 w-full h-full"
                style={{ willChange: "transform" }}
            />
        </div>
    );
}
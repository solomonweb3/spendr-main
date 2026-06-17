import { useEffect, useRef } from "react";

// Performant fluid gradient — no per-pixel grain loop
// Uses low-res canvas + CSS filter for blur/grain
export default function FluidGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let t = 0;
    let lastTime = 0;
    const FPS = 30; // cap at 30fps — smooth enough, half the work
    const INTERVAL = 1000 / FPS;

    // Low resolution — CSS scales it up, naturally blurry = no blur filter needed
    const RES = 300;
    canvas.width = RES;
    canvas.height = RES;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - lastTime < INTERVAL) return;
      lastTime = now;
      t += 0.006;

      ctx.clearRect(0, 0, RES, RES);

      // Base warm cream
      ctx.fillStyle = "#f0e0b0";
      ctx.fillRect(0, 0, RES, RES);

      // Blue blob 1 — upper area
      const g1 = ctx.createRadialGradient(
        RES * (0.52 + Math.sin(t * 0.7) * 0.14),
        RES * (0.28 + Math.cos(t * 0.5) * 0.12),
        0,
        RES * (0.52 + Math.sin(t * 0.7) * 0.14),
        RES * (0.28 + Math.cos(t * 0.5) * 0.12),
        RES * 0.5
      );
      g1.addColorStop(0, "rgba(75, 155, 225, 1)");
      g1.addColorStop(0.5, "rgba(90, 165, 230, 0.5)");
      g1.addColorStop(1, "rgba(90, 165, 230, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, RES, RES);

      // Blue blob 2 — lower area
      const g2 = ctx.createRadialGradient(
        RES * (0.32 + Math.cos(t * 0.6) * 0.16),
        RES * (0.72 + Math.sin(t * 0.8) * 0.1),
        0,
        RES * (0.32 + Math.cos(t * 0.6) * 0.16),
        RES * (0.72 + Math.sin(t * 0.8) * 0.1),
        RES * 0.45
      );
      g2.addColorStop(0, "rgba(55, 135, 215, 0.95)");
      g2.addColorStop(0.5, "rgba(70, 148, 220, 0.45)");
      g2.addColorStop(1, "rgba(70, 148, 220, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, RES, RES);

      // Amber blob — top-right
      const g3 = ctx.createRadialGradient(
        RES * (0.88 + Math.sin(t * 0.4) * 0.08),
        RES * (0.18 + Math.cos(t * 0.55) * 0.1),
        0,
        RES * (0.88 + Math.sin(t * 0.4) * 0.08),
        RES * (0.18 + Math.cos(t * 0.55) * 0.1),
        RES * 0.48
      );
      g3.addColorStop(0, "rgba(215, 155, 55, 0.9)");
      g3.addColorStop(0.5, "rgba(220, 165, 65, 0.4)");
      g3.addColorStop(1, "rgba(220, 165, 65, 0)");
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, RES, RES);

      // Amber blob — bottom-right
      const g4 = ctx.createRadialGradient(
        RES * (0.82 + Math.cos(t * 0.5) * 0.1),
        RES * (0.82 + Math.sin(t * 0.45) * 0.1),
        0,
        RES * (0.82 + Math.cos(t * 0.5) * 0.1),
        RES * (0.82 + Math.sin(t * 0.45) * 0.1),
        RES * 0.42
      );
      g4.addColorStop(0, "rgba(210, 148, 42, 0.85)");
      g4.addColorStop(0.5, "rgba(215, 158, 52, 0.38)");
      g4.addColorStop(1, "rgba(215, 158, 52, 0)");
      ctx.fillStyle = g4;
      ctx.fillRect(0, 0, RES, RES);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      // CSS blur gives the smooth blurry look without per-pixel JS
      // CSS noise filter adds grain via SVG without touching pixel data
      style={{
        display: "block",
        filter: "blur(0px)",
        imageRendering: "auto",
      }}
    />
  );
}

import { useEffect, useRef } from "react";

// Ambient "compile beam": a faint dot field where a diagonal beam (the Nex
// slash angle) sweeps across and lights the dots it passes. Canvas, 60fps,
// transform/alpha only. Respects reduced motion (renders one static frame).
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const canvas = cv;
    const g: CanvasRenderingContext2D = ctx;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accent = [124, 92, 255];
    let w = 0;
    let h = 0;
    let dpr = 1;
    const spacing = 36;
    const lean = 0.42; // matches the slash's forward lean

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function baseAlpha() {
      return document.documentElement.dataset.theme === "dark" ? 0.16 : 0.10;
    }

    function frame(beam: number) {
      g.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      const influence = 130;
      const ba = baseAlpha();
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          // x of the beam line at this y (beam leans like the slash)
          const lineX = beam - (y - h / 2) * lean;
          const d = Math.abs(x - lineX);
          const lit = Math.max(0, 1 - d / influence);
          const a = ba * 0.5 + lit * 0.9;
          const r = 1 + lit * 1.6;
          if (lit > 0.04) {
            g.fillStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${a})`;
          } else {
            g.fillStyle =
              document.documentElement.dataset.theme === "dark"
                ? `rgba(160,160,176,${a})`
                : `rgba(90,96,120,${a})`;
          }
          g.beginPath();
          g.arc(x, y, r, 0, Math.PI * 2);
          g.fill();
        }
      }
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      frame(w * 0.5);
      window.removeEventListener("resize", resize);
      return;
    }

    let raf = 0;
    let start = performance.now();
    const period = 7000;
    const loop = (now: number) => {
      const phase = ((now - start) % period) / period;
      const beam = -0.25 * w + phase * 1.5 * w;
      frame(beam);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden />;
}

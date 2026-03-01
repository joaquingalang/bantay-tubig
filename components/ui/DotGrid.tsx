"use client";

import { useEffect, useRef } from "react";

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  proximity?: number;
  baseOpacity?: number;
}

const BASE = { r: 255, g: 255, b: 255 };
const ACTIVE = { r: 96, g: 165, b: 250 }; // blue-400 #60a5fa

// Spring physics constants
const STIFFNESS = 0.1;  // pull-back strength toward origin
const DAMPING = 0.78;   // velocity decay — lower = more bouncy

export function DotGrid({
  dotSize = 1.5,
  gap = 28,
  proximity = 100,
  baseOpacity = 0.1,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    type Dot = {
      ox: number; oy: number; // fixed origin position
      x: number; y: number;   // current (displaced) position
      vx: number; vy: number; // velocity
    };

    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;

    function rebuild() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      dots = [];
      for (let oy = gap / 2; oy < h; oy += gap) {
        for (let ox = gap / 2; ox < w; ox += gap) {
          dots.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 });
        }
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const mx = mouse.x;
      const my = mouse.y;

      for (const d of dots) {
        // Measure proximity from the dot's *origin* to cursor
        const odx = d.ox - mx;
        const ody = d.oy - my;
        const odist = Math.sqrt(odx * odx + ody * ody);

        // Quadratic falloff: 1 at center, 0 at edge
        const raw = Math.max(0, 1 - odist / proximity);
        const t = raw * raw;

        // Push force: away from cursor, scaled by proximity
        if (odist < proximity && odist > 0) {
          const pushMag = raw * 0.5;
          d.vx += (odx / odist) * pushMag;
          d.vy += (ody / odist) * pushMag;
        }

        // Spring: pull back toward origin
        d.vx += (d.ox - d.x) * STIFFNESS;
        d.vy += (d.oy - d.y) * STIFFNESS;

        // Damping
        d.vx *= DAMPING;
        d.vy *= DAMPING;

        // Integrate
        d.x += d.vx;
        d.y += d.vy;

        // Color blend: white → blue-400
        const r = Math.round(BASE.r + (ACTIVE.r - BASE.r) * t);
        const g = Math.round(BASE.g + (ACTIVE.g - BASE.g) * t);
        const b = Math.round(BASE.b + (ACTIVE.b - BASE.b) * t);
        const a = baseOpacity + (0.85 - baseOpacity) * t;

        // Size: grows up to 3× near cursor center
        const size = dotSize * (1 + 2 * t);

        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.fill();
      }

      ctx.restore();
      raf = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    const parent = canvas.parentElement;

    // Scope the canvas behind siblings without escaping the container.
    // "isolation: isolate" creates a stacking context on the parent so that
    // the canvas's z-index: -1 doesn't slip behind the page background.
    if (parent) parent.style.isolation = "isolate";

    const ro = new ResizeObserver(rebuild);
    if (parent) ro.observe(parent);

    rebuild();
    raf = requestAnimationFrame(draw);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    parent?.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      parent?.removeEventListener("mouseleave", onMouseLeave);
      if (parent) parent.style.isolation = "";
    };
  }, [dotSize, gap, proximity, baseOpacity]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none -z-10" />;
}

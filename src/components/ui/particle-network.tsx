"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const mouse = { x: -1000, y: -1000, radius: 300 };

    // Colors matching the futuristic cyan/fuchsia theme
    const colors = ["#22d3ee", "#e879f9", "#34d399"];

    // Determine the actual background color to blend correctly
    const isDark = theme !== "light"; // default to dark if not strictly light

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Adjust particle count based on screen size (roughly 1 particle per 6000 pixels)
      const particleCount = Math.floor((width * height) / 5000);
      particles = [];

      for (let i = 0; i < Math.min(particleCount, 250); i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5, // Slow movement
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const drawLine = (
      p1: Particle | typeof mouse,
      p2: Particle,
      distance: number,
      maxDistance: number,
    ) => {
      const opacity = 1 - distance / maxDistance;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);

      // Determine line color based on whether it's connecting to the mouse
      if (p1 === mouse) {
        ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.5})`; // Cyan for mouse links
      } else {
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`; // Subtle white/grey for node links
      }

      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;

        // Add glow to nodes
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for lines

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 150;
          if (distance < maxDist) {
            drawLine(p, p2, distance, maxDist);
          }
        }

        // Connect to mouse
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius) {
          drawLine(mouse, p, distMouse, mouse.radius);
          // Interactive: pull particles towards mouse more strongly
          if (distMouse < mouse.radius * 0.8) {
            p.x += dxMouse * 0.03;
            p.y += dyMouse * 0.03;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 z-0 bg-black pointer-events-none overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute -inset-[100%] z-0 opacity-25"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, #172554 0deg, #4c1d95 90deg, #0f172a 180deg, #831843 270deg, #172554 360deg)",
          animation: "spin 30s linear infinite",
        }}
      />
      {/* Subtle radial overlay to focus the center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)] z-0" />

      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-80 z-10 relative"
      />
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

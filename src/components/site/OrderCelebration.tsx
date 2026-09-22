import { useEffect, useRef, useState } from "react";
import { Check, Sparkles, Truck, Package, Heart, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfettiParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  oscillationSpeed: number;
  wobble: number;
}

const CONFETTI_COLORS = [
  "#F59E0B", // Amber Gold
  "#10B981", // Emerald Cardamom
  "#EF4444", // Ruby Red
  "#FF9933", // Neon Gold
  "#8B5CF6", // Velvet Purple
  "#EC4899", // Pink
  "#FCD34D", // Saffron
  "#6EE7B7", // Mint
];

export function ConfettiCanvas({ trigger }: { trigger: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Spawn 120 vibrant particles
    const particleCount = 120;
    const particles: ConfettiParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Launch from center-top with spread
      const originX = width / 2 + (Math.random() - 0.5) * 200;
      const originY = height * 0.25;

      particles.push({
        x: originX,
        y: originY,
        size: Math.random() * 8 + 6,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]!,
        speedX: (Math.random() - 0.5) * 16,
        speedY: Math.random() * -12 - 4, // Initial upward burst
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        oscillationSpeed: Math.random() * 0.1 + 0.05,
        wobble: Math.random() * Math.PI * 2,
      });
    }

    let animationFrameId: number;
    let startTime = performance.now();
    const duration = 4200; // Run for 4.2 seconds

    const render = (time: number) => {
      const elapsed = time - startTime;
      if (elapsed > duration) {
        ctx.clearRect(0, 0, width, height);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;

        // Physics
        p.speedY += 0.35; // Gravity
        p.speedX *= 0.98; // Air drag
        p.x += p.speedX + Math.sin(p.wobble) * 1.5;
        p.y += p.speedY;
        p.wobble += p.oscillationSpeed;
        p.rotation += p.rotationSpeed;

        // Fade out gracefully in the last 1.5 seconds
        if (elapsed > duration - 1500) {
          p.opacity = Math.max(0, (duration - elapsed) / 1500);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        // Draw festive rectangle confetti ribbons
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      aria-hidden="true"
    />
  );
}

export function AnimatedOrderSuccessBadge({ onReplay }: { onReplay?: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative inline-flex flex-col items-center">
      {/* Outer pulsating glow rings */}
      <div className="relative flex items-center justify-center">
        <div className="absolute h-28 w-28 rounded-full bg-emerald-500/20 animate-ping duration-1000" />
        <div className="absolute h-24 w-24 rounded-full bg-primary/20 animate-pulse duration-700" />

        {/* Main Success Circle */}
        <div
          className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl transition-all duration-700 ${
            mounted ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-45 opacity-0"
          }`}
        >
          <Check className="h-10 w-10 stroke-[3.5] animate-in zoom-in-50 duration-500" />
        </div>

        {/* Floating Festive Sparkle Stars */}
        <div className="absolute -top-1 -right-1 text-amber-400 animate-bounce duration-1000">
          <Sparkles className="h-6 w-6 fill-amber-400" />
        </div>
        <div className="absolute -bottom-1 -left-1 text-amber-400 animate-pulse duration-700">
          <Sparkles className="h-5 w-5 fill-amber-400" />
        </div>
      </div>
    </div>
  );
}

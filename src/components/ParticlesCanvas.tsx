import React, { useRef, useEffect } from "react";

interface ParticlesCanvasProps {
  color: string;
  speed: number;
  speedRange?: [number, number];
  sizeRange?: [number, number];
  particleCount?: number;
  opacityRange?: [number, number];
}

export const ParticlesCanvas: React.FC<ParticlesCanvasProps> = ({
  color,
  speed,
  speedRange = [10, 20],
  sizeRange = [0.5, 1],
  particleCount = 10,
  opacityRange = [0, 0.3],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set up particles
    const particles: Particle[] = [];

    class Particle {
      x: number = 0;
      y: number = 0;
      speed: number = 0;
      size: number = 0;
      alpha: number = 0;
      lifetime: number = 0;
      maxLifetime: number = 2;

      constructor() {
        this.reset();
      }

      reset() {
        const canvas = canvasRef.current!;
        this.x = canvas.width / 2 + (Math.random() - 0.5) * canvas.width;
        this.y = canvas.height / 2 + (Math.random() - 0.5) * canvas.height;
        this.speed =
          speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]);
        this.size =
          sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
        this.lifetime = 0;
        this.maxLifetime = 2 + Math.random();
      }

      update() {
        const canvas = canvasRef.current!;
        this.lifetime += 0.016;
        const normalizedLife = this.lifetime / this.maxLifetime;
        if (normalizedLife < 0.2) {
          this.alpha =
            (normalizedLife / 0.2) * (opacityRange[1] - opacityRange[0]) +
            opacityRange[0];
        } else if (normalizedLife > 0.8) {
          this.alpha =
            (1 - (normalizedLife - 0.8) / 0.2) *
              (opacityRange[1] - opacityRange[0]) +
            opacityRange[0];
        } else {
          this.alpha = opacityRange[1];
        }
        this.y -= this.speed * 0.016;
        this.x += (Math.random() - 0.5) * 0.5;
        if (this.lifetime >= this.maxLifetime) {
          this.reset();
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.floor(this.alpha * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [color, speed, speedRange, sizeRange, particleCount, opacityRange]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: "plus-lighter" }}
    />
  );
};

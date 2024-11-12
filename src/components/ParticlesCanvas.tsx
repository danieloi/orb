import React, { useRef, useEffect } from 'react';

interface ParticlesCanvasProps {
  color: string;
  speed: number;
}

export const ParticlesCanvas: React.FC<ParticlesCanvasProps> = ({
  color,
  speed
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up particles
    const particles: Particle[] = [];
    const particleCount = 30;

    class Particle {
      x: number = 0;
      y: number = 0;
      speed: number = 0;
      size: number = 0;
      alpha: number = 0;
      
      constructor() {
        this.reset();
      }

      reset() {
        const canvas = canvasRef.current!;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = (Math.random() + 0.5) * speed / 20;
        this.size = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.7 + 0.3;
      }

      update() {
        const canvas = canvasRef.current!;
        this.y -= this.speed;
        this.alpha -= 0.003;

        if (this.y < 0 || this.alpha <= 0) {
          this.reset();
          this.y = canvas.height;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.floor(this.alpha * 255).toString(16).padStart(2, '0')}`;
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
      
      particles.forEach(particle => {
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
  }, [color, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: 'plus-lighter' }}
    />
  );
};
import React, { useEffect, useRef } from 'react';

interface WavyBlobProps {
  color: string;
  speed: number;
  direction: 'clockwise' | 'counterclockwise';
}

export const WavyBlob: React.FC<WavyBlobProps> = ({
  color,
  speed,
  direction
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // Animation parameters
    const points = 12;
    const radius = 40;
    const centerX = 50;
    const centerY = 50;

    const animate = () => {
      const time = Date.now() / (1000 / (speed / 25));
      const angleStep = (Math.PI * 2) / points;
      
      // Generate wavy blob path
      let d = 'M ';
      
      for (let i = 0; i <= points; i++) {
        const angle = i * angleStep;
        const wave = Math.sin(time + i * 0.7) * 7;
        const x = centerX + (radius + wave) * Math.cos(angle);
        const y = centerY + (radius + wave) * Math.sin(angle);
        
        if (i === 0) {
          d += `${x} ${y}`;
        } else {
          const prevAngle = (i - 1) * angleStep;
          const cpRadius = (radius + wave) * 0.5;
          
          const cp1x = centerX + cpRadius * Math.cos(prevAngle + angleStep / 2);
          const cp1y = centerY + cpRadius * Math.sin(prevAngle + angleStep / 2);
          
          d += ` Q ${cp1x} ${cp1y} ${x} ${y}`;
        }
      }

      path.setAttribute('d', d);
      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [speed]);

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      style={{
        animation: `rotate${direction === 'clockwise' ? '' : 'Reverse'} ${150 / speed}s linear infinite`,
        opacity: 0.4,
      }}
    >
      <path
        ref={pathRef}
        fill={color}
        style={{
          filter: 'blur(3px)',
          mixBlendMode: 'plus-lighter',
        }}
      />
    </svg>
  );
};
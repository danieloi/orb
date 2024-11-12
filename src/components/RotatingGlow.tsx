import React from 'react';

type RotationDirection = 'clockwise' | 'counterclockwise';

interface RotatingGlowProps {
  color: string;
  speed: number;
  direction?: RotationDirection;
}

export const RotatingGlow: React.FC<RotatingGlowProps> = ({
  color,
  speed,
  direction = 'clockwise'
}) => {
  const rotationMultiplier = direction === 'clockwise' ? 1 : -1;

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 flex justify-center items-center"
        style={{
          animation: `rotate ${360 / speed}s linear infinite`,
          '--rotation-end': `${360 * rotationMultiplier}deg`,
        } as React.CSSProperties}
      >
        <div
          className="w-full h-full"
          style={{
            background: color,
            WebkitClipPath: 'circle(50%)',
            clipPath: 'circle(50%)',
            filter: 'blur(16%)',
            position: 'relative',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '131%',
            height: '131%',
            top: '31%',
            background: color,
            WebkitClipPath: 'circle(50%)',
            clipPath: 'circle(50%)',
            filter: 'blur(16%)',
            mixBlendMode: 'destination-out',
          }}
        />
      </div>
    </div>
  );
};
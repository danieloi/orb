import React, { useRef } from 'react';
import { OrbConfig, defaultOrbConfig } from '../types/OrbConfig';
import { ParticlesCanvas } from './ParticlesCanvas';
import { WavyBlob } from './WavyBlob';
import { RotatingGlow } from './RotatingGlow';

interface OrbProps {
  config?: Partial<OrbConfig>;
  className?: string;
  style?: React.CSSProperties;
}

export const Orb: React.FC<OrbProps> = ({ 
  config: userConfig, 
  className,
  style 
}) => {
  const config = { ...defaultOrbConfig, ...userConfig };
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className={`relative aspect-square ${className || ''}`}
      style={{
        ...style,
        isolation: 'isolate',
      }}
    >
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {config.showBackground && (
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${config.backgroundColors.join(', ')})`,
            }}
          />
        )}
        
        {config.showGlowEffects && (
          <RotatingGlow 
            color={config.glowColor}
            speed={config.speed}
          />
        )}

        {/* {config.showWavyBlobs && (
          <>
            <WavyBlob 
              color={config.glowColor}
              speed={config.speed}
              direction="clockwise"
            />
            <WavyBlob 
              color={config.glowColor}
              speed={config.speed * 0.75}
              direction="counterclockwise"
            />
          </>
        )}

        {config.showParticles && (
          <ParticlesCanvas
            color={config.particleColor}
            speed={config.speed}
          />
        )} */}
      </div>

      {config.showShadow && (
        <div 
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(circle, ${config.backgroundColors[0]}40 0%, transparent 70%)`,
            filter: 'blur(20px)',
            transform: 'translateY(10%)',
          }}
        />
      )}
    </div>
  );
};
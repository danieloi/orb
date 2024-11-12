import React, { useRef, useState, useLayoutEffect } from "react";
import { OrbConfig, defaultOrbConfig } from "../types/OrbConfig";
import { ParticlesCanvas } from "./ParticlesCanvas";
import { WavyBlob } from "./WavyBlob";
import { RotatingGlow } from "./RotatingGlow";

interface OrbProps {
  config?: Partial<OrbConfig>;
  className?: string;
  style?: React.CSSProperties;
}

const MaskedWavyBlob: React.FC<{
  color: string;
  speed: number;
  size?: number;
  offsetY?: number;
  opacity?: number;
  wavyOrbSpeedMultiplier?: number;
  direction?: "clockwise" | "counterclockwise";
}> = ({
  color,
  speed,
  size = 1.875,
  offsetY = 0.31,
  opacity = 1,
  wavyOrbSpeedMultiplier = 1.5,
  direction = "clockwise",
}) => {
  return (
    <div
      className="absolute inset-0"
      style={{
        filter: "blur(1px)",
        mixBlendMode: "plus-lighter",
        opacity,
      }}
    >
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <RotatingGlow
            color={color}
            rotationSpeed={speed}
            direction={direction}
          />
          <div
            className="absolute inset-0"
            style={{
              maskImage: "url(#wavyBlobMask)",
              transform: `scale(${size}) translateY(${offsetY * 100}%)`,
            }}
          >
            <WavyBlob
              color="white"
              loopDuration={(60 / speed) * wavyOrbSpeedMultiplier}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const BaseDepthGlows: React.FC<{
  glowColor: string;
  speed: number;
}> = ({ glowColor, speed }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      const element = containerRef.current;
      if (!element) return;
      setSize(element.offsetWidth);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Outer glow */}
      <div
        style={{
          padding: "3%",
        }}
        className="absolute inset-0 "
      >
        <RotatingGlow
          color={glowColor}
          rotationSpeed={speed * 0.75}
          direction="counterclockwise"
          style={{
            filter: `blur(${size * 0.06}px)`,
            transform: "rotate(180deg)",
          }}
        />
      </div>

      {/* Outer ring */}
      <div
        className="absolute inset-0"
        style={{
          padding: "8px",
          width: "94%",
          height: "94%",
          margin: "auto",
        }}
      >
        <RotatingGlow
          color={`${glowColor}80`} // Adding 80 for 0.5 opacity
          rotationSpeed={speed * 0.25}
          direction="clockwise"
          style={{
            filter: `blur(${size * 0.032}px)`,
            transform: "rotate(180deg)",
          }}
        />
      </div>
    </div>
  );
};

const CoreGlowEffects: React.FC<{
  glowColor: string;
  speed: number;
  coreGlowIntensity: number;
}> = ({ glowColor, speed, coreGlowIntensity }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      const element = containerRef.current;
      if (!element) return;
      setSize(element.offsetWidth);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{
        // padding: `8%`,
        padding: `${size * 0.08}px`,
        // mixBlendMode: "plus-lighter",
      }}
    >
      <div
        style={{
          filter: `blur(${size * 0.08}px)`,
          opacity: coreGlowIntensity,
        }}
      >
        <RotatingGlow
          color={glowColor}
          rotationSpeed={speed * 3}
          direction="clockwise"
        />
      </div>
      <div
        style={{
          filter: `blur(${size * 0.06}px)`,
          opacity: coreGlowIntensity,
          mixBlendMode: "plus-lighter",
        }}
      >
        <RotatingGlow
          color={glowColor}
          rotationSpeed={speed * 2.3}
          direction="clockwise"
        />
      </div>
    </div>
  );
};

export const Orb: React.FC<OrbProps> = ({
  config: userConfig,
  className,
  style,
}) => {
  const config = { ...defaultOrbConfig, ...userConfig };

  return (
    <div
      className={`relative aspect-square ${className || ""}`}
      style={{
        ...style,
        isolation: "isolate",
      }}
    >
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {config.showBackground && (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${config.backgroundColors.join(
                ", "
              )})`,
            }}
          />
        )}

        <BaseDepthGlows glowColor={config.glowColor} speed={config.speed} />

        {config.showWavyBlobs && (
          <>
            <MaskedWavyBlob
              color={"#ffffffbf"}
              speed={config.speed * 1.5}
              size={1.875}
              offsetY={0.31}
              direction="clockwise"
              wavyOrbSpeedMultiplier={1.75}
            />
            <MaskedWavyBlob
              color={"white"}
              speed={config.speed * 0.75}
              opacity={0.5}
              size={1.25}
              offsetY={-0.31}
              direction="counterclockwise"
              wavyOrbSpeedMultiplier={2.25}
            />
          </>
        )}

        {config.showGlowEffects && (
          <CoreGlowEffects
            glowColor={config.glowColor}
            speed={config.speed}
            coreGlowIntensity={config.coreGlowIntensity}
          />
        )}

        {config.showParticles && (
          <>
            <ParticlesCanvas
              color={config.particleColor}
              speed={config.speed}
              speedRange={[10, 20]}
              sizeRange={[0.5, 1]}
              particleCount={10}
              opacityRange={[0, 0.3]}
            />
            <ParticlesCanvas
              color={config.particleColor}
              speed={config.speed}
              speedRange={[20, 30]}
              sizeRange={[0.2, 1]}
              particleCount={10}
              opacityRange={[0.3, 0.8]}
            />
          </>
        )}
      </div>

      {/* {config.showShadow && (
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(circle, ${config.backgroundColors[0]}40 0%, transparent 70%)`,
            filter: "blur(20px)",
            transform: "translateY(10%)",
          }}
        />
      )} */}
    </div>
  );
};

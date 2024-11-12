import React from "react";
import { motion } from "framer-motion";

type RotationDirection = "clockwise" | "counterclockwise";

interface RotatingGlowProps {
  color: string;
  rotationSpeed: number;
  direction?: RotationDirection;
}

export const RotatingGlow: React.FC<RotatingGlowProps> = ({
  color,
  rotationSpeed = 30,
  direction = "clockwise",
}) => {
  const rotationMultiplier = direction === "clockwise" ? 1 : -1;

  return (
    <motion.svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-0 w-full h-full"
      animate={{
        rotate: 360 * rotationMultiplier,
      }}
      transition={{
        duration: 360 / rotationSpeed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* First circle that will be masked */}
      <defs>
        <filter id="blurMask">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={256 * 0.16}
            result="blur1"
          />
        </filter>

        <filter id="offsetBlur">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={256 * 0.16}
            result="blur2"
          />
          <feOffset in="blur2" dy={256 * 0.31} result="offset" />
        </filter>
        {/* Updated mask filter */}
        <mask id="circleMask">
          <circle
            // filter="url(#blurMask)"
            fill="white"
            cx="50%"
            cy="50%"
            r="50%"
          />
          <circle
            fill="black"
            filter="url(#offsetBlur)"
            cx="50%"
            cy="50%"
            r="65.5%"
          />
        </mask>
      </defs>

      {/* Apply the mask to the first circle */}
      <circle fill={color} cx="50%" cy="50%" r="50%" mask="url(#circleMask)" />
    </motion.svg>
  );
};

import React from "react";
import { motion } from "framer-motion";

type RotationDirection = "clockwise" | "counterclockwise";

interface RotatingGlowProps {
  color: string;
  rotationSpeed: number;
  direction?: RotationDirection;
  style?: React.CSSProperties;
}

export const RotatingGlow: React.FC<RotatingGlowProps> = ({
  color,
  rotationSpeed = 30,
  direction = "clockwise",
  style,
}) => {
  const [size, setSize] = React.useState(256);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const rotationMultiplier = direction === "clockwise" ? 1 : -1;

  React.useLayoutEffect(() => {
    if (svgRef.current) {
      const boundingBox = svgRef.current.getBoundingClientRect();
      setSize(boundingBox.width);
    }
  }, []);

  return (
    <motion.svg
      ref={svgRef}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="relative w-full h-full"
      style={style}
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
            stdDeviation={size * 0.16}
            result="blur1"
          />
        </filter>

        <filter id="offsetBlur">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={size * 0.16}
            result="blur2"
          />
          <feOffset in="blur2" dy={size * 0.31} result="offset" />
        </filter>
        {/* Updated mask filter */}
        <mask id="circleMask">
          <circle
            filter="url(#blurMask)"
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

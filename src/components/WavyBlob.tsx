import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface WavyBlobProps {
  color: string;
  loopDuration?: number;
}

export const WavyBlob: React.FC<WavyBlobProps> = ({
  color,
  loopDuration = 1,
}) => {
  const pathRef = useRef<SVGPathElement>(null);

  // Create initial points similar to Swift version
  const initialPoints = Array.from({ length: 6 }, (_, index) => {
    const angle = (index / 6) * Math.PI * 2;
    return {
      x: 0.5 + Math.cos(angle) * 0.9,
      y: 0.5 + Math.sin(angle) * 0.9,
    };
  });

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // Animation parameters
    const radius = 45;
    const centerX = 50;
    const centerY = 50;
    const handleLength = radius * 0.33;

    const animate = () => {
      const timeNow = Date.now() / 1000;
      const angle = ((timeNow % loopDuration) / loopDuration) * Math.PI * 2;
      let d = "";

      // Calculate points with offsets
      const adjustedPoints = initialPoints.map((point, i) => {
        const phaseOffset = (i * Math.PI) / 3;
        const xOffset = Math.sin(angle + phaseOffset) * 7.5;
        const yOffset = Math.cos(angle + phaseOffset) * 7.5;

        return {
          x: centerX + (point.x - 0.5 + xOffset / 50) * radius,
          y: centerY + (point.y - 0.5 + yOffset / 50) * radius,
        };
      });

      // Create the path with cubic curves
      adjustedPoints.forEach((point, i) => {
        if (i === 0) {
          d = `M ${point.x} ${point.y}`;
        } else {
          const prev = adjustedPoints[i - 1];
          const currentAngle = Math.atan2(point.y - centerY, point.x - centerX);
          const prevAngle = Math.atan2(prev.y - centerY, prev.x - centerX);

          // Calculate control points perpendicular to the line between points
          const cp1x =
            prev.x + Math.cos(prevAngle + Math.PI / 2) * handleLength;
          const cp1y =
            prev.y + Math.sin(prevAngle + Math.PI / 2) * handleLength;
          const cp2x =
            point.x + Math.cos(currentAngle - Math.PI / 2) * handleLength;
          const cp2y =
            point.y + Math.sin(currentAngle - Math.PI / 2) * handleLength;

          d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
        }
      });

      // Close the path with a final curve
      const first = adjustedPoints[0];
      const last = adjustedPoints[adjustedPoints.length - 1];
      const firstAngle = Math.atan2(first.y - centerY, first.x - centerX);
      const lastAngle = Math.atan2(last.y - centerY, last.x - centerX);

      const cp1x = last.x + Math.cos(lastAngle + Math.PI / 2) * handleLength;
      const cp1y = last.y + Math.sin(lastAngle + Math.PI / 2) * handleLength;
      const cp2x = first.x + Math.cos(firstAngle - Math.PI / 2) * handleLength;
      const cp2y = first.y + Math.sin(firstAngle - Math.PI / 2) * handleLength;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${first.x} ${first.y}`;

      path.setAttribute("d", d);
      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [loopDuration]);

  return (
    <motion.svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        restDelta: 0.001,
      }}
    >
      <motion.path
        ref={pathRef}
        fill={color}
        style={{
          // filter: "blur(3px)",
          opacity: 0.4,
          // mixBlendMode: "plus-lighter",
        }}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          restDelta: 0.001,
        }}
      />
    </motion.svg>
  );
};

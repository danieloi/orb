"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

const Meteors = () => {
  const meteors = useMemo(() => {
    return Array.from({ length: 5 }, () => {
      const centerX = 250;
      const centerY = 250;
      // const radius = 200;

      const startAngle = Math.random() * Math.PI * 2;
      const startDistance = 200;
      const startX = centerX + Math.cos(startAngle) * startDistance;
      const startY = centerY + Math.sin(startAngle) * startDistance;

      const arcLength = Math.PI / 2 + Math.random() * Math.PI;
      const endAngle = startAngle + arcLength;
      const endX = centerX + Math.cos(endAngle) * startDistance;
      const endY = centerY + Math.sin(endAngle) * startDistance;

      const midAngle = startAngle + arcLength / 2;
      const controlDistance = startDistance * (1 + Math.random() * 0.5);
      const controlX = centerX + Math.cos(midAngle) * controlDistance;
      const controlY = centerY + Math.sin(midAngle) * controlDistance;

      return {
        d: `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`,
        duration: 0.5,
        delay: Math.floor(Math.random() * 10) + Math.random(),
        repeatDelay: 10,
      };
    });
  }, []);

  const bubbles = useMemo(() => {
    return Array.from({ length: 10 }, () => {
      const centerX = 250;
      const centerY = 250;
      const radius = 300;

      const angle = Math.random() * Math.PI;
      const distance = Math.random() * radius * 0.9;

      return {
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: 2 + Math.random() * 6,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 4,
      };
    });
  }, []);

  return (
    <>
      {meteors.map((meteor, index) => (
        <motion.path
          filter="blur(2px)"
          key={index}
          animate={{
            pathLength: [0, 1],
            opacity: [1, 0],
          }}
          transition={{
            duration: meteor.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: meteor.delay,
            repeatDelay: meteor.repeatDelay,
          }}
          style={{
            fill: "none",
            stroke: "white",
            strokeWidth: 5,
            strokeLinecap: "round",
          }}
          d={meteor.d}
        />
      ))}
      {bubbles.map((bubble, index) => (
        <motion.circle
          filter={`blur(5px)`}
          key={index}
          cx={bubble.x}
          cy={bubble.y}
          r={bubble.size}
          fill="white"
          initial={{ y: 100, opacity: 0, scale: 0 }}
          animate={{
            y: -100,
            opacity: [0, 1, 1, 0],
            scale: [0, 2, 0],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: "linear",
            delay: bubble.delay,
          }}
        />
      ))}
    </>
  );
};

const MagicGlobe = () => {
  return (
    <div className="h-full w-full bg-gray-900 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="-92.231 -93.835 686.102 686.102"
      >
        <defs>
          <radialGradient
            id="gradient-1"
            cx="76.348"
            cy="248.108"
            r="200"
            gradientTransform="matrix(.0016 -1.92946 1.7516 .00145 -184.545 590.336)"
            gradientUnits="userSpaceOnUse"
            spreadMethod="pad"
          >
            <stop offset="0" stopColor="#9869FE" stopOpacity="0"></stop>
            <stop offset="0.555" stopColor="#C15CFE" stopOpacity="0"></stop>
            <stop offset="0.803" stopColor="#E252FF" stopOpacity="0.61"></stop>
            <stop offset="0.926" stopColor="#FEA6FF" stopOpacity="0"></stop>
            <stop offset="1" stopColor="#FFF"></stop>
          </radialGradient>
          <radialGradient
            id="gradient-2"
            cx="289.358"
            cy="292.067"
            r="55.727"
            gradientTransform="matrix(1.13977 1.48056 -1.31524 1.0125 360.938 -430.316)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#9016FF"></stop>
            <stop offset="0.649" stopColor="#9E2BFF"></stop>
            <stop offset="0.836" stopColor="#EF8BFA"></stop>
            <stop offset="1" stopColor="#FFF"></stop>
          </radialGradient>
          <radialGradient
            id="gradient-3"
            cx="-323.974"
            cy="211.413"
            r="167.763"
            gradientTransform="matrix(1.0813 1.11513 -1.68336 1.63229 963.647 267.968)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FFF" stopOpacity="0"></stop>
            <stop offset="0.815" stopColor="#E3EAF3" stopOpacity="0"></stop>
            <stop offset="1" stopColor="#E3EAF3"></stop>
          </radialGradient>
          <radialGradient
            id="gradient-5"
            cx="-53.388"
            cy="-647.69"
            r="250"
            gradientTransform="matrix(-.0171 1.1726 -1.58884 -.02318 -778.19 252.265)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#D8D8D8" stopOpacity="0"></stop>
            <stop offset="0.686" stopColor="#FFF" stopOpacity="0"></stop>
            <stop offset="1" stopColor="#FFF" stopOpacity="0.5"></stop>
          </radialGradient>
          <radialGradient
            id="gradient-7-0"
            cx="950.337"
            cy="412.643"
            r="250"
            gradientUnits="userSpaceOnUse"
            href="#gradient-7"
          ></radialGradient>
          <linearGradient
            id="gradient-0"
            x1="250"
            x2="250"
            y1="0"
            y2="500"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FEE2FD"></stop>
            <stop offset="0.567" stopColor="#8524FE"></stop>
            <stop offset="0.903" stopColor="#00F"></stop>
            <stop offset="1" stopColor="#8284FF"></stop>
          </linearGradient>
          <linearGradient
            id="gradient-4"
            x1="250"
            x2="250"
            y1="0"
            y2="500"
            gradientTransform="matrix(.99995 -.01 .00507 .50658 1.217 252.46)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#D8D8D8" stopOpacity="0"></stop>
            <stop offset="1" stopColor="#00F" stopOpacity={0.7}></stop>
          </linearGradient>
          <linearGradient id="gradient-7">
            <stop offset="1" stopColor="#F0F0F1" stopOpacity="0"></stop>
            <stop offset="1" stopColor="#F0F0F1" stopOpacity="0.26"></stop>
          </linearGradient>
          <filter
            id="gaussian-blur-filter-2"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="1 1"></feGaussianBlur>
          </filter>
          <filter
            id="gaussian-blur-filter-0"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="10 10"></feGaussianBlur>
          </filter>
          <filter
            id="gaussian-blur-filter-1"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="6 6"></feGaussianBlur>
          </filter>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient
            id="shadow-gradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#FEE2FD" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#8524FE" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#00F" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#8284FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Exterior shadow with gradient */}
        <circle
          cx="250"
          cy="250"
          r="270"
          fill="url(#shadow-gradient)"
          filter="url(#glow)"
        />

        <motion.circle
          id="object-0"
          cx="250"
          cy="250"
          r="250"
          fill='url("#gradient-0")'
          stroke="#FFF"
          strokeOpacity="0.45"
          filter='url("#gaussian-blur-filter-2")'
        />
        <motion.circle
          cx="250"
          cy="250"
          r="200"
          fill='url("#gradient-1")'
          filter='url("#gaussian-blur-filter-0")'
          paintOrder="fill"
          transform="rotate(-7 8.173 .502)"
          // transformOrigin="250px 250px"
        />
        <motion.ellipse
          cx="333.843"
          cy="337.493"
          fill='url("#gradient-2")'
          fillOpacity="0.22"
          filter='url("#gaussian-blur-filter-1")'
          rx="55.727"
          ry="51.655"
        />
        <motion.circle
          animate={{
            transform: "rotate(360deg)",
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          cx="250"
          cy="250"
          r="250"
          fill='url("#gradient-4")'
          paintOrder="fill"
        />
        <motion.circle
          animate={{
            transform: "rotate(360deg)",
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          cx="250"
          cy="250"
          r="250"
          fill='url("#gradient-3")'
        />
        <motion.circle cx="250" cy="250" r="250" fill='url("#gradient-5")' />
        <motion.circle
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          cx="950.337"
          cy="412.643"
          r="250"
          fill='url("#gradient-7-0")'
          transform="rotate(-59 -494.187 536.483)"
          // transformOrigin="950.337px 412.643px"
        />

        <Meteors />
      </svg>
    </div>
  );
};

export default MagicGlobe;

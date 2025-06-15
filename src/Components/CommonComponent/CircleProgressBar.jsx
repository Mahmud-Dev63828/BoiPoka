import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CircleProgressBar = ({
  percentage = 0,
  label = "Progress",
  width = "30dvw",
  height = "30dvh",
  strokeWidth = 15,
  radius = 90,
  color = "#f87171", // Tailwind red-400
  backgroundStroke = "#f5f5f5",
  textColor = "#1f2937", // Tailwind gray-800
  labelColor = "#6b7280", // Tailwind gray-500
}) => {
  const circleRef = useRef(null);

  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const offset = circumference - (percentage / 100) * circumference;
    gsap.to(circleRef.current, {
      strokeDashoffset: offset,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [percentage, circumference]);

  return (
    <div className="relative" style={{ width, height }}>
      <svg className="absolute w-full h-full" viewBox="0 0 256 256">
        {/* Background Circle */}
        <circle
          cx="128"
          cy="128"
          r={radius}
          stroke={backgroundStroke}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Progress Circle */}
        <circle
          ref={circleRef}
          cx="128"
          cy="128"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          transform="rotate(-90 128 128)"
        />
      </svg>

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold" style={{ color: textColor }}>
          {percentage}%
        </h1>
        <p className="text-sm" style={{ color: labelColor }}>
          {label}
        </p>
      </div>
    </div>
  );
};

export default CircleProgressBar;

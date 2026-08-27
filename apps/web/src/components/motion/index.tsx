"use client";

import * as React from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";

// 1. Page Transition Wrapper
export function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 2. Staggered Container for Grids & Lists
export function StaggerContainer({
  children,
  className,
  delayChildren = 0.05,
  staggerChildren = 0.06,
}: {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3. Stagger Item
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 4. Interactive Card with Spring Hover Physics
export function MotionCard({
  children,
  className,
  onClick,
  ...props
}: HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
      whileTap={{ scale: 0.985, transition: { duration: 0.1 } }}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 5. Animated Number Counter for KPIs and Currency
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = React.useState(value);

  React.useEffect(() => {
    const start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 400; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easeProgress);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [value]);

  return (
    <span className={className}>
      {prefix}
      {displayValue.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

// 6. Live Status Pulsing Telemetry Dot
export function LivePulseDot({
  color = "emerald",
  size = "md",
}: {
  color?: "emerald" | "amber" | "orange" | "blue" | "rose";
  size?: "sm" | "md" | "lg";
}) {
  const colorMap = {
    emerald: { bg: "bg-emerald-500", ring: "bg-emerald-400" },
    amber: { bg: "bg-amber-500", ring: "bg-amber-400" },
    orange: { bg: "bg-[#F36E21]", ring: "bg-orange-400" },
    blue: { bg: "bg-[#1976D2]", ring: "bg-blue-400" },
    rose: { bg: "bg-rose-500", ring: "bg-rose-400" },
  };

  const sizeMap = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5",
  };

  const current = colorMap[color] || colorMap.emerald;

  return (
    <span className="relative flex h-2 w-2 items-center justify-center">
      <span
        className={`absolute inline-flex h-full w-full animate-ping rounded-full ${current.ring} opacity-75`}
      />
      <span className={`relative inline-flex ${sizeMap[size]} rounded-full ${current.bg}`} />
    </span>
  );
}

// 7. Tab Indicator with Layout Spring Animation
export function MotionTabItem({
  isActive,
  children,
  onClick,
  layoutId = "active-tab",
  className,
}: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
  layoutId?: string;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors ${className}`}
    >
      {isActive && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 bg-[#0A2A57] rounded-xl shadow-xs"
          transition={{ type: "spring", stiffness: 450, damping: 35 }}
        />
      )}
      <span className={`relative z-10 ${isActive ? "text-white" : "text-slate-600 hover:text-slate-900"}`}>
        {children}
      </span>
    </button>
  );
}

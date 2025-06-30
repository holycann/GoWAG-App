"use client";

import React from "react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { animationPresets } from "@/hooks/use-animation";

type AnimationType = keyof typeof animationPresets;

// Define proper types for animation presets
interface AnimationPreset {
  initial: Record<string, any>;
  animate: Record<string, any>;
  exit: Record<string, any>;
  transition: Transition;
}

interface AnimatedTransitionProps {
  children: React.ReactNode;
  type?: AnimationType;
  duration?: number;
  delay?: number;
  className?: string;
  show?: boolean;
  custom?: Record<string, any>;
}

export function AnimatedTransition({
  children,
  type = "fadeIn",
  duration,
  delay,
  className,
  show = true,
  custom
}: AnimatedTransitionProps) {
  // Get animation preset
  const preset = { ...animationPresets[type] } as AnimationPreset;
  
  // Override duration and delay if provided
  if (duration !== undefined) {
    preset.transition = {
      ...preset.transition,
      duration
    };
  }
  
  if (delay !== undefined) {
    preset.transition = {
      ...preset.transition,
      delay
    };
  }
  
  // Merge custom animation properties if provided
  const animationProps = {
    ...preset,
    ...(custom || {})
  };
  
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={type}
          className={className}
          initial={animationProps.initial}
          animate={animationProps.animate}
          exit={animationProps.exit}
          transition={animationProps.transition}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Variants for staggered animations
export const staggeredContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggeredItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

// Component for staggered list animations
interface AnimatedListProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function AnimatedList({
  children,
  staggerDelay = 0.1,
  className
}: AnimatedListProps) {
  const customContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };
  
  return (
    <motion.div
      className={className}
      variants={customContainer}
      initial="hidden"
      animate="show"
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={staggeredItem}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Component for page transitions
interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3
      }}
    >
      {children}
    </motion.div>
  );
} 
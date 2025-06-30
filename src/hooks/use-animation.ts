import { useState, useEffect, useCallback } from 'react';
import { 
  useMotionValue, 
  useTransform, 
  useSpring, 
  useAnimationControls, 
  MotionValue,
  Variants,
  Transition
} from 'framer-motion';

// Define proper types for animation presets
export interface AnimationPreset {
  initial: Record<string, any>;
  animate: Record<string, any>;
  exit: Record<string, any>;
  transition: Transition;
}

// Animation presets for common UI interactions
export const animationPresets: Record<string, AnimationPreset> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  slideDown: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  slideLeft: {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  slideRight: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  rotate: {
    initial: { rotate: -10, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 10, opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  }
};

// Hook for creating staggered animations for lists
export function useStaggerAnimation(itemCount: number, staggerDelay: number = 0.05) {
  return useCallback((index: number): AnimationPreset => {
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { 
        delay: index * staggerDelay,
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    };
  }, [itemCount, staggerDelay]);
}

// Hook for creating scroll-triggered animations
export function useScrollAnimation(threshold: number = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  
  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );
    
    observer.observe(node);
    
    return () => {
      observer.disconnect();
    };
  }, [threshold]);
  
  return { ref, isVisible };
}

// Hook for creating smooth counter animations
export function useCountAnimation(
  targetValue: number,
  duration: number = 1,
  precision: number = 0
) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000
  });
  
  const displayValue = useTransform(springValue, (latest) => 
    precision === 0 
      ? Math.round(latest).toLocaleString()
      : latest.toFixed(precision).toLocaleString()
  );
  
  useEffect(() => {
    motionValue.set(targetValue);
  }, [targetValue, motionValue]);
  
  return { value: displayValue, motionValue: springValue };
}

// Hook for creating hover animations
export function useHoverAnimation(scale: number = 1.05) {
  return {
    whileHover: { scale },
    transition: { type: 'spring', stiffness: 400, damping: 17 } as Transition
  };
}

// Hook for creating tap animations
export function useTapAnimation(scale: number = 0.95) {
  return {
    whileTap: { scale },
    transition: { type: 'spring', stiffness: 400, damping: 17 } as Transition
  };
}

// Hook for creating drag animations
export function useDragAnimation(
  axis: 'x' | 'y' | 'both' = 'both',
  constraints?: { left?: number; right?: number; top?: number; bottom?: number }
) {
  const dragConstraints = constraints || { left: 0, right: 0, top: 0, bottom: 0 };
  
  return {
    drag: axis,
    dragConstraints,
    dragElastic: 0.1,
    dragTransition: { bounceStiffness: 600, bounceDamping: 20 }
  };
}

// Define type for animation sequence items
interface AnimationSequenceItem {
  target: string;
  animation: Record<string, any>;
  transition?: Transition;
}

// Hook for sequencing multiple animations
export function useSequenceAnimation() {
  const controls = useAnimationControls();
  
  const sequence = useCallback(async (animations: AnimationSequenceItem[]) => {
    for (const { target, animation, transition } of animations) {
      await controls.start((name) => {
        if (name === target) {
          return {
            ...animation,
            transition: transition || { duration: 0.3 }
          };
        }
        return {};
      });
    }
  }, [controls]);
  
  return { controls, sequence };
} 
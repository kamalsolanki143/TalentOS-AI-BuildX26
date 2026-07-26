import { Variants } from 'framer-motion';

/**
 * Global Framer Motion Animation Presets for TalentOS
 */

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3 } },
};

export const fadeDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] } },
  exit: { opacity: 0, y: 15, transition: { duration: 0.3 } },
};

export const fadeLeft: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
};

export const fadeRight: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export const rotateIn: Variants = {
  initial: { opacity: 0, rotate: -5, scale: 0.95 },
  animate: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, rotate: 5, scale: 0.95, transition: { duration: 0.2 } },
};

export const hoverLift = {
  rest: { y: 0, boxShadow: '0 4px 6px -1px rgba(16, 24, 40, 0.04)' },
  hover: { y: -4, boxShadow: '0 12px 20px -3px rgba(16, 24, 40, 0.08)', transition: { duration: 0.2 } },
};

export const hoverGlow = {
  rest: { boxShadow: '0 0 0px rgba(79, 70, 229, 0)' },
  hover: { boxShadow: '0 0 24px rgba(79, 70, 229, 0.25)', transition: { duration: 0.25 } },
};

export const cardHover = {
  rest: { y: 0, scale: 1, transition: { duration: 0.2 } },
  hover: { y: -3, scale: 1.01, transition: { duration: 0.2 } },
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

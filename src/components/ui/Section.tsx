import { motion, Variants } from 'framer-motion';
import { cn } from '../../utils/cn';
import { ReactNode } from 'react';

// Base variants for a section container (fade + slight rise)
const container: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 22,
      mass: 0.9,
    }
  }
};

// Stagger children (used when Section has motion children with variants "child")
export const staggerChildren: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export const fadeChild: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 0.8, 0.32, 1] }
  }
};

interface SectionProps {
  id?: string;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
  children: ReactNode;
  stagger?: boolean; // enable parent-level stagger
  viewportAmount?: number; // amount of section visibility before animation triggers
  once?: boolean; // animate only first time
}

export const Section = ({
  id,
  className,
  children,
  as: Tag = 'section',
  stagger = false,
  viewportAmount = 0.35,
  once = true
}: SectionProps) => {
  return (
    <motion.section
      id={id}
      className={cn('relative', className)}
      variants={stagger ? { ...staggerChildren } : container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: viewportAmount }}
    >
      {children}
    </motion.section>
  );
};

// Utility wrapper for motion-enabled elements without manually importing variants
export const MotionFade = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div variants={fadeChild} className={className}>{children}</motion.div>
);

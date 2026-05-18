'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

interface Props {
  children: ReactNode;
  className?: string;
}

export default function StaggerItem({ children, className }: Props) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

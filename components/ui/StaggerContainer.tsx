'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

interface Props {
  children: ReactNode;
  className?: string;
}

export default function StaggerContainer({ children, className }: Props) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

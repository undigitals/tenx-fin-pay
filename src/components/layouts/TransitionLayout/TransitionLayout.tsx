import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';

export const TransitionLayout: React.FC = () => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height: '100%', flexDirection: 'column', flex: '1 1 auto', maxWidth: '100%' }}
    >
      <Outlet />
    </motion.div>
  </AnimatePresence>
);

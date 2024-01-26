import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ReactPortalProps = {
  children: ReactNode;
  containerId?: string;
};

export const Portal: React.FC<ReactPortalProps> = ({ children, containerId = 'container' }) => {
  const el = document.getElementById(containerId);
  console.log('el: ', el);
  if (!el) return null;
  return createPortal(children, el);
};

import React, { useEffect, useRef } from 'react';
import { useWindowResize } from 'utils/hooks/useWindowResize';
import { SContainer } from './Collapsible.styles';

interface IConsentProps {
  children: React.ReactNode;
  isOpen: boolean;
  isActive: boolean;
}

const DEFAULT_COLLAPSIBLE_MAX_HEIGHT = 800;

export const Collapsible: React.FC<IConsentProps> = ({ isOpen = false, isActive = true, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maxHeightRef = useRef<number | string>(DEFAULT_COLLAPSIBLE_MAX_HEIGHT);
  const { isResizing } = useWindowResize();

  useEffect(() => {
    if (!isActive) {
      return;
    }

    if (!isOpen || (isOpen && maxHeightRef.current === DEFAULT_COLLAPSIBLE_MAX_HEIGHT)) {
      maxHeightRef.current = containerRef.current?.scrollHeight ?? DEFAULT_COLLAPSIBLE_MAX_HEIGHT;
    }
  }, [isOpen]);

  useEffect(() => {
    if (containerRef.current?.scrollHeight) {
      maxHeightRef.current = containerRef.current?.scrollHeight ?? DEFAULT_COLLAPSIBLE_MAX_HEIGHT;
    }
  }, [containerRef.current?.scrollHeight]);

  useEffect(() => {
    if (isResizing) {
      maxHeightRef.current = DEFAULT_COLLAPSIBLE_MAX_HEIGHT;
    }
  }, [isResizing]);

  return (
    <SContainer className="collapsible" ref={containerRef} style={isActive ? { maxHeight: isOpen ? maxHeightRef.current : 0 } : { maxHeight: DEFAULT_COLLAPSIBLE_MAX_HEIGHT }}>
      {children}
    </SContainer>
  );
};

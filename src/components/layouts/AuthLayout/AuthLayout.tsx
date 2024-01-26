import React from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { useLogin } from 'utils/hooks/useLogin';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { SLayout, SLayoutInner, SLayoutContent, SExtendedLayout, SAuthLayoutHeaderWrapper, SAuthLayoutFooterWrapper, SDesktopWrapper, SDesktopBlock } from './AuthLayout.styles';
import { AuthLayoutFooter } from './AuthLayoutFooter/AuthLayoutFooter';
import { AuthLayoutHeader } from './AuthLayoutHeader/AuthLayoutHeader';

export const AuthLayout: React.FC<{ altLayout?: string; tabletWidth?: string; showHeader?: boolean }> = ({ altLayout, tabletWidth, showHeader = true }) => {
  const loginClick = useLogin();
  const { isDesktopSize } = useDeviceDimension();

  const motionVariants = {
    hide: { opacity: 0 },
    show: { opacity: 1 },
  };

  const innerMotionVariants = {
    hide: { y: '-18%' },
    show: { y: 0 },
  };

  return (
    <SLayout altLayout={altLayout}>
      {(isDesktopSize || showHeader) && (
        <SAuthLayoutHeaderWrapper variants={motionVariants} animate={loginClick.motionVariant()}>
          <AuthLayoutHeader altLayout={altLayout} />
        </SAuthLayoutHeaderWrapper>
      )}

      <SLayoutInner as={motion.div} variants={innerMotionVariants} animate={loginClick.motionVariant()} transition={{ y: { duration: 0.5 } }} altLayout={altLayout}>
        <SLayoutContent>
          {isDesktopSize ? (
            <SDesktopWrapper>
              <SDesktopBlock tabletWidth={tabletWidth}>
                <Outlet />
              </SDesktopBlock>
            </SDesktopWrapper>
          ) : (
            <Outlet />
          )}
        </SLayoutContent>

        <SAuthLayoutFooterWrapper variants={motionVariants} animate={loginClick.motionVariant()}>
          <AuthLayoutFooter />
        </SAuthLayoutFooterWrapper>
      </SLayoutInner>
      {loginClick.isClicked && <SExtendedLayout />}
    </SLayout>
  );
};

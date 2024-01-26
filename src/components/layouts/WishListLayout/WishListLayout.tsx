import React from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { useLogin } from 'utils/hooks/useLogin';
import { SLayout, SLayoutInner, SLayoutContent, SExtendedLayout } from './WishListLayout.styles';
import { WishListLayoutHeader } from './WishListLayoutHeader/WishListLayoutHeader';

export const WishListLayout: React.FC = () => {
  const loginClick = useLogin();

  const innerMotionVariants = {
    hide: { y: '-18%' },
    show: { y: 0 },
  };

  return (
    <SLayout>
      <WishListLayoutHeader />
      <SLayoutInner as={motion.div} variants={innerMotionVariants} animate={loginClick.motionVariant()} transition={{ y: { duration: 0.5 } }}>
        <SLayoutContent>
          <Outlet />
        </SLayoutContent>
      </SLayoutInner>
      {loginClick.isClicked && <SExtendedLayout />}
    </SLayout>
  );
};

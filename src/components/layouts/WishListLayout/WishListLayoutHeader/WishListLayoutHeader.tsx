import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLogin } from 'utils/hooks/useLogin';
import { TenxLogo } from 'components/general/TenxLogo/TenxLogo';
import { SBrand } from './WishListLayoutHeader.styles';

export const WishListLayoutHeader: React.FC = () => {
  const navigate = useNavigate();
  const loginClick = useLogin();

  const motionVariants = {
    hide: { opacity: 0 },
    show: { opacity: 1 },
  };

  const handleBrandClick = () => {
    navigate('/started');
  };

  return (
    <SBrand as={motion.div} variants={motionVariants} animate={loginClick.motionVariant()} onClick={handleBrandClick}>
      <TenxLogo />
    </SBrand>
  );
};

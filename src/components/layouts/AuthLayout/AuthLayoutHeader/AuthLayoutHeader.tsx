import React from 'react';
import { TenxLogo } from 'components/general/TenxLogo/TenxLogo';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { SBrand, SBrandV2 } from './AuthLayoutHeader.styles';

export const AuthLayoutHeader: React.FC<{ altLayout?: string }> = ({ altLayout }) => {
  const navigate = useNavigate();

  const handleBrandClick = () => {
    navigate(ROUTES.onboardingLanguageSelection.path);
  };

  if (altLayout === 'v2') {
    return (
      <SBrandV2 onClick={handleBrandClick}>
        <TenxLogo height={32} width={192} />
      </SBrandV2>
    );
  }

  return (
    <SBrand onClick={handleBrandClick}>
      <TenxLogo height={32} isWhite />
    </SBrand>
  );
};

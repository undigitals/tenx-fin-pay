import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { SActions, SLayout, STitle } from './WelcomePage.styles';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(ROUTES.login.path);
  };

  const handleRegister = () => {
    navigate(ROUTES.registration.path);
  };

  return (
    <SLayout>
      <STitle textTag="h1" size="bigger" fontWeight="lighter" align="center" marginBottom="bigger">
        Welcome!
      </STitle>

      <SActions>
        <CustomButton preset="primary" onClick={handleLogin}>
          Log in
        </CustomButton>

        <CustomButton onClick={handleRegister}>Sign Up</CustomButton>
      </SActions>
    </SLayout>
  );
};

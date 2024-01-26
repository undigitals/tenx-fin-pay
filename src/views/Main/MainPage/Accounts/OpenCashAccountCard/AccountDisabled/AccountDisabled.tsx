import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BodyText } from 'components/general/Typography';
import { Icon } from 'components/general/Icon/Icon';
import { Box, SCardTitle } from 'views/Main/MainPage/MainPage.styles';
import { TThemeColor } from 'styles/theme';
import { SContainer, SIconWrapper, STextContainer, SIcon, SCustomButton } from './AccountDisabled.styles';

interface IAccountDisabled {
  title: string;
  description?: string;
  color: TThemeColor;
  bgColor: TThemeColor;
  iconName: string;
  redirectPath?: string;
  onClick?: () => void;
  isSupportBtn?: boolean;
  btnText?: string;
}

export const AccountDisabled: React.FC<IAccountDisabled> = ({ title, description, iconName, redirectPath, onClick, isSupportBtn, btnText, color = 'blue', bgColor = 'blue5' }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleButtonClick = () => {
    if (redirectPath) {
      navigate(redirectPath);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Box changeDirection width="100%">
      <SCardTitle marginBottom={16}>{t('homeScreen.My Accounts')}</SCardTitle>
      <SContainer marginTop={0} marginBottom={16}>
        <CustomRow alignItems="start" justifyContent="flex-start">
          <SIconWrapper bgColor={bgColor}>
            <SIcon name={iconName} color={color} size="normal" cursorPointer />
          </SIconWrapper>
          <STextContainer>
            <BodyText textType="bodyText" fontWeight="SB" color="charcoal" size="L" textAlign="start" font="Poppins" marginBottom={8} marginTop={0}>
              {title}
            </BodyText>
            {description && (
              <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" lineHeight={1.4} paddingRight={10}>
                {description}
              </BodyText>
            )}
            {btnText &&
              (isSupportBtn ? (
                <SCustomButton size="small" onClick={handleButtonClick}>
                  {btnText} &nbsp;
                  <Icon name="telephone" color="blue" size="smaller" />
                </SCustomButton>
              ) : (
                <CustomButton preset="primary" size="small" onClick={handleButtonClick}>
                  {btnText}
                </CustomButton>
              ))}
          </STextContainer>
        </CustomRow>
      </SContainer>
    </Box>
  );
};

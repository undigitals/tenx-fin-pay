import React from 'react';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { useTranslation } from 'react-i18next';
import { BodyText, Title } from 'components/general/Typography';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { StyledLink } from 'views/Main/MainPage/TenxPayCard/TenxPay/TenxPay.styles';
import { ROUTES } from 'vars/const/ROUTES';
import { SCashAccountImage } from './OpenCashAccountCard.styles';

export const OpenCashAccountCard: React.FC = () => {
  const { t } = useTranslation();
  const { isDesktopSize } = useDeviceDimension();

  return (
    <CustomCard padding="0 0 10px" marginTop={0}>
      <CustomRow flexDirection={isDesktopSize ? 'row' : 'column'}>
        <div>
          <SCashAccountImage isDesktop={isDesktopSize} />
        </div>
        <div>
          <Title fontWeight={isDesktopSize ? 'M' : 'SB'} size={isDesktopSize ? 'L' : 'T'} font="Poppins" color="charcoal" marginTop={25}>
            {t('cashAccount.SayGoodbyeToSurpriseFees')}
          </Title>
          <BodyText textType="bodyText" size={isDesktopSize ? 'L' : 'N'} fontWeight={isDesktopSize ? 'B' : 'M'} marginTop={isDesktopSize ? 24 : 10} color="charcoal70" lineHeight={1.0}>
            {t('cashAccount.NoSurpriseFees')}
          </BodyText>
          <BodyText textType="bodyText" size="N" fontWeight="R" marginTop={20} marginBottom={26} color="charcoal70" lineHeight={1.4}>
            {t('cashAccount.TheTenxCashAccountAndDebitCardAvailableFor')}
          </BodyText>
          <StyledLink to={ROUTES.starter.path}>
            <CustomButton preset="primary" size="middleStretch" width={isDesktopSize ? 'auto' : '100%'}>
              {t('cashAccount.Add Cash Account')}
            </CustomButton>
          </StyledLink>
        </div>
      </CustomRow>
    </CustomCard>
  );
};

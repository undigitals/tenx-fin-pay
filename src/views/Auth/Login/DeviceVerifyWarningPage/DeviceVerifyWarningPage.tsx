import React from 'react';
import { ROUTES } from 'vars/const/ROUTES';
import { lsGetItem } from 'utils/helpers/storage';
import { Icon } from 'components/general/Icon/Icon';
import { SRow } from 'components/theme/CustomRow/CustomRow.styles';
import { Title, BodyText } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SFields, SLayout, RoundIconWrapper, SPhone } from './DeviceVerifyWarningPage.styles';

export const DeviceVerifyWarningPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const otpFlow = lsGetItem('loginOtpFlow');

  return (
    <SLayout>
      <SFields>
        <Title size="S" fontWeight="SB" marginBottom="spacing-jumbo">
          Verification
        </Title>
        <BodyText textType="bodyText" fontWeight="M" size="M" color="charcoal60" marginBottom="spacing-large">
          {t('verification.ForYourSecurity')}
        </BodyText>
        <SRow alignItems="center" justifyContent="flex-start">
          <RoundIconWrapper>
            <Icon name="telephone" size="smaller" color="blue" />
          </RoundIconWrapper>
          <BodyText textType="bodyText" textAlign="center" fontWeight="M" size="M" color="charcoal60">
            {t('verification.Phone')} <SPhone>{otpFlow?.maskedPhone}</SPhone>
          </BodyText>
        </SRow>
      </SFields>

      <CustomButton preset="primary" onClick={() => navigate(ROUTES.verifyDevice.path)}>
        {t('verification.Continue')}
      </CustomButton>
    </SLayout>
  );
};

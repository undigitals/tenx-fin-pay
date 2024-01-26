import React from 'react';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useTranslation } from 'react-i18next';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { SArrowRight } from 'views/TenxPay/EmailVerification/EmailVerificationPage.styles';

interface ISubmitButtom {
  handleOnFinish: () => Promise<void>;
  isButtonDisabled: boolean;
}

export const SubmitButtom: React.FC<ISubmitButtom> = ({ handleOnFinish, isButtonDisabled }) => {
  const { t } = useTranslation();
  const { isDesktopSize } = useDeviceDimension();
  return (
    <CustomRow marginTop={30} justifyContent={isDesktopSize ? 'center' : 'space-between'}>
      <CustomButton onClick={handleOnFinish} disabled={isButtonDisabled} preset={isButtonDisabled ? '' : 'primary'} width={isDesktopSize ? '70%' : '100%'}>
        {t('tenxPayEmailVerification.Send verification code')} <SArrowRight color={isButtonDisabled ? 'charcoal40' : 'white'} />
      </CustomButton>
    </CustomRow>
  );
};

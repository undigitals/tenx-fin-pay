import React from 'react';
import { useTranslation } from 'react-i18next';
import { BodyText } from 'components/general/Typography';

interface IResendCodeTextProps {
  resendCode: (e: React.MouseEvent<HTMLElement>) => void;
}

export const ResendCodeText: React.FC<IResendCodeTextProps> = ({ resendCode }) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'myInfo' });

  return (
    <BodyText textType="bodyText" textAlign="center" justifyContent="center" color="charcoal60" fontWeight="R" size="N" marginTop={20}>
      {t("Didn't receive verification code?")}{' '}
      <BodyText onClick={resendCode} cursorPointer display="inline" textType="bodyText" textAlign="start" color="blue" fontWeight="M" size="N">
        {t('Resend Code')}
      </BodyText>
    </BodyText>
  );
};

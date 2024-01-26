import { SmsCodeForm } from 'components/general/SmsCodeForm/SmsCodeForm';
import { BodyText } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SLayout, SButtonWrapper, SCustomButton } from './EnterCodeBlock.styles';

interface IEnterCodeBlockProps {
  handleCompletion: (code: string) => void;
  handleResendCode: () => Promise<void>;
  handleSubmitCode: () => Promise<void>;
  isError?: boolean;
}

export const EnterCodeBlock: React.FC<IEnterCodeBlockProps> = ({ handleCompletion, handleResendCode, handleSubmitCode, isError }) => {
  const { t } = useTranslation();
  const { isDesktopSize } = useDeviceDimension();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  return (
    <SLayout isDesktopSize={isDesktopSize}>
      <CustomCard marginTop={isDesktopSize ? 0 : 16}>
        <BodyText textType="bodyText" color="charcoal" justifyContent="center" size="N" fontWeight="R" marginBottom={25}>
          {t('verification.EnterCode')}
        </BodyText>
        <SmsCodeForm handleCompletion={handleCompletion} onCompletion={setIsSubmitDisabled} isWrongCode={isError} />
      </CustomCard>

      {isError && (
        <BodyText textType="bodyText" size="N" fontWeight="R" font="Poppins" color="red" justifyContent="center" marginTop={12}>
          {t('profile.InvalidCode')}
        </BodyText>
      )}

      <SButtonWrapper>
        <SCustomButton preset="primary" type="submit" onClick={handleSubmitCode} disabled={isSubmitDisabled} marginTop={isDesktopSize ? 12 : 68} marginBottom={35}>
          {isSubmitDisabled ? t('verification.Continue') : t('verification.Verify')}
        </SCustomButton>
      </SButtonWrapper>

      <div className="footer">
        <BodyText textType="bodyText" color="charcoal60" size="N" fontWeight="R">
          {t('verification.DidntReceive')}
        </BodyText>
        <BodyText textType="bodyText" color="blue" size="N" fontWeight="M" onClick={handleResendCode} cursorPointer>
          {t('verification.Resend')}
        </BodyText>
      </div>
    </SLayout>
  );
};

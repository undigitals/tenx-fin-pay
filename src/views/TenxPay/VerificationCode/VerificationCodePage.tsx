import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setShowEnrollModal } from 'store/ui.slice';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCheckCodeEmailMutation } from 'store/user/authentication.api';
import { handleError } from 'utils/helpers/errorHelper';
import { Icon } from 'components/general/Icon/Icon';
import { SmsCodeForm } from 'components/general/SmsCodeForm/SmsCodeForm';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { BodyText, Title } from 'components/general/Typography';
import { selectIsEmailVerifiedOrAbsent, selectTransactionId, selectUserEmail } from 'store/user/authentication.slice';
import { useEnrollMutation, useLazyGetIsEmailVerifiedQuery, useLazyGetThirdPartyIdsQuery } from 'store/user/users.api';
import { useAppDispatch } from 'utils/hooks/store';
import { ROUTES } from 'vars/const/ROUTES';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useTranslation } from 'react-i18next';
import { SArrowRight, SButtonContentWrapper, SContent, SLayout } from './VerificationCodePage.styles';

interface IVerificationEmail {
  state?: {
    email?: string;
  };
}

export const VerificationCodePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const location = useLocation() as IVerificationEmail;
  const email = location?.state?.email;
  const userEmail = useSelector(selectUserEmail);
  const [checkCodeEmailAPI, checkCodeEmailAPIResult] = useCheckCodeEmailMutation();
  const [enrollAPI, enrollAPIResult] = useEnrollMutation();
  const [getThirdPartyIds] = useLazyGetThirdPartyIdsQuery();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const transactionId = useSelector(selectTransactionId);
  const isUserEmailVerified = useSelector(selectIsEmailVerifiedOrAbsent);
  const [getIsEmailVerified] = useLazyGetIsEmailVerifiedQuery();

  const [code, setCode] = useState<string>('');

  const handleCompletion = (smsCode: string) => {
    setCode(smsCode);
  };

  const handleOnFinish = async () => {
    await checkCodeEmailAPI({ code, transactionId: transactionId || '', dontUpdateDb: isUserEmailVerified ?? undefined });
  };

  useEffect(() => {
    if (checkCodeEmailAPIResult?.isError) {
      handleError(checkCodeEmailAPIResult.error);
    }

    if (checkCodeEmailAPIResult?.isSuccess) {
      enrollAPI(userEmail === email ? {} : { email });
      getIsEmailVerified();
    }
  }, [checkCodeEmailAPIResult?.isSuccess, checkCodeEmailAPIResult?.isError, checkCodeEmailAPIResult?.error]);

  useEffect(() => {
    if (enrollAPIResult?.isSuccess) {
      getThirdPartyIds()
        .unwrap()
        .then(() => {
          navigate(ROUTES.termsAndConditions.path);
        })
        .catch(() => {
          navigate(ROUTES.termsAndConditions.path);
        });
    }

    if (enrollAPIResult?.isError) {
      dispatch(setShowEnrollModal({ isOpen: true, email }));
    }
  }, [enrollAPIResult?.isSuccess, enrollAPIResult?.isError]);

  return (
    <SLayout>
      <div>
        <CustomRow justifyContent="flex-start" marginBottom={15}>
          <Icon name="earlyPay" color="green" size="bigger" />
          <Title size="S" fontWeight="SB" color="charcoal" font="Poppins">
            {t('tenxPayCode.Tenx Pay')}
          </Title>
        </CustomRow>

        <Title color="charcoal" size="S" fontWeight="M" font="Poppins">
          {t("tenxPayCode.We've sent a verification code")}
        </Title>
        <BodyText textType="bodyText" size="N" fontWeight="R" font="DM Sans" color="charcoal70" marginBottom={32} marginTop={15}>
          {t('tenxPayCode.Check your email.')}
        </BodyText>

        <SContent>
          <CustomRow flexDirection="column">
            <BodyText textType="bodyText" fontWeight="R" font="DM Sans" size="N" color="charcoal70" marginBottom={24} textAlign="center">
              {t('tenxPayCode.Enter the verification code')}
            </BodyText>
            <SmsCodeForm handleCompletion={handleCompletion} onCompletion={setIsSubmitDisabled} inputTheme="my-info-big" />
          </CustomRow>
        </SContent>
      </div>
      <CustomButton onClick={handleOnFinish} disabled={isSubmitDisabled}>
        <SButtonContentWrapper>
          {t('tenxPayCode.Continue')} <SArrowRight color={isSubmitDisabled ? 'charcoal40' : 'blue'} />
        </SButtonContentWrapper>
      </CustomButton>
    </SLayout>
  );
};

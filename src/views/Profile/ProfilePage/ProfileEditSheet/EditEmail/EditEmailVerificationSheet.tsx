import { Loader } from 'components/general/Loader/Loader';
import { SmsCodeForm } from 'components/general/SmsCodeForm/SmsCodeForm';
import { BodyText, Title } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectProfileEmailVerificationSheet, setProfileEmailVerificationSheet } from 'store/ui.slice';
import { useChangeEmailVerificationFinishMutation, useEditUserProfileDataMutation, useGetUserProfileDataMutation } from 'store/user/users.api';
import { handleError } from 'utils/helpers/errorHelper';
import { useAppDispatch } from 'utils/hooks/store';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { ResendCodeText } from 'views/OpenCashAccount/MyInfo/EmailPage/SmsCodePage/ResendCodeText/ResendCodeText';

export const EditEmailVerificationSheet = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { displayProfileEmailVerificationSheet, currentEmail, transactionId } = useSelector(selectProfileEmailVerificationSheet);

  const { generateCodeEmail, generateCodeEmailStatus } = useCashAccountOpening();

  const [verificateAPI, verificateAPIResult] = useChangeEmailVerificationFinishMutation();
  const [editUserProfileData, editUserProfileDataResult] = useEditUserProfileDataMutation();
  const [getUserProfileData] = useGetUserProfileDataMutation();

  const [code, setCode] = useState<string>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const resetVerificationState = () => {
    dispatch(setProfileEmailVerificationSheet({ displayProfileEmailVerificationSheet: false, currentEmail: '', transactionId: '' }));
    setIsError(false);
  };

  const resendCode = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    if (currentEmail) {
      generateCodeEmail?.(currentEmail);
    }
  };

  const handleCompletion = (smsCode: string) => {
    setCode(smsCode);
    setIsError(false);
  };

  const handleVerify = () => {
    setIsError(false);
    verificateAPI({ code, transactionId });
  };

  const changeEmail = () => {
    const newData = {
      profileData: {
        email: currentEmail,
      },
    };

    editUserProfileData(newData)
      .then(() => {
        getUserProfileData({});
      })
      .then(() => resetVerificationState());
  };

  const handleOnClose = () => {
    resetVerificationState();
  };

  useEffect(() => {
    if (verificateAPIResult?.isSuccess) {
      changeEmail();
    }

    if (verificateAPIResult?.isError || generateCodeEmailStatus?.isError) {
      setIsError(true);
    }
  }, [verificateAPIResult?.isSuccess, verificateAPIResult?.isError, generateCodeEmailStatus?.isError]);

  useEffect(() => {
    if (editUserProfileDataResult?.isError) {
      handleError(editUserProfileDataResult?.error);
    }
  }, [editUserProfileDataResult?.isError]);

  useEffect(() => {
    setIsError(false);

    return () => {
      setIsError(false);
      resetVerificationState();
    };
  }, []);

  return (
    <CustomSheet isOpen={displayProfileEmailVerificationSheet} header={false} wrapperPadding={false} paddingTop="32px" onClose={handleOnClose}>
      <Title color="charcoal" fontWeight="SB" size="S" marginBottom={32} font="Poppins" textAlign="start">
        {t(`profile.EmailVerification`)}
      </Title>

      <CustomCard borderRadius={20} border="2px solid #EAEAEA">
        <CustomRow flexDirection="column" justifyContent="flex-start">
          <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal" marginBottom={30}>
            {t('profile.Verification')}
          </BodyText>
          {displayProfileEmailVerificationSheet && <SmsCodeForm isWrongCode={isError} handleCompletion={handleCompletion} onCompletion={setIsSubmitDisabled} inputTheme="my-info-big" />}
        </CustomRow>
      </CustomCard>

      {isError && (
        <BodyText textType="bodyText" size="N" fontWeight="R" font="Poppins" color="red" justifyContent="center" marginTop={12}>
          {t('profile.InvalidCode')}
        </BodyText>
      )}

      {verificateAPIResult?.isLoading || editUserProfileDataResult?.isLoading || generateCodeEmailStatus?.isLoading ? (
        <Loader />
      ) : (
        <CustomButton preset="primary" type="submit" size="middleStretch" marginTop={25} disabled={isSubmitDisabled} onClick={handleVerify}>
          {t('profile.Verify')}
        </CustomButton>
      )}
      <ResendCodeText resendCode={resendCode} />
    </CustomSheet>
  );
};

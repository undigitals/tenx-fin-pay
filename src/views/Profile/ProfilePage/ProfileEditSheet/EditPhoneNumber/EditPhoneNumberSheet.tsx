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
import { selectProfilePhoneVerificationSheet, setProfilePhoneVerificationSheet } from 'store/ui.slice';
import { selectCurrentAuthState } from 'store/user/authentication.slice';
import { useChangePhoneGenerateCodeMutation, useChangePhoneVerificationFinishMutation, useEditUserProfileDataMutation, useGetUserProfileDataMutation } from 'store/user/users.api';
import { handleError } from 'utils/helpers/errorHelper';
import { useAppDispatch } from 'utils/hooks/store';

export const EditPhoneNumberSheet: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { changePhoneTransactionId } = useSelector(selectCurrentAuthState);
  const { displayProfilePhoneVerificationSheet, currentPhone } = useSelector(selectProfilePhoneVerificationSheet);

  const [generateCodeAPI, generateCodeAPIResult] = useChangePhoneGenerateCodeMutation();
  const [verificateAPI, verificateAPIResult] = useChangePhoneVerificationFinishMutation();
  const [editUserProfileData, editUserProfileDataResult] = useEditUserProfileDataMutation();
  const [getUserProfileData] = useGetUserProfileDataMutation();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [code, setCode] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const resetVerificationState = () => {
    dispatch(setProfilePhoneVerificationSheet({ displayProfilePhoneVerificationSheet: false, currentPhone: '', transactionId: '' }));
    setIsError(false);
  };

  const handleCompletion = (smsCode: string) => {
    setCode(smsCode);
    setIsError(false);
  };

  const handleVerify = () => {
    setIsError(false);
    verificateAPI({ code, transactionId: changePhoneTransactionId });
  };

  const changePhone = () => {
    const data = {
      profileData: {
        primaryPhone: currentPhone,
      },
    };

    editUserProfileData(data)
      .then(() => {
        getUserProfileData({});
      })
      .then(() => resetVerificationState());
  };

  const handleOnClose = () => {
    resetVerificationState();
  };

  const resendCode = () => {
    generateCodeAPI({ newPhone: currentPhone });
  };

  useEffect(() => {
    if (verificateAPIResult?.isSuccess) {
      changePhone();
    }

    if (verificateAPIResult?.isError) {
      setIsError(true);
    }
  }, [verificateAPIResult?.isSuccess, verificateAPIResult?.isError]);

  useEffect(() => {
    if (editUserProfileDataResult?.isError) {
      handleError(editUserProfileDataResult.error);
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
    <CustomSheet isOpen={displayProfilePhoneVerificationSheet} header={false} wrapperPadding={false} paddingTop="32px" onClose={handleOnClose}>
      <Title color="charcoal" fontWeight="SB" size="S" marginBottom={32} font="Poppins" textAlign="start">
        {t(`profile.PhoneVerification`)}
      </Title>

      <CustomCard borderRadius={20} border="2px solid #EAEAEA">
        <CustomRow flexDirection="column" justifyContent="flex-start">
          <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal" marginBottom={30}>
            {t('profile.Verification')}
          </BodyText>
          {displayProfilePhoneVerificationSheet && <SmsCodeForm isWrongCode={isError} handleCompletion={handleCompletion} onCompletion={setIsSubmitDisabled} inputTheme="my-info-big" />}
        </CustomRow>
      </CustomCard>

      {isError && (
        <BodyText textType="bodyText" size="N" fontWeight="R" font="Poppins" color="red" justifyContent="center" marginTop={12}>
          {t('profile.InvalidCode')}
        </BodyText>
      )}

      <CustomRow marginTop={64} marginBottom={32} justifyContent="center">
        <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal60" marginRight={5}>
          {t('profile.ReceiveVerification')}
        </BodyText>
        <CustomRow cursorPointer onClick={resendCode}>
          <BodyText textType="bodyText" size="N" font="Poppins" color="blue" fontWeight="M" cursorPointer>
            {t('profile.ResendCode')}
          </BodyText>
        </CustomRow>
      </CustomRow>

      {verificateAPIResult?.isLoading || editUserProfileDataResult?.isLoading || generateCodeAPIResult?.isLoading ? (
        <Loader />
      ) : (
        <CustomButton preset="primary" size="middleStretch" disabled={isSubmitDisabled} onClick={handleVerify}>
          {t('profile.Verify')}
        </CustomButton>
      )}
    </CustomSheet>
  );
};

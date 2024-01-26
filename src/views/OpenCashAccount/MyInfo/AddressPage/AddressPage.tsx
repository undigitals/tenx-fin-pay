import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToggle } from 'utils/hooks/useToggle';
import { ROUTES } from 'vars/const/ROUTES';
import { Form } from 'antd';
import { Loader } from 'components/general/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { useUSPSValidateAddressMutation } from 'store/api';
import { MyInfoHomeAddressModal } from 'components/general/Modals/MyInfoHomeAddressModal/MyInfoHomeAddressModal';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BodyText, Title } from 'components/general/Typography';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { SPageContainer } from 'views/OpenCashAccount/MyInfo/MyInfo.style';
import { IHomeAddressForm, IMyInfoEditFromVerify } from 'views/OpenCashAccount/MyInfo/MyInfo.type';
import { handleUSPSAddressCheckResult } from 'views/OpenCashAccount/MyInfo/MyInfo.helpers';
import { Header } from 'views/OpenCashAccount/MyInfo/Header/Header';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { AddressForm } from './AddressForm/AddressForm';

export const AddressPage = () => {
  const navigate = useNavigate();
  const [isCheckboxAgreed, setIsCheckboxAgreed] = useState(false);
  const location = useLocation() as IMyInfoEditFromVerify;
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const isEditing = location?.state?.isEditing;
  const nextPage = isEditing ? ROUTES.myInfoSummary.path : ROUTES.myInfoEmailUsername.path;
  const { getOnboardingDataIsLoading, saveOnboardingData, openingAccountData } = useCashAccountOpening();
  const [checkAddress, checkAddressResult] = useUSPSValidateAddressMutation();
  const [isContinueActive, setIsContinueActive] = useState(false);
  const addressCheckModal = useToggle();
  const handledAddressCheckResult = handleUSPSAddressCheckResult(checkAddressResult.data);
  const isLoading = checkAddressResult?.isLoading || getOnboardingDataIsLoading;

  const [isAddressConfirm, setIsAddressConfirm] = useState(false);

  const handleSubmit = async (values: IHomeAddressForm) => {
    form
      .validateFields()
      .then(() => {
        setIsContinueActive(true);
      })
      .catch(() => {
        setIsContinueActive(false);
      });

    await checkAddress?.({
      address: `${values?.address}`,
      address2: values?.address2,
      zip: values?.zipCode,
      city: values?.city,
      state: values?.stateProvince,
    });
  };

  const handleChangeAgree = () => {
    if (!isCheckboxAgreed) {
      form.setFieldValue('mailingAddress1', '');
      form.setFieldValue('mailingAddress2', '');
      form.setFieldValue('mailingCity', '');
      form.setFieldValue('mailingState', '');
      form.setFieldValue('mailingPostalCode', '');
    }
    setIsCheckboxAgreed((preVal) => !preVal);
  };

  const handleKeepMineClick = () => {
    addressCheckModal.hide();
  };

  const handleModalTakeSuggested = () => {
    const formValues = form.getFieldsValue();

    const updatedAddress = {
      ...formValues,
      ...handledAddressCheckResult?.suggested,
      isMailingAddressTheSame: !formValues.mailingCheckbox,
    };
    setIsAddressConfirm(true);
    saveOnboardingData(updatedAddress);
    addressCheckModal.hide();
    navigate(nextPage);
  };

  useEffect(() => {
    const formValues = form.getFieldsValue();
    if (handledAddressCheckResult?.isError && !isAddressConfirm) {
      addressCheckModal.show();
    }
    if (handledAddressCheckResult?.isSuccess) {
      let addressData = { ...formValues };
      if (!formValues.mailingCheckbox) {
        addressData = {
          ...formValues,
          mailingAddress1: formValues.address,
          mailingAddress2: formValues.address2,
          mailingCity: formValues.city,
          mailingState: formValues.stateProvince,
          mailingPostalCode: formValues.zipCode,
        };
      }
      saveOnboardingData({
        ...addressData,
        isMailingAddressTheSame: !formValues.mailingCheckbox,
        currentUrl: nextPage,
      });
      setIsAddressConfirm(false);
      navigate(nextPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handledAddressCheckResult?.isSuccess, handledAddressCheckResult?.isError]);

  useEffect(() => {
    if (openingAccountData.isMailingAddressTheSame !== undefined) {
      setIsCheckboxAgreed(!openingAccountData.isMailingAddressTheSame);
    } else {
      setIsCheckboxAgreed(false);
    }
  }, []);

  return (
    <SPageContainer>
      {isLoading && <Loader />}
      <div>
        {isEditing ? (
          <>
            <Title textAlign="start" fontWeight="SB" size="M" font="Poppins" marginBottom={4}>
              {t('myInfo.HomeAddress')}
            </Title>
            <BodyText textType="bodyText" color="charcoal60" size="N" fontWeight="R" marginBottom={32} lineHeight={1.3}>
              {t('myInfo.ChangeYourHomeAddressHere')}
            </BodyText>
          </>
        ) : (
          <>
            <Header title={t('stepper.WhereDoYouLive')} stage="Address" marginTop={5} marginBottom={28} />
            <BodyText textType="bodyText" color="charcoal60" size="N" fontWeight="R" paddingTop={20} paddingRight={5} marginBottom={32} lineHeight={1.3}>
              {t('myInfo.WeRequiredToVerify')}
            </BodyText>
          </>
        )}
        <AddressForm handleSubmit={handleSubmit} onCompletion={setIsContinueActive} form={form} isCheckboxAgreed={isCheckboxAgreed} handleChangeAgree={handleChangeAgree} isEditMode={isEditing} />
      </div>

      <CustomRow flexDirection="column" paddingTop={16}>
        <CustomButton size="large" disabled={!isContinueActive} onClick={form.submit} marginBottom={24} preset="primary-with-outline">
          {t(isEditing ? 'myInfo.SaveChanges' : 'myInfo.Continue')}
        </CustomButton>

        <BodyText textType="bodyText" fontWeight="M" size="T" color="charcoal70" textAlign="end" marginBottom={16} className="next-step" extraStyles={{ alignSelf: 'flex-end' }}>
          {t('accountOpening.NextStep')} {t('stepper.Email')}
        </BodyText>
      </CustomRow>

      <MyInfoHomeAddressModal
        isModalVisible={addressCheckModal.isActive}
        onClose={addressCheckModal.hide}
        errorType={handledAddressCheckResult?.errorType}
        errors={handledAddressCheckResult?.errorMessages}
        onConfirmClick={handleModalTakeSuggested}
        onEditClick={handleKeepMineClick}
        suggested={handledAddressCheckResult?.suggested}
        addressForm={form}
      />
    </SPageContainer>
  );
};

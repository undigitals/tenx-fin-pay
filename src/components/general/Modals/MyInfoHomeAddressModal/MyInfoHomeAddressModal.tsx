import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { BodyText, Title } from 'components/general/Typography';
import { SIconClose, SMaskStyle } from 'components/theme/CustomModal/CustomModal.styles';
import { ADDRESS_CHECK_STATUS } from 'vars/const/address';
import { IHomeAddressForm } from 'views/OpenCashAccount/MyInfo/MyInfo.type';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import clsx from 'clsx';
import { MyInfoHomeAddressModalInputProps } from './MyInfoHomeAddressModal.type';
import { SContent, SWarningImage, SCustomButton, SAddressDataBlock } from './MyInfoHomeAddressModal.style';

type IAddressDataBlockProps = {
  title: string;
  originalValues: IHomeAddressForm;
  suggestedValues: IHomeAddressForm;
  original?: boolean;
};

function diffAddressPart(originalPart: string, suggestedPart: string, original: boolean): React.ReactNode {
  const ucOriginalPart = (originalPart || '').toUpperCase();
  const ucSuggestedPart = (suggestedPart || '').toUpperCase();
  if (ucOriginalPart === ucSuggestedPart) {
    return ucOriginalPart;
  }
  return <span className={clsx('diff', original ? 'original' : 'suggested')}>{original ? ucOriginalPart : ucSuggestedPart}</span>;
}

const AddressDataBlock = ({ title, originalValues, suggestedValues, original = false }: IAddressDataBlockProps) => {
  const addressParts = useMemo(() => {
    return {
      apt: diffAddressPart(originalValues.apt, suggestedValues.apt, original),
      address: diffAddressPart(originalValues.address, suggestedValues.address, original),
      address2: diffAddressPart(originalValues.address2, suggestedValues.address2, original),
      city: diffAddressPart(originalValues.city, suggestedValues.city, original),
      stateProvince: diffAddressPart(originalValues.stateProvince, suggestedValues.stateProvince, original),
      zipCode: diffAddressPart(originalValues.zipCode, suggestedValues.zipCode, original),
    };
  }, [originalValues, suggestedValues, original]);

  return (
    <SAddressDataBlock>
      <BodyText textType="bodyText" size="M" fontWeight="R" color="charcoal60" textAlign="center">
        {title}
      </BodyText>
      <BodyText textType="bodyText" size="M" fontWeight="M" color="charcoal" textAlign="center">
        {addressParts.apt ? <>{addressParts.apt} </> : ''}
        {addressParts.address}
      </BodyText>
      {addressParts.address2 && (
        <BodyText textType="bodyText" size="M" fontWeight="M" color="charcoal60" textAlign="center">
          {addressParts.address2}
        </BodyText>
      )}
      <BodyText textType="bodyText" size="M" fontWeight="M" color="charcoal60" textAlign="center" marginBottom={24}>
        {addressParts.city}, {addressParts.stateProvince} {addressParts.zipCode}
      </BodyText>
    </SAddressDataBlock>
  );
};

export const MyInfoHomeAddressModal: React.FC<MyInfoHomeAddressModalInputProps> = ({
  onClose,
  errorType,
  errors = [],
  onConfirmClick,
  onEditClick,
  isModalVisible,
  addressForm,
  suggested = {},
  isMailingAddress = false,
}) => {
  const formValues = addressForm.getFieldsValue();
  const originalValues = isMailingAddress
    ? {
        ...formValues,
        address: formValues.mailingAddress1,
        address2: formValues.mailingAddress2,
        city: formValues.mailingCity,
        stateProvince: formValues.mailingState,
        zipCode: formValues.mailingPostalCode,
      }
    : formValues;

  const suggestedValues = {
    ...formValues,
    ...suggested,
  };

  const { t } = useTranslation(undefined, { keyPrefix: 'myInfo' });

  return (
    <CustomModal topPosition={5} open={isModalVisible} centered onCancel={onClose} destroyOnClose footer={null} maskStyle={SMaskStyle} closeIcon={<SIconClose color="charcoal70" />}>
      <SContent>
        {errorType === ADDRESS_CHECK_STATUS.DPVCMRA && (
          <>
            <SWarningImage />
            <Title size="M" fontWeight="M" color="charcoal" marginTop={30} marginBottom={12}>
              {t(`address.provideHome`)}
            </Title>
            <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal60" marginBottom={32} lineHeight={1.5}>
              {t(`address.mailbox`)}
            </BodyText>
            <CustomButton preset="primary" size="large" onClick={onClose}>
              {t(`address.modify`)}
            </CustomButton>
          </>
        )}
        {errorType === ADDRESS_CHECK_STATUS.INVALID && (
          <>
            <SWarningImage />
            <Title size="M" textAlign="start" justifyContent="start" fontWeight="M" color="charcoal" marginTop={30} marginBottom={16}>
              {t(`address.invalid`)}
            </Title>
            {errors?.length ? (
              errors.map((error) => (
                <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal60" textAlign="start" justifyContent="start" marginBottom={12} lineHeight={1.5}>
                  {error}
                </BodyText>
              ))
            ) : (
              <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal60" textAlign="start" justifyContent="start" marginBottom={12} lineHeight={1.5}>
                {t(`address.provideValid`)}
              </BodyText>
            )}

            <CustomButton preset="primary" size="middleStretch" onClick={onClose} marginTop={25}>
              {t(`address.modify`)}
            </CustomButton>
          </>
        )}
      </SContent>
      {errorType === ADDRESS_CHECK_STATUS.WITH_SUGGESTIONS && (
        <>
          <Title size="M" textAlign="start" fontWeight="M" color="charcoal" marginTop={20} marginBottom={20}>
            {t(`address.incorrect`)}
          </Title>
          <BodyText textType="bodyText" size="M" fontWeight="R" color="charcoal60" marginBottom={24} lineHeight={1.5}>
            {t(`address.preferSuggestedOrOriginal`)}
          </BodyText>

          <AddressDataBlock title={t('address.original')} originalValues={originalValues} suggestedValues={suggestedValues} original />
          <AddressDataBlock title={t('address.suggested')} originalValues={originalValues} suggestedValues={suggestedValues} />

          <CustomRow justifyContent="space-between" gap={8}>
            <SCustomButton size="middle" onClick={onEditClick}>
              {t(`address.useOriginal`)}
            </SCustomButton>
            <SCustomButton preset="primary" size="middle" onClick={onConfirmClick}>
              {t(`address.confirmSuggested`)}
            </SCustomButton>
          </CustomRow>
        </>
      )}
    </CustomModal>
  );
};

import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import React, { ReactNode } from 'react';
import { cantOpenAccount } from 'assets/images';
import { BodyText, Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { IModalCommonProps } from 'views/Account/Summary/InternalTransfer/InternalTransferPage.types';

interface IClosingAccountModal extends IModalCommonProps {
  title: string;
  description: string | ReactNode;
}

export const ClosingAccountModal: React.FC<IClosingAccountModal> = ({ open, onClose, title, description }) => {
  const { t } = useTranslation();

  return (
    <CustomModal open={open} onClose={onClose} topPosition="-2%">
      <img src={cantOpenAccount} alt="close-account" height={127} width={119} style={{ alignSelf: 'center', marginBottom: 32 }} />

      <Title size="M" fontWeight="M" marginBottom={16}>
        {title}
      </Title>

      <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" font="Poppins" lineHeight={1.5} marginBottom={57}>
        {description}
      </BodyText>

      <CustomButton preset="primary-red" size="xl" onClick={onClose}>
        {t('accountInformation.BackToAccountInformation')}
      </CustomButton>
    </CustomModal>
  );
};

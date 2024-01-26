import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Title, BodyText } from 'components/general/Typography';
import { Loader } from 'components/general/Loader/Loader';
import { SMaskStyle } from 'components/theme/CustomModal/CustomModal.styles';
import { SList } from './TenxPlayWarningModal.styles';

interface ITenxPlayModal {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  isLoading: boolean;
}

export const TenxPlayWarningModal: React.FC<ITenxPlayModal> = ({ open, onClose, onContinue, isLoading = false }) => {
  const { t } = useTranslation();

  return (
    <CustomModal open={open} centered onCancel={onClose} destroyOnClose footer={null} maskStyle={SMaskStyle} topPosition="0" closeIconColor="charcoal70">
      {isLoading && <Loader />}
      <Title justifyContent="start" size="S" font="Poppins" marginBottom={16} marginTop={5}>
        {t('tenxPlays.AboutTitle')}
      </Title>

      <BodyText textType="bodyText" size="N" fontWeight="B" color="charcoal" justifyContent="start" marginBottom={8}>
        {t('tenxPlays.ReadBefore')}
      </BodyText>

      <SList>
        <li>
          <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" textAlign="start" marginBottom={4}>
            {t('tenxPlays.Read1')}
          </BodyText>
        </li>
        <li>
          <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" textAlign="start" marginBottom={4}>
            {t('tenxPlays.Read2')}
          </BodyText>
        </li>
        <li>
          <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" textAlign="start" marginBottom={4}>
            {t('tenxPlays.Read3')}
          </BodyText>
        </li>
      </SList>

      <CustomRow justifyContent="flex-end" gap={8} marginTop={32} extraStyles={{ flexWrap: 'wrap' }}>
        <CustomButton onClick={onClose} size="small">
          {t('tenxPlays.Cancel')}
        </CustomButton>
        <CustomButton preset="primary" onClick={onContinue} size="small">
          {t('tenxPlays.Continue')}
        </CustomButton>
      </CustomRow>
    </CustomModal>
  );
};

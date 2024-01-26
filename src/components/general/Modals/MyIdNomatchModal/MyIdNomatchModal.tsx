import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { Icon } from 'components/general/Icon/Icon';
import { Title } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';

interface IMyIdNomatchModalProps {
  onRetry: () => void;
  onContinue: () => void;
  onClose: () => void;
  open: boolean;
}
export const MyIdNomatchModal: React.FC<IMyIdNomatchModalProps> = ({ onRetry, onContinue, open, onClose }) => {
  const { t } = useTranslation();
  return (
    <CustomSheet isOpen={open} onClose={onClose} header={false} wrapperPadding={false} contentWrapperStyle={{ borderRadius: '0px' }} hasCloseIcon={false}>
      <CustomRow justifyContent="flex-start" marginBottom={32}>
        <Icon name="triangleWarning" cursorPointer onClick={onClose} />
        <Title font="DM Sans" color="charcoal" marginLeft={15} fontWeight="B" size="sM">
          {t('homeScreen.NotRecognized')}
        </Title>
      </CustomRow>
      <CustomRow justifyContent="center" marginTop={32}>
        <CustomButton onClick={onRetry} marginRight={8} size="middleAlt">
          {t('homeScreen.Retry')}
        </CustomButton>
        <CustomButton preset="primary" onClick={onContinue} size="middleAlt">
          {t('exitModal.Continue')}
        </CustomButton>
      </CustomRow>
    </CustomSheet>
  );
};

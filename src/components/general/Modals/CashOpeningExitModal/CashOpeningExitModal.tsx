import React from 'react';
import { useTranslation } from 'react-i18next';
import { BodyText, Title } from 'components/general/Typography';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { ROUTES } from 'vars/const/ROUTES';
import { useAppDispatch } from 'utils/hooks/store';
import { selectDisplayCashOpeningExitModal, setShowCashOpeningExitModal } from 'store/ui.slice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SModalContainer, SModalTextBlock, SCustomButton, SIconClose } from './CashOpeningExitModal.styles';

export const CashOpeningExitModal: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isModalVisible = useSelector(selectDisplayCashOpeningExitModal);

  const handleOnCancel = () => {
    dispatch(setShowCashOpeningExitModal(false));
  };

  const handleOnExit = (): void => {
    handleOnCancel();
    navigate(ROUTES.home.path);
  };

  return (
    <CustomModal open={isModalVisible} centered onCancel={handleOnCancel} destroyOnClose footer={null} closeIcon={<SIconClose name="closeCircle" />}>
      <SModalContainer>
        <SModalTextBlock>
          <Title size="M" color="charcoal" fontWeight="M" font="Poppins" marginBottom="spacing-med">
            {t('exitModal.Title')}
          </Title>
          <BodyText textType="bodyText" color="charcoal70" fontWeight="R" marginBottom="spacing-x-large" font="DM Sans" size="N" lineHeight={1.6}>
            {t('exitModal.Description')}
          </BodyText>
        </SModalTextBlock>
        <CustomRow>
          <SCustomButton onClick={handleOnExit} marginRight={8}>
            {t('exitModal.Exit')}
          </SCustomButton>
          <SCustomButton preset="primary" onClick={handleOnCancel}>
            {t('exitModal.Continue')}
          </SCustomButton>
        </CustomRow>
      </SModalContainer>
    </CustomModal>
  );
};

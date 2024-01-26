import React from 'react';
import { useTranslation } from 'react-i18next';
import { images } from 'assets';
import { BodyText, Title } from 'components/general/Typography';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { useAppDispatch } from 'utils/hooks/store';
import { useSelector } from 'react-redux';
import { selectDisplayComingSoonModal, setShowComingSoonModal } from 'store/ui.slice';
import { SComingSoonModalContainer, SModalTextBlock } from './MoveMoneyMainPage.style';

export const ComingSoonModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isOpen = useSelector(selectDisplayComingSoonModal);

  const handleOnClose = () => {
    dispatch(setShowComingSoonModal(false));
  };

  return (
    <CustomModal open={isOpen} closeIconColor="charcoal70" onClose={handleOnClose} topPosition="10%">
      <SComingSoonModalContainer>
        <img height="144px" src={images.transfer} alt="paymentSucceed" />
        <SModalTextBlock>
          <Title size="M" color="charcoal" fontWeight="M" font="Poppins" marginBottom="spacing-med" marginTop={36}>
            {t('moveMoney.Coming Soon')}
          </Title>
          <BodyText textType="bodyText" color="charcoal70" fontWeight="R" marginBottom="spacing-x-large" font="DM Sans" size="N">
            {t('moveMoneyOnboarding.Subtext')}
          </BodyText>
        </SModalTextBlock>
        <CustomButton preset="primary" onClick={handleOnClose}>
          {t('common.Close')}
        </CustomButton>
      </SComingSoonModalContainer>
    </CustomModal>
  );
};

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SMaskStyle } from 'components/theme/CustomModal/CustomModal.styles';
import { useAppDispatch } from 'utils/hooks/store';
import { selectEnrollModalData, setShowEnrollModal } from 'store/ui.slice';
import { selectSystemProperties } from 'store/user/authentication.slice';
import { useSelector } from 'react-redux';
import { BodyText, Title } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { images } from 'assets';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { formatPhone } from 'utils/helpers/phone';
import { SCustomModal, SLinkTel } from './EnrollModal.styles';

interface IEnrollEmail {
  state?: {
    email?: string;
  };
}

export const EnrollModal = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isOpen, email } = useSelector(selectEnrollModalData);
  const location = useLocation() as IEnrollEmail;
  const { supportPhoneNumber } = useSelector(selectSystemProperties);
  const supportTelVal = useMemo(() => `tel:${formatPhone(supportPhoneNumber)}`, [supportPhoneNumber]);

  const handleOnContinue = () => {
    dispatch(setShowEnrollModal({ isOpen: false }));
    navigate(ROUTES.emailVerification.path, { state: location?.state });
  };

  const titleMsg = email ? t('tenxPayEnroll.ErrorModal.UnableToSetUpBasedOnEmail', { email }) : t('tenxPayEnroll.ErrorModal.UnableToSetUpBasedOnInformation');

  const handleOnCancel = () => {
    dispatch(setShowEnrollModal({ isOpen: false }));
    navigate(ROUTES.home.path);
  };

  return (
    <SCustomModal open={isOpen} centered onCancel={handleOnCancel} destroyOnClose footer={null} maskStyle={SMaskStyle} closeIconColor="charcoal70" topPosition="9%">
      <div className="enrollModal enrollModalHeader">
        <img src={images.errorExclamationMarkImage} alt="errorEnroll" />
      </div>

      <div className="enrollModal">
        <Title fontWeight="M" size="M" marginBottom={16} textAlign="start" color="charcoal" font="Poppins" extraStyles={{ overflowWrap: 'anywhere' }}>
          {titleMsg}
        </Title>
        <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal60" marginBottom={25} textAlign="start">
          {t('tenxPayEnroll.ErrorModal.EmailAddressDoesNotMatch')}
        </BodyText>
        <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal60" marginBottom={32} textAlign="start">
          {t('tenxPayEnroll.ErrorModal.IfErrorContactUs')}
        </BodyText>
      </div>

      <div className="enrollModal enrollModalFooter">
        <CustomButton size="middle" marginRight={8}>
          <SLinkTel href={supportTelVal}>{t('tenxPayEnroll.ErrorModal.ContactUs')}</SLinkTel>
        </CustomButton>
        <CustomButton preset="primary" size="middle" onClick={handleOnContinue}>
          {t('tenxPayEnroll.ErrorModal.ChangeEmail')}
        </CustomButton>
      </div>
    </SCustomModal>
  );
};

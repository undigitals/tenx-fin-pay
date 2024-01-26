import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BodyText, Title } from 'components/general/Typography';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { Trans, useTranslation } from 'react-i18next';
import { images } from 'assets';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Icon } from 'components/general/Icon/Icon';
import { selectSystemProperties } from 'store/user/authentication.slice';
import { formatPhone } from 'utils/helpers/phone';

interface IProps {
  open: boolean;
}

export const ErrorModal: React.FC<IProps> = ({ open }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { supportPhoneNumber } = useSelector(selectSystemProperties);
  const supportTelVal = useMemo(() => `tel:${formatPhone(supportPhoneNumber)}`, [supportPhoneNumber]);

  const onCancel = () => {
    navigate(ROUTES.home.path);
  };

  return (
    <CustomModal open={open} centered onCancel={onCancel} destroyOnClose footer={null} closeIconColor="charcoal70" topPosition={0}>
      <CustomRow justifyContent="center" marginBottom={24}>
        <img src={images.cantOpenAccount} alt="Can't open account" width="120px" />
      </CustomRow>
      <Title size="M" fontWeight="M" textAlign="center" marginBottom={16}>
        {t("myInfo.We're sorry, we are unable to open an account for you at this time.")}
      </Title>
      <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="N" marginBottom={24} justifyContent="center" textAlign="center">
        <Trans i18nKey="accountOpening.NotAbleToVerifyYourIdentity" values={{ phone: supportPhoneNumber }} />
      </BodyText>
      <CustomRow justifyContent="center" flexDirection="column" marginBottom={8}>
        <Icon name="telephone" color="blue" />
        <a href={supportTelVal}>
          <BodyText textType="bodyText" marginTop={16} size="N" fontWeight="B" color="charcoal" cursorPointer>
            {supportPhoneNumber}
          </BodyText>
        </a>
      </CustomRow>
    </CustomModal>
  );
};

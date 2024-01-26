import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { selectSystemProperties } from 'store/user/authentication.slice';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { Title, BodyText } from 'components/general/Typography';
import { Icon } from 'components/general/Icon/Icon';
import { formatPhone } from 'utils/helpers/phone';
import { SLink } from './NeedSupportModal.styles';

interface INeedSupportModal {
  open: boolean;
  onClose: () => void;
}

export const NeedSupportModal: React.FC<INeedSupportModal> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { supportPhoneNumber } = useSelector(selectSystemProperties);
  const supportTelVal = useMemo(() => `tel:${formatPhone(supportPhoneNumber)}`, [supportPhoneNumber]);
  const supportText = i18next.t('helpSupport.callSupport', { phoneNumber: supportPhoneNumber });

  return (
    <CustomModal open={open} onCancel={onClose} topPosition="10%" display="flex" closeIconColor="charcoal70">
      <Title fontWeight="M" size="M" paddingBottom={24} font="Poppins">
        {t('helpSupport.needSupport')}
      </Title>

      <BodyText textType="bodyText" font="DM Sans" color="charcoal70" size="N" fontWeight="R" marginBottom={5} lineHeight={1.5} paddingRight={15}>
        {supportText}
      </BodyText>

      <SLink href={supportTelVal}>
        {supportPhoneNumber}
        <Icon name="telephone" color="blue" cursorPointer marginLeft={10} />
      </SLink>
    </CustomModal>
  );
};

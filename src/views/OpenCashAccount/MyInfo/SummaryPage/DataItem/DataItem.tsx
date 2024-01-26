import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { SEditIcon } from 'views/OpenCashAccount/MyInfo/MyInfo.style';
import { BodyText } from 'components/general/Typography';
import { SWrapper, SCustomRow } from './DataItem.styles';

interface IDataItem {
  editUrl?: string;
  name?: string;
  value?: string;
}

export const DataItem: React.FC<IDataItem> = ({ name, value, editUrl }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleIconClick = () => {
    if (editUrl) {
      navigate(editUrl, {
        state: {
          isEditing: true,
          backPage: ROUTES.myInfoSummary.path,
          editingModeHeaderTitle: t('header.Back to Account Confirmation'),
        },
      });
    }
  };

  return value && name ? (
    <SCustomRow marginBottom={16}>
      <SWrapper>
        <BodyText textType="bodyText" size="M" fontWeight="R" color="charcoal70" font="DM Sans" lineHeight={1.6}>
          {t(name)}
        </BodyText>
        <BodyText textType="bodyText" size="M" fontWeight="M" color="charcoal" font="DM Sans" paddingRight={100}>
          {t(value)}
        </BodyText>
      </SWrapper>

      <SEditIcon name="edit" color="blue" onClick={handleIconClick} cursorPointer size="smaller" />
    </SCustomRow>
  ) : null;
};

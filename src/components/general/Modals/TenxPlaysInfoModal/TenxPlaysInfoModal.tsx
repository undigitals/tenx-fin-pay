import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { generatePath, useLocation } from 'react-router-dom';
import { useAppDispatch } from 'utils/hooks/store';
import { useTranslation } from 'react-i18next';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { Title, BodyText } from 'components/general/Typography';
import { WELLNESS_FAQ_GROUP_ID } from 'vars/const/FAQ';
import { ROUTES } from 'vars/const/ROUTES';
import { selectDisplayPercPlaysInfoModal, setDisplayPercPlaysInfoModal } from 'store/ui.slice';
import { SListItem, SListItemText } from 'components/general/Modals/AdditionalInformationHandler/AdditionalInformationHandler.styles';

export const TenxPlaysInfoModal = () => {
  const isModalVisible = useSelector(selectDisplayPercPlaysInfoModal);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const handleNavigation = () => {
    dispatch(setDisplayPercPlaysInfoModal(false));
    const path = generatePath(ROUTES.helpAndSupport.path, { groupId: WELLNESS_FAQ_GROUP_ID });
    navigate(path, { state: { isFAQFromHomePage: pathname !== '/wellness' } });
  };

  const onCancel = () => dispatch(setDisplayPercPlaysInfoModal(false));

  return (
    <CustomModal open={isModalVisible} onCancel={onCancel} closeIconColor="charcoal70" topPosition="7%" className="tenxPlaysInfo" bodyStlye={{ overflowY: 'hidden' }}>
      <div className="tenxPlaysInfoHeader">
        <Title font="Poppins" color="charcoal" size="M" fontWeight="M" marginBottom={20} paddingBottom={5}>
          {t(`home.TenxPlaysPopUpTitle`)}
        </Title>
        <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="N" lineHeight={1.4}>
          {t(`home.TenxPlaysPopUpSubTitle`)}
        </BodyText>
      </div>

      <div className="tenxPlaysInfoBody">
        <BodyText textType="bodyText" color="charcoal" fontWeight="B" size="N" marginBottom={12}>
          {t(`home.TenxPlaysPopUpColonText`)}
        </BodyText>
        <SListItem className="tenxPlaysInfoListItem">
          <SListItemText className="tenxPlaysInfoListItemText">{t(`home.TenxPlaysPopUpListText_1`)}</SListItemText>
          <SListItemText>{t(`home.TenxPlaysPopUpListText_2`)}</SListItemText>
        </SListItem>
        <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="N" lineHeight={1.4} marginTop={10}>
          {t(`home.TenxPlaysPopUpBodyText`)}
          <BodyText textType="bodyText" color="blue" fontWeight="R" size="N" lineHeight={1.4} display="inline" onClick={handleNavigation} cursorPointer>
            {t(`home.TenxPlaysPopUpFAQ`)}.
          </BodyText>
        </BodyText>
      </div>
      <hr className="tenxPlaysInfoLine" />

      <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="N" lineHeight={1.4}>
        {t(`home.TenxPlaysPopUpFooterText`)}
      </BodyText>
    </CustomModal>
  );
};

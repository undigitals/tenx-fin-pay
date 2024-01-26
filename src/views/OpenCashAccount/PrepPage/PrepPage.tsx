import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'vars/const/ROUTES';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { Title, BodyText } from 'components/general/Typography';
import { ListItem } from './ListItem/ListItem';
import { SListItemText, SLayout } from './PrepPage.styles';

export const PrepPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleButtonClick = () => {
    navigate(ROUTES.myInfoDisclosures.path);
  };

  const handleLinkClick = () => {
    navigate(ROUTES.home.path);
  };

  return (
    <SLayout>
      <Title font="Poppins" size="M" color="charcoal" fontWeight="SB" lineHeight={1.2} paddingTop={2} paddingRight={60}>
        {t(`prepPage.AreYouReadyToOpenCashAccount?`)}
      </Title>
      <BodyText font="DM Sans" textType="bodyText" color="charcoal70" fontWeight="R" size="N" marginBottom={32} marginTop={13} className="prep-page-subtitle">
        {t(`prepPage.OpeningAccountWillTakeLessThan10Minutes`)}
      </BodyText>
      <BodyText font="DM Sans" textType="bodyText" fontWeight="B" size="M" color="charcoal" marginBottom={18} marginTop={36}>
        {t(`prepPage.YoullNeed`)}:
      </BodyText>
      <div className="list-item">
        <ListItem size="N" text="prepPage.YourNameDateOfBirthHomeAddess(no P.o. boxes)AndEmail" marginTop={19} />
        <ListItem size="N" text="prepPage.YourSocialSecurityNumber(SSN)OrIndividualTaxpayerIdentificationNumber(ITIN)" marginTop={19} />
        <ListItem size="N" text="prepPage.YourValidUnexpiredPhotoIDOptionsInclude" marginTop={19} />
      </div>
      <div className="list-item-text">
        <SListItemText>{t(`prepPage.U.S. Passport`)}</SListItemText>
        <SListItemText>{t(`prepPage.U.S. State Driver’s License`)}</SListItemText>
        <SListItemText>{t(`prepPage.U.S. State ID`)}</SListItemText>
        <SListItemText>{t(`prepPage.U.S. Permanent Resident Card`)}</SListItemText>
        <SListItemText>{t(`prepPage.Non-U.S. Passport`)}</SListItemText>
      </div>

      <BodyText font="DM Sans" textType="bodyText" fontWeight="B" size="N" color="charcoal" marginBottom={24} marginTop={41} paddingRight={5} lineHeight={1.4}>
        {t(`prepPage.WellReviewYourPersonalInformationYouNeedToTakePictureOfYourIdAndSelfie`)}
      </BodyText>

      <CustomButton preset="primary" onClick={handleButtonClick} marginBottom={24} marginTop={81}>
        {t(`myInfo.Continue`)}
      </CustomButton>

      <BodyText font="Poppins" textType="bodyText" fontWeight="M" size="N" color="blue" marginBottom={30} onClick={handleLinkClick} justifyContent="center">
        {t(`prepPage.Open an Account Later`)}
      </BodyText>

      <BodyText font="DM Sans" textType="bodyText" fontWeight="R" size="T" color="charcoal70" marginBottom={70} lineHeight={1.3}>
        {t(`prepPage.TenxGroupInc`)}
      </BodyText>
    </SLayout>
  );
};

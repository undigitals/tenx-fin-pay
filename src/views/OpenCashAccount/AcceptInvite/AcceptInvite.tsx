import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { images } from 'assets';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'utils/hooks/useToggle';
import { ConsentId, ConsentType } from 'components/general/Consent/Consents.types';
import { areEqualUsers, USER_PROFILE_IDS } from 'vars/const/USER_PROFILE_IDS';
import { ROUTES } from 'vars/const/ROUTES';
import { useConsents } from 'utils/hooks/useConsents';
import { IConsentData } from 'store/user/consents/consents.types';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { ConsentSheet } from 'components/general/Consent/ConsentSheet';
import { Title, BodyText } from 'components/general/Typography';
import { selectCurrentAuthState } from 'store/user/authentication.slice';
import { useProperties } from 'utils/hooks/useProperties';
import { useDeclineJointAccountHolderMutation, useJointAccountHolderInvitesQuery, useAcceptJointAccountHolderMutation, useAddJointAccountHolderMutation } from 'store/user/accounts/accounts.api';
import { ListItem } from './ListItem/ListItem';
import { SArrowRight, SButtonContentWrapper } from './AcceptInvite.styles';
import { ResponseModal } from './ResponseModal/ResponseModal';

export const AcceptInvite: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { inviteId } = useParams();
  const consentSheetToggler = useToggle();
  const responseToggler = useToggle();
  const [responseIsSuccess, setResponseIsSuccess] = useState(false);
  const currentUser = useSelector(selectCurrentAuthState);
  const otherConsents = useConsents(ConsentType.OTHERS);
  const { setProperty } = useProperties();
  const consentData = otherConsents?.consentsData?.find((item) => item?.id === ConsentId.ESIGN_CONSENT) ?? ({} as IConsentData);

  const invites = useJointAccountHolderInvitesQuery(inviteId || '');
  const [declineJointAccountHolderAPI] = useDeclineJointAccountHolderMutation();
  const [acceptJointAccountHolderAPI, acceptJointAccountHolderAPIResult] = useAcceptJointAccountHolderMutation();
  const [addJointAccountHolderAPI, addJointAccountHolderAPIResult] = useAddJointAccountHolderMutation();

  const isClient = areEqualUsers(currentUser?.user?.systemProfileId ?? '', USER_PROFILE_IDS.CLIENT_ccc);
  const isProspect = areEqualUsers(currentUser?.user?.systemProfileId ?? '', USER_PROFILE_IDS.PROSPECT_fd3);

  const handleAcceptJointAccountHolder = () => {
    acceptJointAccountHolderAPI({ inviteId });
  };

  const handleAddJointAccountHolder = () => {
    addJointAccountHolderAPI({ inviteId });
  };

  const handleLaterClick = () => {
    navigate(-1);
  };

  const handleClose = () => {
    responseToggler.hide();
    navigate(ROUTES.home.path);
  };

  const handleDeclineClick = () => {
    declineJointAccountHolderAPI(inviteId || '');
  };

  const handleButtonClick = async () => {
    consentSheetToggler.show();

    if (isClient) {
      if (invites.data?.isPrimaryOwner === false) {
        consentSheetToggler.show();
      } else {
        handleAddJointAccountHolder();
      }
    }

    if (isProspect) {
      await setProperty({
        propertyName: 'CAOType',
        value: invites.data?.isPrimaryOwner === true ? 'JointOwner' : 'Joint',
      });
      navigate(ROUTES.myInfoDisclosures.path);
    }
  };

  useEffect(() => {
    setResponseIsSuccess(acceptJointAccountHolderAPIResult.isSuccess);
    responseToggler.show();
  }, [acceptJointAccountHolderAPIResult.isError, acceptJointAccountHolderAPIResult.isSuccess]);

  useEffect(() => {
    setResponseIsSuccess(addJointAccountHolderAPIResult.isSuccess);
    responseToggler.show();
  }, [addJointAccountHolderAPIResult.isError, addJointAccountHolderAPIResult.isSuccess]);

  return (
    <>
      <Title font="Poppins" size="M" color="charcoal" fontWeight="SB" lineHeight={1.2} paddingTop={2}>
        {t(`prepPage.BeenInvited`)} {invites.data?.firstName} {t(`prepPage.ToBeACoOwner`)}
      </Title>
      <BodyText font="DM Sans" textType="bodyText" color="charcoal70" fontWeight="R" size="N" marginBottom={32} marginTop={13}>
        {t(`prepPage.LessThanMinute`)}
      </BodyText>
      <CustomRow justifyContent="center" marginBottom={32} marginTop={34}>
        <img src={images.sharedAccount} alt="sharedAccount" />
      </CustomRow>

      <BodyText font="DM Sans" textType="bodyText" fontWeight="B" size="M" color="charcoal" marginBottom={18}>
        {t(`prepPage.AsAJointAccountholder`)}:
      </BodyText>

      <ListItem size="N" text="prepPage.BeCoOwnerOfCashAccount" IconName="refer" marginTop={16} />
      <ListItem size="N" text="prepPage.HaveYourOwnDebitCard" IconName="creditCard" marginTop={16} />
      <ListItem size="N" text="prepPage.BeCoOwnerOfNeedsGoals" IconName="cash" marginTop={16} />

      <BodyText font="DM Sans" textType="bodyText" fontWeight="R" size="T" color="charcoal70" marginBottom={40} marginTop={30} lineHeight={1.3}>
        {t(`prepPage.TenxGroupInc`)}
      </BodyText>

      <CustomButton preset="primary" onClick={handleButtonClick} marginBottom={24}>
        <SButtonContentWrapper>
          {t(`prepPage.BeginOpeningJointAccount`)} <SArrowRight />
        </SButtonContentWrapper>
      </CustomButton>

      <CustomButton onClick={handleLaterClick} marginBottom={24}>
        <SButtonContentWrapper>{t(`prepPage.JoinLater`)}</SButtonContentWrapper>
      </CustomButton>

      <BodyText font="Poppins" textType="bodyText" fontWeight="M" size="N" color="blue" marginBottom={18} onClick={handleDeclineClick} justifyContent="center">
        {t(`prepPage.Decline`)}
      </BodyText>

      <ConsentSheet consentData={consentData} isOpen={consentSheetToggler.isActive} onClose={consentSheetToggler.hide} onAccepted={handleAcceptJointAccountHolder} isReadonly />
      <ResponseModal navPath={ROUTES.home.path} isSuccess={responseIsSuccess} open={responseToggler.isActive} onClose={handleClose} />
    </>
  );
};

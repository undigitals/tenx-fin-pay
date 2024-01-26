import React, { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { images } from 'assets';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { BodyText, Title } from 'components/general/Typography';
import { ROUTES } from 'vars/const/ROUTES';
import { SResultPageContainer, SCircle, SIconMail } from 'views/OpenCashAccount/MyInfo/MyInfo.style';
import { Icon } from 'components/general/Icon/Icon';
import { selectSystemProperties } from 'store/user/authentication.slice';
import { formatPhone } from 'utils/helpers/phone';
import { Trans, useTranslation } from 'react-i18next';

type TStatusType = 'unable' | 'invalid' | 'piiFailure' | 'documentFailure' | 'tryAgain';

type ILocationState = {
  verificationStatus?: TStatusType;
};

const TOP_IMG_MAP: Record<TStatusType, string> = {
  unable: images.cantOpenAccount,
  invalid: images.sandClock,
  piiFailure: images.sandClock,
  documentFailure: images.sandClock,
  tryAgain: images.sandClock,
};

export const VerificationStatusPage = () => {
  const { state }: { state?: ILocationState } = useLocation();
  const navigate = useNavigate();
  const verificationStatus = state?.verificationStatus ?? 'invalid';
  const isUnable = verificationStatus === 'unable';
  const isInvalid = verificationStatus === 'invalid';
  const isPiiFailure = verificationStatus === 'piiFailure';
  const isDocumentFailure = verificationStatus === 'documentFailure';
  const isTryAgain = verificationStatus === 'tryAgain';
  const { supportPhoneNumber } = useSelector(selectSystemProperties);
  const supportTelVal = useMemo(() => `tel:${formatPhone(supportPhoneNumber)}`, [supportPhoneNumber]);
  const { t } = useTranslation();

  return (
    <SResultPageContainer>
      <img src={TOP_IMG_MAP[verificationStatus]} alt="verification" />

      <Title size="M" fontWeight="M" textAlign="center" marginTop={24} marginBottom={16}>
        {isInvalid && t('myInfo.Oops, some of your information is incorrect.')}
        {isUnable && t("myInfo.We're sorry, we are unable to open an account for you at this time.")}
        {isPiiFailure && t('myInfo.WeNeedAdditionalInformation')}
        {isDocumentFailure && t('myInfo.UnableToVerifyDocumentTitle')}
        {isTryAgain && t('myInfo.PleaseTryAgain')}
      </Title>

      <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="N" marginBottom={33} justifyContent="center" textAlign="center" lineHeight={1.6}>
        {isInvalid && t('myInfo.Please go back to the verification summary to verify your information and update accordingly.')}
        {isUnable && <Trans i18nKey="myInfo.SorryUnableToOpenAccount" values={{ phone: supportPhoneNumber }} />}
        {isPiiFailure && t('myInfo.VerifyError')}
        {isDocumentFailure && t('myInfo.UnableToVerifyDocumentDescription')}
        {isTryAgain && t('myInfo.PleaseTryAgainDescription')}
      </BodyText>

      {isUnable && (
        <>
          <Icon name="telephone" color="blue" />
          <a href={supportTelVal} className="tel-link">
            <BodyText textType="bodyText" marginTop={16} size="N" fontWeight="B" color="charcoal" cursorPointer>
              {supportPhoneNumber}
            </BodyText>
          </a>
        </>
      )}

      {(isPiiFailure || isDocumentFailure) && (
        <>
          <SCircle>
            <SIconMail name="envelope" color="blue" />
          </SCircle>
          <BodyText textType="bodyText" marginTop={16} size="N" fontWeight="B" color="charcoal" textAlign="center" lineHeight={1.6}>
            {t(`myInfo.PleaseCheckYourEmail`)}
          </BodyText>
          <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" textAlign="center" lineHeight={1.6}>
            {t(`myInfo.SeeTheStatus`)}
          </BodyText>
          <CustomButton preset="primary" onClick={() => navigate(ROUTES.home.path)} marginTop={32}>
            {t(`myInfo.GoHome`)}
          </CustomButton>
        </>
      )}

      {isTryAgain && (
        <CustomRow>
          <CustomButton preset="primary" size="middleStretch" onClick={() => navigate(ROUTES.myId.path)} marginRight={32}>
            {t(`myInfo.TryAgain`)}
          </CustomButton>
          <CustomButton preset="primary" size="middleStretch" onClick={() => navigate(ROUTES.home.path)}>
            {t(`myInfo.GoHome`)}
          </CustomButton>
        </CustomRow>
      )}

      {isInvalid && (
        <CustomButton preset="primary" onClick={() => navigate(ROUTES.myInfoSummary.path)}>
          {t(`myInfo.Go back to verification summary`)}
        </CustomButton>
      )}

      {(isInvalid || isUnable) && (
        <Link to={ROUTES.home.path}>
          <BodyText textType="bodyText" cursorPointer marginTop={24} size="N" fontWeight="SB" color="blue">
            {t(`myInfo.Exit`)}
          </BodyText>
        </Link>
      )}
    </SResultPageContainer>
  );
};

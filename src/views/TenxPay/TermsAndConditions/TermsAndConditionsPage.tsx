import React, { useEffect, useState } from 'react';
import { setShowEnrollModal } from 'store/ui.slice';
import { useAppDispatch } from 'utils/hooks/store';
import { useNavigate } from 'react-router-dom';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { useLazyGetEulaPolicyQuery, useUpdateConsentByPolicyMutation } from 'store/user/users.api';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { BodyText, Title } from 'components/general/Typography';
import { ROUTES } from 'vars/const/ROUTES';
import { Loader } from 'components/general/Loader/Loader';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { Icon } from 'components/general/Icon/Icon';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { Checkbox } from 'components/general/Checkbox/Checkbox';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from 'views/Main/Header/Breadcrumbs/Breadcrumbs';
import { TBreadcrumbsPath } from 'vars/types/menu.types';
import { TermStatus } from './TermsStatus/TermStatus';
import { SFooter, SMediaLayout, SLayout } from './TermsAndConditionsPage.styles';

export const TermsAndConditionsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isDesktopSize } = useDeviceDimension();
  const { t } = useTranslation();

  const [policyId, setPolicyId] = useState('');
  const [policyText, setPolicyText] = useState('');
  const [isCheckboxAgreed, setIsCheckboxAgreed] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [getEulaPolicyAPI, { isFetching }] = useLazyGetEulaPolicyQuery();
  const [updateConsentAPI, updateConsentAPIResult] = useUpdateConsentByPolicyMutation();

  const handleAcceptTerms = async () => {
    await updateConsentAPI(policyId);
    setIsSheetOpen(false);
  };

  const handleChangeAgree = () => {
    setIsCheckboxAgreed(!isCheckboxAgreed);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  const getEulaPolicy = async () => {
    const policy = await getEulaPolicyAPI().unwrap();

    setPolicyText(policy.text);
    setPolicyId(policy.id);
  };

  const handleContinueClick = () => {
    navigate(ROUTES.accountApproved.path, { state: { backPage: ROUTES.home.path } });
  };

  const handleTermsClick = () => {
    setIsSheetOpen(true);
  };

  useEffect(() => {
    if (updateConsentAPIResult.isSuccess) {
      setIsAccepted(true);
      setIsDisabled(false);
    }

    if (updateConsentAPIResult.isError) {
      dispatch(setShowEnrollModal({ isOpen: true }));
    }
  }, [updateConsentAPIResult]);

  useEffect(() => {
    getEulaPolicy();
  }, []);

  const pathList: TBreadcrumbsPath[] = [
    { id: 0, name: ROUTES.home.title, path: ROUTES.home.path },
    { id: 1, name: t('header.Tenx Pay') },
  ];

  return (
    <>
      {isDesktopSize && <Breadcrumbs paths={pathList} title={t('tenxPayHome.Tenx Pay')} hasBackNav />}
      <SLayout isDesktopSize={isDesktopSize}>
        <CustomRow flexDirection="column" alignItems="inherit" minHeight="100%" justifyContent={isDesktopSize ? 'center' : 'space-between'} width={isDesktopSize ? '50%' : 'auto'}>
          <SMediaLayout>
            {!isDesktopSize && (
              <CustomRow justifyContent="flex-start" marginBottom={32}>
                <Title color="charcoal" size={isDesktopSize ? 'sL' : 'S'} fontWeight="SB" font="Poppins">
                  {t('enrollTermsAndConditions.Tenx Pay')}
                </Title>
              </CustomRow>
            )}

            <Title color="charcoal" size="S" fontWeight={isDesktopSize ? 'SB' : 'M'} marginBottom={isDesktopSize ? 18 : 4} font="Poppins" onClick={() => setIsSheetOpen(true)}>
              {t('enrollTermsAndConditions.Please read and agree to our Terms and Conditions')}
            </Title>

            <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" font="DM Sans" marginBottom={32} marginTop={15}>
              {t("enrollTermsAndConditions.You'll find the option to agree at the end of the text. In order to proceed with the process, you must agree to the Terms and Conditions.")}
            </BodyText>

            <TermStatus isAgreed={isAccepted} onClick={handleTermsClick} />
          </SMediaLayout>

          <CustomSheet
            title={t('enrollTermsAndConditions.Terms And Conditions')}
            isOpen={isSheetOpen}
            onClose={handleCloseSheet}
            width={isDesktopSize ? '50%' : '100%'}
            maxHeight={isDesktopSize ? '65%' : '90%'}
            modalBottom={isDesktopSize ? '150px' : '0'}
            borderRadius={isDesktopSize ? '20px' : '20px 20px 0 0'}
            footer={
              <SFooter flexDirection="column" alignItems="flex-start">
                <Checkbox id="eConsent-checkbox" checked={isCheckboxAgreed} onChange={handleChangeAgree}>
                  <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" font="DM Sans">
                    {t('enrollTermsAndConditions.I have read the Website and Mobile Application Terms of Use set forth above and I accept them.')}
                  </BodyText>
                </Checkbox>
                <CustomButton size="large" disabled={!isCheckboxAgreed} onClick={handleAcceptTerms} marginTop={24}>
                  {t('enrollTermsAndConditions.Accept')}
                </CustomButton>
              </SFooter>
            }
            footerStyle={{ position: 'sticky', bottom: 0, background: 'white' }}
          >
            {isFetching ? <Loader /> : <div dangerouslySetInnerHTML={{ __html: policyText }} />}
          </CustomSheet>

          <CustomRow justifyContent={isDesktopSize ? 'center' : 'space-between'}>
            <CustomButton onClick={handleContinueClick} disabled={isDisabled} marginTop={30} marginBottom={32} width={isDesktopSize ? '50%' : '100%'}>
              {t('enrollTermsAndConditions.Continue')}
              <Icon marginLeft={20} color={isDisabled ? 'charcoal40' : 'blue'} name="chevronRight" size="smallest" cursorPointer />
            </CustomButton>
          </CustomRow>
        </CustomRow>
      </SLayout>
    </>
  );
};

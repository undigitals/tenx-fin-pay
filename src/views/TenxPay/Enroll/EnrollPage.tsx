import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setShowEnrollModal } from 'store/ui.slice';
import { selectImmediateId } from 'store/user/authentication.slice';
import { Loader } from 'components/general/Loader/Loader';
import { getBackendErrorData } from 'utils/helpers/rtqErrorHandling';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { useEnrollMutation, useLazyGetCurrentUserQuery, useLazyGetThirdPartyIdsQuery, useGetIsEmailVerifiedQuery } from 'store/user/users.api';
import { ROUTES } from 'vars/const/ROUTES';
import { API_RESPONSE_CODES } from 'vars/const/API_CODES';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Header } from 'views/Main/Header/Header';
import { images } from 'assets';
import { BodyText } from 'components/general/Typography';
import { Breadcrumbs } from 'views/Main/Header/Breadcrumbs/Breadcrumbs';
import { TBreadcrumbsPath } from 'vars/types/menu.types';
import { useTranslation, Trans } from 'react-i18next';
import { Card } from './Card/Card';
import { EnrollHeader } from './EnrollHeader/EnrollHeader';
import { ListItem } from './ListItem/ListItem';
import { SLayout } from './EnrollPage.styles';

export const EnrollPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isDesktopSize } = useDeviceDimension();
  const isEmailVerifiedQuery = useGetIsEmailVerifiedQuery();
  const [getCurrentUser, getCurrentUserAPIResult] = useLazyGetCurrentUserQuery();
  const [enrollAPI, enrollAPIResult] = useEnrollMutation();
  const [getThirdPartyIds, getThirdPartyIdsResult] = useLazyGetThirdPartyIdsQuery();
  const immediateId = useSelector(selectImmediateId);

  const isLoading = isEmailVerifiedQuery.isLoading || getCurrentUserAPIResult?.isFetching || getThirdPartyIdsResult.isLoading || getThirdPartyIdsResult.isFetching || enrollAPIResult.isLoading;

  useEffect(() => {
    getCurrentUser();
    getThirdPartyIds();
  }, []);

  useEffect(() => {
    if (enrollAPIResult?.isSuccess) {
      getThirdPartyIds()
        .unwrap()
        .then(() => {
          navigate(ROUTES.termsAndConditions.path);
        })
        .catch(() => {
          navigate(ROUTES.termsAndConditions.path);
        });
    }

    if (enrollAPIResult?.isError && getBackendErrorData(enrollAPIResult.error)?.Code === API_RESPONSE_CODES.GET_PROFILE_ERROR) {
      dispatch(setShowEnrollModal({ isOpen: true, email: getCurrentUserAPIResult?.data?.email }));
    }
  }, [enrollAPIResult?.isSuccess, enrollAPIResult?.isError]);

  const handleEnrollClick = async () => {
    const email = getCurrentUserAPIResult?.data?.email;

    if (email && isEmailVerifiedQuery.data) {
      await enrollAPI({ email });

      if (enrollAPIResult?.isSuccess) {
        getThirdPartyIds()
          .unwrap()
          .then(() => {
            navigate(ROUTES.termsAndConditions.path);
          })
          .catch(() => {
            navigate(ROUTES.termsAndConditions.path);
          });
      }

      if (enrollAPIResult?.isError) {
        dispatch(setShowEnrollModal({ isOpen: true, email }));
      }
    } else if (!isEmailVerifiedQuery.data || !email) {
      navigate(ROUTES.emailVerification.path, { state: {} });
    }
  };

  if (isDesktopSize) {
    const pathList: TBreadcrumbsPath[] = [
      { id: 0, name: ROUTES.home.title, path: ROUTES.home.path },
      { id: 1, name: t('header.Tenx Pay') },
    ];
    return (
      <div>
        <Breadcrumbs paths={pathList} title={t('tenxPayHome.Tenx Pay')} />
        <Header image={images.enrollPayPeriod} isFullWidth>
          <EnrollHeader />
        </Header>
        <CustomRow justifyContent="center" marginBottom={52}>
          <Card
            title={t(`tenxPayEnroll.Things to Know about Tenx Pay`)}
            handleEnrollClick={handleEnrollClick}
            list={[
              <Trans i18nKey="tenxPayEnroll.Tenx Pay is not a loan ..." />,
              <Trans i18nKey="tenxPayEnroll.Hour and wage information is provided ..." />,
              <Trans i18nKey="tenxPayEnroll.You can get your money ..." />,
              <Trans i18nKey="tenxPayEnroll.You can make up to 4 requests ..." />,
              <>
                <Trans i18nKey="tenxPayEnroll.The fee is paid as part ..." />
                <br />
                {t(`tenxPayEnroll.For example if you request ...`)}
              </>,
              <Trans i18nKey="tenxPayEnroll.As a reminder, the Early Access Fee ..." />,
            ]}
          />
        </CustomRow>
      </div>
    );
  }

  return (
    <SLayout>
      {isLoading && <Loader />}
      <EnrollHeader title={t(`tenxPayEnroll.Tenx Pay`)} />

      <CustomRow marginTop={40} marginBottom={40} justifyContent="center">
        <img alt="enrollPic" src={images.enrollPayPeriod} height={180} />
      </CustomRow>

      <BodyText font="Poppins" color="charcoal" marginTop={32} marginBottom={32} fontWeight="SB" size="M" textType="bodyText">
        {t(`tenxPayEnroll.Things to Know about Tenx Pay`)}
      </BodyText>

      <ListItem>
        <Trans i18nKey="tenxPayEnroll.Tenx Pay is not a loan ..." />
      </ListItem>
      <ListItem>
        <Trans i18nKey="tenxPayEnroll.Hour and wage information is provided ..." />
      </ListItem>
      <ListItem>
        <Trans i18nKey="tenxPayEnroll.You can get your money ..." />
      </ListItem>
      <ListItem>
        <Trans i18nKey="tenxPayEnroll.You can make up to 4 requests ..." />
      </ListItem>
      <ListItem>
        <Trans i18nKey="tenxPayEnroll.The fee is paid as part ..." />
        <br />
        {t(`tenxPayEnroll.For example if you request ...`)}
      </ListItem>
      <ListItem>
        <Trans i18nKey="tenxPayEnroll.As a reminder, the Early Access Fee ..." />
      </ListItem>

      {!immediateId && (
        <CustomRow marginTop={45}>
          <CustomButton preset="primary" onClick={handleEnrollClick}>
            {t(`tenxPayEnroll.Start Enrollment`)}
          </CustomButton>
        </CustomRow>
      )}
    </SLayout>
  );
};

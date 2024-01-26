import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { useSelector } from 'react-redux';
import { ROUTES } from 'vars/const/ROUTES';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { handleError } from 'utils/helpers/errorHelper';
import { getEmailRules } from 'utils/helpers/validationRules';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGenerateCodeEmailMutation } from 'store/user/authentication.api';
import { useLazyGetCurrentUserQuery } from 'store/user/users.api';
import { selectCurrentUser, selectIsEmailVerifiedOrAbsent } from 'store/user/authentication.slice';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { BodyText, Title } from 'components/general/Typography';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { CustomRequiredLabel } from 'components/theme/CustomRequiredLabel/CustomRequiredLabel';
import { useTranslation } from 'react-i18next';
import { Loader } from 'components/general/Loader/Loader';
import { Breadcrumbs } from 'views/Main/Header/Breadcrumbs/Breadcrumbs';
import { TBreadcrumbsPath } from 'vars/types/menu.types';
import { SubmitButtom } from './SubmitButtom/SubmitButton';
import { SLayout } from './EmailVerificationPage.styles';

interface IEmailVerification {
  state?: {
    email?: string;
  };
}

export const EmailVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDesktopSize } = useDeviceDimension();
  const currentUser = useSelector(selectCurrentUser);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [generateCodeEmailAPI, generateCodeEmailAPIResult] = useGenerateCodeEmailMutation();
  const [getCurrentUser, getCurrentUserResult] = useLazyGetCurrentUserQuery();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const location = useLocation() as IEmailVerification;
  const triedEmail = location?.state?.email;
  const isUserEmailVerified = useSelector(selectIsEmailVerifiedOrAbsent);

  const handleOnFinish = async () => {
    await generateCodeEmailAPI({ email: form.getFieldValue('email') });
  };

  const onFieldsChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    const isEmailEmpty = form.getFieldValue('email') === '';
    if (!isEmailEmpty && !hasErrors) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (generateCodeEmailAPIResult?.isSuccess) {
      navigate(ROUTES.verificationCode.path, { state: { email: form.getFieldValue('email') } });
    }

    if (generateCodeEmailAPIResult?.isError) {
      handleError(generateCodeEmailAPIResult.error);
    }
  }, [generateCodeEmailAPIResult?.isSuccess, generateCodeEmailAPIResult?.isError]);

  useEffect(() => {
    if (getCurrentUserResult?.isSuccess) {
      form.setFieldValue('email', triedEmail || currentUser?.email);
      form.validateFields(['email']);
    }
  }, [getCurrentUserResult?.isSuccess]);

  const pathList: TBreadcrumbsPath[] = [
    { id: 0, name: ROUTES.home.title, path: ROUTES.home.path },
    { id: 1, name: t('header.Tenx Pay') },
  ];

  return (
    <>
      {isDesktopSize && <Breadcrumbs paths={pathList} title={t('tenxPayHome.Tenx Pay')} hasBackNav />}
      <SLayout isDesktopSize={isDesktopSize}>
        <CustomRow flexDirection="column" justifyContent="flex-start" alignItems="start" width={isDesktopSize ? '50%' : 'auto'}>
          {(getCurrentUserResult.isLoading || generateCodeEmailAPIResult.isLoading) && <Loader />}
          {!isDesktopSize && (
            <CustomRow justifyContent="flex-start" marginBottom={32}>
              <Title size="S" fontWeight="SB" color="charcoal" font="Poppins" marginLeft={5}>
                {t('tenxPayEmailVerification.Tenx Pay')}
              </Title>
            </CustomRow>
          )}

          <Title size="S" fontWeight={isDesktopSize ? 'SB' : 'M'} color="charcoal" marginBottom={isDesktopSize ? 18 : 4} font="Poppins" marginLeft={5} lineHeight={1.4}>
            {t('tenxPayEmailVerification.ToEnrollPleaseEnterEmail')}
          </Title>
          <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" marginTop={5} marginBottom={17} marginLeft={5} lineHeight={1.3}>
            {isUserEmailVerified && t('tenxPayEmailVerification.For your security, we will send a verification code to the email address you provide.')}
          </BodyText>

          <Form onFinish={handleOnFinish} onFieldsChange={onFieldsChange} onValuesChange={onFieldsChange} form={form} autoComplete="off" layout="vertical" requiredMark={false}>
            <CustomCard>
              <Form.Item
                label={<CustomRequiredLabel translation="tenxPayEmailVerification." label="Email" fontFamily="DM Sans" />}
                name="email"
                validateTrigger={['onBlur', 'onChange']}
                validateFirst
                rules={getEmailRules()}
              >
                <BaseInput
                  placeholder={t('tenxPayEmailVerification.Sample')}
                  suffix={isButtonDisabled ? 'validationError' : 'tickInCircle'}
                  suffixSize="big"
                  suffixColor={isButtonDisabled ? 'red' : 'green'}
                  inputMode="email"
                  autoCapitalize="off"
                />
              </Form.Item>
              <BodyText textType="bodyText" fontWeight="B" size="T" color="charcoal" lineHeight={1.3}>
                {t('tenxPayEmailVerification.ThisEmailMustBeTheSame')}
              </BodyText>
              {isDesktopSize && <SubmitButtom handleOnFinish={handleOnFinish} isButtonDisabled={isButtonDisabled} />}
            </CustomCard>
          </Form>
        </CustomRow>
        {!isDesktopSize && <SubmitButtom handleOnFinish={handleOnFinish} isButtonDisabled={isButtonDisabled} />}
      </SLayout>
    </>
  );
};

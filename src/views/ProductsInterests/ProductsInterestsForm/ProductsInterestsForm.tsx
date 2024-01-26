import React, { useEffect } from 'react';
import { Form } from 'antd';
import { motion } from 'framer-motion';
import { ROUTES } from 'vars/const/ROUTES';
import { useLogin } from 'utils/hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { Title } from 'components/general/Typography';
import { SubscriptionsLayout } from 'components/layouts/SubscriptionsLayout/SubscriptionsLayout';
import { useWaitlistProducts } from 'utils/hooks/useWaitlistProducts';
import { Loader } from 'components/general/Loader/Loader';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { SWaitlistFormInnerWrapper, SFormWrapper } from './ProductsInterestsForm.styles';

export const ProductsInterestsForm = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const {
    getAllAlertsAPIResult,
    areAllSubscriptionPagesActive,
    filterWaitlistProductsPreferences,
    saveAlerts,
    getAllAlerts,
    saveAllAlertsAPIResult,
    changeAlert,
    changeAllAlerts,
    isAlertChecked,
    showInfoModal,
  } = useWaitlistProducts();

  const loginClick = useLogin();
  const navigate = useNavigate();

  const motionVariants = {
    hide: { opacity: 0 },
    show: { opacity: 1 },
  };

  useEffect(() => {
    getAllAlerts();
    filterWaitlistProductsPreferences();
  }, []);

  const handleSkip = () => {
    navigate(ROUTES.home.path);
  };

  const handleChange = (checked: boolean, productId: string) => {
    changeAlert(checked, productId);
  };

  const handleCheckAll = (checked: boolean) => {
    changeAllAlerts(checked);
  };

  const onFinish = async () => {
    await saveAlerts();
    navigate(ROUTES.home.path);
  };

  if (getAllAlertsAPIResult?.isLoading || saveAllAlertsAPIResult.isLoading) return <Loader />;

  return (
    <SFormWrapper as={motion.div} variants={motionVariants} animate={loginClick.motionVariant()}>
      {getAllAlertsAPIResult?.isSuccess && (
        <Form onFinish={onFinish} autoComplete="off" layout="vertical" requiredMark={false} form={form}>
          <SWaitlistFormInnerWrapper>
            <Title size="M" font="Poppins" fontWeight="M" color="charcoal" marginBottom={42}>
              {t(`preRegOnboarding.Get updated when we launch our products.`)}
            </Title>

            <Title size="sL" font="DM Sans" fontWeight="M" lineHeight="1.5" marginBottom={32}>
              {t(`preRegOnboarding.Select the product(s) you're interested in.`)}
            </Title>
            <SubscriptionsLayout
              handleChange={handleChange}
              handleCheckAll={handleCheckAll}
              isAlertChecked={isAlertChecked}
              showInfoModal={showInfoModal}
              areAllSubscriptionPagesActive={areAllSubscriptionPagesActive}
            />
          </SWaitlistFormInnerWrapper>

          <CustomRow width="100%" flexDirection="column" marginBottom={32}>
            <CustomButton preset="primary" size="large" type="submit">
              {t('homeScreen.Sign Up for Our Waitlist')}
            </CustomButton>

            <CustomButton type="button" onClick={handleSkip} size="middle">
              {t('homeScreen.Skip')}
            </CustomButton>
          </CustomRow>
        </Form>
      )}
    </SFormWrapper>
  );
};

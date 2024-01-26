import React from 'react';
import { Spinner } from 'components/general/Spinner/Spinner';
import { useGenerateCodeMutation } from 'store/user/registration/registration.api';
import { Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { RegistrationForm } from './RegistrationForm/RegistrationForm';
import { SLayout } from './RegistrationPage.styles';

export const RegistrationPage = () => {
  const { t } = useTranslation();
  const [, { isLoading }] = useGenerateCodeMutation();
  const { isDesktopSize } = useDeviceDimension();

  return (
    <>
      {isLoading && <Spinner />}
      <SLayout>
        <Title font="Poppins" size="M" fontWeight="M" marginBottom={25}>
          {t('registration.Title')}
        </Title>
        {isDesktopSize ? (
          <CustomCard>
            <RegistrationForm />
          </CustomCard>
        ) : (
          <RegistrationForm />
        )}
      </SLayout>
    </>
  );
};

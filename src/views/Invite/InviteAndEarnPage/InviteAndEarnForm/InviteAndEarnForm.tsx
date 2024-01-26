import React, { useEffect, useState } from 'react';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { Form } from 'antd';
import { useLazyGetZogoPointsQuery, usePutZogoPointsMutation } from 'store/user/zogo/zogo.api';
import { useSelector } from 'react-redux';
import { getRequiredRule, getPhoneValidator, getEmailRulesOptional } from 'utils/helpers/validationRules';
import { selectCurrentAuthState } from 'store/user/authentication.slice';
import { usePostUserInvitesMutation } from 'store/api';
import { IPostUserInvitesRequest } from 'vars/types/invite.types';
import { getUnmaskedMobileNumber } from 'utils/helpers/phoneNumber';
import { IPutZogoPointsRequest } from 'vars/types/zogo.types';
import { IFrame } from 'components/general/IFrame/IFrame';
import { selectZogoData } from 'store/user/zogo/zogo.slice';
import { useTranslation } from 'react-i18next';
import { MaskedInput } from 'components/general/MaskedInput/MaskedInput';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { BodyText } from 'components/general/Typography';
import { Loader } from 'components/general/Loader/Loader';
import { useToggle } from 'utils/hooks/useToggle';
import { InviteFinishedModal } from 'components/general/Modals/InviteFinishedModal/InviteFinishedModal';
import { SInviteAndEarnFormLayout } from 'views/Invite/InviteAndEarnPage/InviteAndEarnPage.styles';
import { PHONE_MASK, PHONE_MASK_OPTIONS } from './inviteMasks';

interface IFormValues {
  fromName: string;
  toName: string;
  phone: string;
  email: string;
}

export const InviteAndEarnForm: React.FC = () => {
  const { zogoUserId, user } = useSelector(selectCurrentAuthState);
  const { accessToken } = useSelector(selectZogoData);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const iframeURL = `https://integration.zogofinance.com?widget_type=learn_and_earn&token=${accessToken}`;
  const inviteFinishedModal = useToggle(false);

  const [givePercPointsAPI, givePercPointsAPIResult] = usePutZogoPointsMutation();
  const [getPercPointsAPI, getPercPointsAPIResult] = useLazyGetZogoPointsQuery();
  const [sendUserInviteAPI, sendUserInviteAPIResult] = usePostUserInvitesMutation();

  const [isCreateNewZogo, setIsCreateNewZogo] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(false);

  const givePercPoints = async () => {
    const data: IPutZogoPointsRequest = {
      zogoUserId: zogoUserId ?? null,
      primaryPointsChangeAmount: 20,
      primaryPointsChangeType: 'Add',
    };

    await givePercPointsAPI(data);
  };

  const getPercPoints = async () => {
    await getPercPointsAPI({ zogoUserId: zogoUserId ?? null });
  };

  const sendUserInvite = async (data: IPostUserInvitesRequest) => {
    await sendUserInviteAPI(data);
  };

  useEffect(() => {
    if (sendUserInviteAPIResult.isSuccess) {
      inviteFinishedModal.show();
      givePercPoints();
    }
  }, [sendUserInviteAPIResult.isSuccess]);

  useEffect(() => {
    if (givePercPointsAPIResult.isSuccess) {
      getPercPoints();
    }
  }, [givePercPointsAPIResult.isSuccess]);

  useEffect(() => {
    if (getPercPointsAPIResult.isSuccess && getPercPointsAPIResult.currentData?.userNotFound) {
      setIsCreateNewZogo(true);
    }
  }, [getPercPointsAPIResult.currentData, getPercPointsAPIResult.isSuccess]);

  useEffect(() => {
    getPercPoints();
  }, []);

  const handleOnFinish = async (values: IFormValues) => {
    const data: IPostUserInvitesRequest = {
      inviteUserId: user?.userId,
      fromName: values.fromName,
      toName: values.toName,
      email: values.email,
      phone: getUnmaskedMobileNumber(`1 ${values.phone}`),
    };

    await sendUserInvite(data);
  };

  const onFieldsChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    const phoneError = form.getFieldError('phone');
    setIsPhoneError(!!phoneError.length);
    setIsDisabled(hasErrors);
  };

  if (getPercPointsAPIResult.isFetching || givePercPointsAPIResult.isLoading || sendUserInviteAPIResult.isLoading) return <Loader />;

  return (
    <SInviteAndEarnFormLayout>
      <Form autoComplete="off" requiredMark={false} onFinish={handleOnFinish} layout="vertical" onFieldsChange={onFieldsChange} form={form}>
        <Form.Item
          label={t('inviteEarn.WhatYourFriendsCallYou?')}
          name="fromName"
          initialValue={user?.firstName}
          rules={[getRequiredRule('inviteEarn.PleaseInputYourName')]}
          style={{ marginBottom: '20px' }}
          validateTrigger={['onBlur', 'onChange']}
          validateFirst
        >
          <BaseInput placeholder={t('inviteEarn.EnterYourName')} defaultValue={user?.firstName} />
        </Form.Item>

        <BodyText textType="bodyText" font="Poppins" size="M" fontWeight="SB" color="charcoal" marginBottom={24} textAlign="start">
          {t('inviteEarn.LetUsKnowAboutThem')}
        </BodyText>

        <Form.Item
          label={t('inviteEarn.YourFriendsFirst&LastName')}
          name="toName"
          validateTrigger={['onBlur', 'onChange']}
          validateFirst
          rules={[getRequiredRule('inviteEarn.PleaseInputYourFriendsFullName')]}
        >
          <BaseInput placeholder={t('inviteEarn.EnterFriendsFirst&LastName')} />
        </Form.Item>

        <Form.Item
          label={t('inviteEarn.YourFriendsEmail')}
          name="email"
          validateTrigger={['onBlur', 'onChange']}
          rules={[getRequiredRule('inviteEarn.PleaseInputYourFriendsEmail'), getEmailRulesOptional()]}
        >
          <BaseInput placeholder={t('inviteEarn.EnterYourFriendsEmail')} data-testid="email" autoCapitalize="off" inputMode="email" />
        </Form.Item>

        <Form.Item
          label={t('inviteEarn.YourFriendsPhoneNumber')}
          name="phone"
          validateTrigger={['onBlur', 'onChange']}
          validateFirst
          rules={[getRequiredRule('inviteEarn.PleaseInputYourFriendsPhoneNumber'), getPhoneValidator('inviteEarn.PleaseInputCompleteMobileNumber')]}
        >
          <MaskedInput mask={PHONE_MASK} maskOptions={PHONE_MASK_OPTIONS} placeholder={t('inviteEarn.EnterFriendsPhoneNumber')} isError={isPhoneError} inputMode="tel" />
        </Form.Item>

        <Form.Item>
          <CustomButton preset="primary" size="middleStretch" disabled={isDisabled}>
            {t('inviteEarn.Invite')}
          </CustomButton>
        </Form.Item>

        {isCreateNewZogo && <IFrame url={iframeURL} hidden />}
      </Form>

      <InviteFinishedModal open={inviteFinishedModal.isActive} onClose={inviteFinishedModal.hide} isClosable={false} />
    </SInviteAndEarnFormLayout>
  );
};

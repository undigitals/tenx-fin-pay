import React, { useEffect, useCallback } from 'react';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { useAppDispatch } from 'utils/hooks/store';
import { useTranslation } from 'react-i18next';
import { selectDisplayAdditionalInformationModalType, selectAdditionalInformationModalType, setShowAdditionalInformationModal } from 'store/ui.slice';
import { useSelector } from 'react-redux';
import { Title, BodyText } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { MODAL_DATA } from './AdditionalInformationHandler.config';
import { SMediaLayout } from './AdditionalInformationHandler.styles';

export const AdditionalInformationModal = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isModalVisible = useSelector(selectDisplayAdditionalInformationModalType);
  const additionalInformationModalType = useSelector(selectAdditionalInformationModalType);
  const additionalInformationData = MODAL_DATA[additionalInformationModalType];

  const handleOnCancel = useCallback(() => {
    dispatch(
      setShowAdditionalInformationModal({
        displayAdditionalInformationModal: false,
        additionalInformationModalType: 'goalsAndTools',
      })
    );
  }, [setShowAdditionalInformationModal]);

  useEffect(() => handleOnCancel, []);

  return (
    <CustomModal open={isModalVisible} onCancel={handleOnCancel} topPosition={String(additionalInformationData?.TOP_POSITION) ?? '25%'} display="flex" closeIconColor="charcoal70">
      <SMediaLayout>
        <Title fontWeight="M" size="M" paddingBottom={17} color={additionalInformationData.TITLE_COLOR} font="Poppins">
          {t(String(additionalInformationData.TITLE))}
        </Title>

        <BodyText
          textType="bodyText"
          font="DM Sans"
          color={additionalInformationData.TEXT_COLOR}
          size="N"
          fontWeight={additionalInformationData.FONT_WEIGHT}
          marginBottom={5}
          lineHeight={1.5}
          paddingRight={15}
        >
          {t(String(additionalInformationData.TEXT))}
        </BodyText>

        {additionalInformationData.SECOND_TEXT && (
          <BodyText
            textType="bodyText"
            font="DM Sans"
            color={additionalInformationData.TEXT_COLOR}
            size="N"
            fontWeight={additionalInformationData.FONT_WEIGHT}
            marginBottom={5}
            lineHeight={1.5}
            paddingRight={15}
            marginTop={15}
          >
            {t(String(additionalInformationData.SECOND_TEXT))}
          </BodyText>
        )}

        {additionalInformationData.THIRD_TEXT && (
          <BodyText
            textType="bodyText"
            font="DM Sans"
            color={additionalInformationData.TEXT_COLOR}
            size="N"
            fontWeight={additionalInformationData.FONT_WEIGHT}
            marginBottom={5}
            lineHeight={1.5}
            paddingRight={15}
            marginTop={15}
          >
            {t(String(additionalInformationData.THIRD_TEXT))}
          </BodyText>
        )}

        {additionalInformationData.BUTTON_TEXT && (
          <CustomButton preset={additionalInformationData.PRESET ? 'primary' : 'secondary'} size="large" marginTop={String(additionalInformationData.BUTTON_MARGIN_TOP) ?? 10} onClick={handleOnCancel}>
            {t(String(additionalInformationData.BUTTON_TEXT))}
          </CustomButton>
        )}
      </SMediaLayout>
    </CustomModal>
  );
};

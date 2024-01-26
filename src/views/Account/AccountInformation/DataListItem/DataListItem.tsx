import { notification } from 'antd';
import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TAdditionalInformationModalType, setShowAdditionalInformationModal } from 'store/ui.slice';
import { useAppDispatch } from 'utils/hooks/store';

interface IDataListItem {
  title: string;
  number: string;
  tooltip?: TAdditionalInformationModalType;
  isLast?: boolean;
}

export const DataListItem: React.FC<IDataListItem> = ({ title, number, tooltip, isLast = false }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();

  const handleTooltipClick = () => {
    if (tooltip) {
      dispatch(
        setShowAdditionalInformationModal({
          displayAdditionalInformationModal: true,
          additionalInformationModalType: tooltip,
        })
      );
    }
  };

  const onCopyToClipboard = () => {
    navigator.clipboard.writeText(number);

    api.info({
      message: (
        <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="R">
          {title} {t('moveMoney.Copied')}
        </BodyText>
      ),
      placement: 'top',
      duration: 2,
      style: { borderRadius: 20 },
      maxCount: 2,
      icon: <Icon name="circleTick" color="green" />,
    });
  };

  return (
    <>
      {contextHolder}
      <CustomRow marginBottom={isLast ? 0 : 24}>
        <CustomRow flexDirection="column" alignItems="flex-start">
          <CustomRow justifyContent="flex-start">
            <BodyText textType="bodyText" color="charcoal70" size="M" fontWeight="R">
              {title}
            </BodyText>
            {tooltip && <Icon name="info" color="blue" cursorPointer marginLeft={14} size="smaller" onClick={handleTooltipClick} />}
          </CustomRow>
          <BodyText textType="bodyText" color="charcoal70" size="M" fontWeight="M">
            {number}
          </BodyText>
        </CustomRow>
        <Icon name="duplicate" color="blue" size="small" cursorPointer onClick={onCopyToClipboard} />
      </CustomRow>
    </>
  );
};

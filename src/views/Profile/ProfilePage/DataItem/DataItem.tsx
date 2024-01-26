import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'utils/hooks/store';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { BodyText } from 'components/general/Typography';
import { TProfileEditSheetType, setShowAdditionalInformationModal } from 'store/ui.slice';
import { Icon } from 'components/general/Icon/Icon';
import { SIcon, SData } from './DataItem.styles';

interface IDataItem {
  label: string;
  value: string;
  isLast?: boolean;
  sheetType?: TProfileEditSheetType;
  showInfoIcon?: boolean;
  showEditIcon?: boolean;
  setSheetType?: (sheetType: string) => void;
  showSheet?: () => void;
}

const SBodyTextExtraStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row-reverse',
};

export const DataItem: React.FC<IDataItem> = ({ label, value, isLast = false, sheetType, showInfoIcon = false, showEditIcon = true, setSheetType, showSheet }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleIconClick = () => {
    setSheetType?.(sheetType || '');
    showSheet?.();
  };

  const handleAdditionalInfoIconClick = () => {
    dispatch(
      setShowAdditionalInformationModal({
        displayAdditionalInformationModal: true,
        additionalInformationModalType: 'preferredName',
      })
    );
  };

  const circleInfoIcon = showInfoIcon === true ? <Icon name="circleInfo" size="smaller" color="blue" cursorPointer onClick={handleAdditionalInfoIconClick} /> : undefined;

  return (
    <CustomRow marginBottom={isLast ? 0 : 20} width="100%">
      <SData>
        <BodyText marginBottom={4} textType="bodyText" font="DM Sans" fontWeight="R" color="charcoal60" size="M" icon={circleInfoIcon} marginRight={5} extraStyles={SBodyTextExtraStyles}>
          {t(`profile.${label}`)}
        </BodyText>
        <BodyText textType="bodyText" font="DM Sans" fontWeight="SB" color="charcoal" size="N">
          {value}
        </BodyText>
      </SData>
      {showEditIcon && <SIcon color="blue" cursorPointer onClick={handleIconClick} />}
    </CustomRow>
  );
};

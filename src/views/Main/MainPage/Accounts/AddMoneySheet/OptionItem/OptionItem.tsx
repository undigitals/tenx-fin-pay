import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShowAddMoneySheet, setShowComingSoonModal } from 'store/ui.slice';
import { selectPolicies } from 'store/user/authentication.slice';
import { useAppDispatch } from 'utils/hooks/store';

interface IOptionItem {
  iconName: string;
  title: string;
  to: string;
  externalTransfer?: boolean;
}

export const OptionItem: React.FC<IOptionItem> = ({ iconName, title, to, externalTransfer }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const policies = useSelector(selectPolicies);

  const handleCardClick = () => {
    dispatch(setShowAddMoneySheet(false));

    if (policies?.ExternalTransferEnabled && externalTransfer) navigate(to);
    if (!policies?.ExternalTransferEnabled && externalTransfer) dispatch(setShowComingSoonModal(true));
    if (!externalTransfer) navigate(to);
  };

  return (
    <CustomCard cursorPointer border="2px solid #F5F4F4" onClick={handleCardClick} marginBottom={16}>
      <CustomRow>
        <CustomRow justifyContent="flex-start">
          <Icon name={iconName} color="blue" size="small" cursorPointer />
          <BodyText textType="bodyText" color="charcoal" size="N" fontWeight="B" cursorPointer marginLeft={16}>
            {title}
          </BodyText>
        </CustomRow>
        <Icon name="chevronRight" color="blue" size="smaller" cursorPointer />
      </CustomRow>
    </CustomCard>
  );
};

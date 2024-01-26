import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mobileApiCall } from 'services/mobileService';
import { setShowCardHubModal } from 'store/ui.slice';
import { lsGetItem } from 'utils/helpers/storage';
import { useAppDispatch } from 'utils/hooks/store';
import { TThemeColor } from 'styles/theme';
import { ICON_SIZE_MAP } from 'components/general/Icon/Icon.constants';

interface IDebitCardItem {
  title: string;
  subTitle: string;
  prefix?: string;
  prefixSize?: keyof typeof ICON_SIZE_MAP;
  prefixColor?: TThemeColor;
  to?: string;
  clickHandler?: () => void;
  isLast?: boolean;
}

export const DebitCardItem: React.FC<IDebitCardItem> = ({ title, subTitle, prefix, prefixSize = 'normal', prefixColor = 'charcoal', to, clickHandler, isLast = false }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const openCardHub = () => {
    const isMobileApp = lsGetItem('isMobileApp');
    if (isMobileApp) {
      mobileApiCall('cardHubRequest');
    } else {
      dispatch(setShowCardHubModal(true));
    }
  };

  const handleNavigateTo = () => {
    if (to) {
      if (to === 'cardHub') {
        openCardHub();
      } else {
        navigate(to);
      }
    } else if (clickHandler) {
      clickHandler();
    }
  };

  return (
    <CustomCard cursorPointer onClick={handleNavigateTo} marginBottom={isLast ? 40 : 20} width="100%" marginTop={0}>
      <CustomRow cursorPointer>
        <CustomRow cursorPointer>
          {prefix && <Icon name={prefix} size={prefixSize} className="prefix" cursorPointer color={prefixColor} marginRight={8} />}

          <CustomRow flexDirection="column" cursorPointer alignItems="flex-start">
            <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="M" cursorPointer>
              {title}
            </BodyText>
            <BodyText textType="bodyText" color="charcoal" fontWeight="M" size="M" cursorPointer>
              {subTitle}
            </BodyText>
          </CustomRow>
        </CustomRow>

        <Icon name="chevronRight" color="charcoal" size="smaller" cursorPointer />
      </CustomRow>
    </CustomCard>
  );
};

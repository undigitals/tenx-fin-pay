import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'components/general/Icon/Icon';
import { TThemeColor } from 'styles/theme';
import { EAccountType } from 'store/user/accounts/accounts.types';
import { BodyText } from 'components/general/Typography';
import { SAccountItem, SAccountItemDesktop, SAccountSelector } from './AccountSelector.styles';

const ACTIVE_COLORS = {
  icon: 'blue' as TThemeColor,
  iconDesktop: 'blue' as TThemeColor,
  text: 'charcoal' as TThemeColor,
  background: 'blue10' as TThemeColor,
  border: 'blue10' as TThemeColor,
  borderDesktop: 'blue' as TThemeColor,
};

const INACTIVE_COLORS = {
  icon: 'charcoal' as TThemeColor,
  iconDesktop: 'charcoal70' as TThemeColor,
  text: 'charcoal70' as TThemeColor,
  background: 'transparent' as TThemeColor,
  border: 'charcoal20' as TThemeColor,
  borderDesktop: 'creamS10' as TThemeColor,
};

interface IAccountSelector {
  onSelectedAccount: (accountType: EAccountType) => void;
  stuffAccount: boolean;
  saveAccount: boolean;
  selectedAccount: EAccountType;
  isDesktopSize?: boolean;
}

export const AccountSelector: React.FC<IAccountSelector> = ({ onSelectedAccount, stuffAccount, saveAccount, selectedAccount, isDesktopSize = false }) => {
  const { t } = useTranslation();

  const SAccountItemLayout = isDesktopSize ? SAccountItemDesktop : SAccountItem;
  const borderColorActive = isDesktopSize ? ACTIVE_COLORS.borderDesktop : ACTIVE_COLORS.border;
  const borderColorInactive = isDesktopSize ? INACTIVE_COLORS.borderDesktop : INACTIVE_COLORS.border;

  return (
    <SAccountSelector isDesktopSize={isDesktopSize}>
      <SAccountItemLayout
        onClick={() => onSelectedAccount(EAccountType.CASH)}
        background={selectedAccount === EAccountType.CASH ? ACTIVE_COLORS.background : INACTIVE_COLORS.background}
        border={selectedAccount === EAccountType.CASH ? borderColorActive : borderColorInactive}
      >
        {!isDesktopSize && <Icon name="cash" cursorPointer />}
        <BodyText
          textType="bodyText"
          fontWeight={isDesktopSize ? 'M' : 'B'}
          size={isDesktopSize ? 'N' : 'T'}
          font={isDesktopSize ? 'Poppins' : 'DM Sans'}
          color={selectedAccount === EAccountType.CASH ? ACTIVE_COLORS.text : INACTIVE_COLORS.text}
          marginLeft={9}
          cursorPointer
          nowrap
        >
          {t('account.Cash Account')}
        </BodyText>
        {isDesktopSize && <Icon name="cash" cursorPointer marginLeft={10} color={selectedAccount === EAccountType.CASH ? ACTIVE_COLORS.icon : INACTIVE_COLORS.iconDesktop} />}
      </SAccountItemLayout>

      {stuffAccount && (
        <SAccountItemLayout
          onClick={() => onSelectedAccount(EAccountType.STUFF)}
          background={selectedAccount === EAccountType.STUFF ? ACTIVE_COLORS.background : INACTIVE_COLORS.background}
          border={selectedAccount === EAccountType.STUFF ? borderColorActive : borderColorInactive}
        >
          {!isDesktopSize && <Icon name="stash" cursorPointer />}
          <BodyText
            textType="bodyText"
            fontWeight={isDesktopSize ? 'M' : 'B'}
            size={isDesktopSize ? 'N' : 'T'}
            font={isDesktopSize ? 'Poppins' : 'DM Sans'}
            color={selectedAccount === EAccountType.STUFF ? ACTIVE_COLORS.text : INACTIVE_COLORS.text}
            marginLeft={9}
            cursorPointer
            nowrap
          >
            {t('account.Needs Account')}
          </BodyText>
          {isDesktopSize && <Icon name="stash" cursorPointer marginLeft={10} color={selectedAccount === EAccountType.STUFF ? ACTIVE_COLORS.icon : INACTIVE_COLORS.iconDesktop} />}
        </SAccountItemLayout>
      )}
      {saveAccount && (
        <SAccountItemLayout
          onClick={() => onSelectedAccount(EAccountType.SAVE)}
          background={selectedAccount === EAccountType.SAVE ? ACTIVE_COLORS.background : INACTIVE_COLORS.background}
          border={selectedAccount === EAccountType.SAVE ? borderColorActive : borderColorInactive}
        >
          {!isDesktopSize && <Icon name="goal" cursorPointer />}
          <BodyText
            textType="bodyText"
            fontWeight={isDesktopSize ? 'M' : 'B'}
            size={isDesktopSize ? 'N' : 'T'}
            font={isDesktopSize ? 'Poppins' : 'DM Sans'}
            color={selectedAccount === EAccountType.SAVE ? ACTIVE_COLORS.text : INACTIVE_COLORS.text}
            marginLeft={9}
            cursorPointer
            nowrap
          >
            {t('account.Goals Account')}
          </BodyText>
          {isDesktopSize && <Icon name="goal" cursorPointer marginLeft={10} color={selectedAccount === EAccountType.SAVE ? ACTIVE_COLORS.icon : INACTIVE_COLORS.iconDesktop} />}
        </SAccountItemLayout>
      )}
    </SAccountSelector>
  );
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { ThemeType } from 'vars/types/theme.types';
import { IMenuData, IMenuItemDataWithChildren } from 'vars/types/menu.types';
import { ESubscriptionModalType } from 'vars/types/subscription.types';
import { EAccountType } from 'store/user/accounts/accounts.types';
import { api } from './api';

export type TAddStuffSaveAccountModalType = EAccountType.STUFF | EAccountType.SAVE;
export type TProfileEditSheetType = 'legalName' | 'preferredName' | 'username' | 'address' | 'mailingAddress' | 'phoneNumber' | 'email' | 'password' | undefined;
export type TSubscriptionModalText = 'DEFAULT' | 'SUBSCRIPTION_PREFERENCES_WERE_SAVED';
export type TSubscriptionModalContentPreset = 'DEFAULT' | 'CONNECT';
export type TTenxPayModalType = 'payPeriod' | 'earned' | 'amountRequested' | 'CardVsAccount';
export type TAdditionalInformationModalType =
  | 'goalsAndTools'
  | 'invite'
  | 'universalInfo'
  | 'preferredName'
  | 'myInfoAgeValidation'
  | 'routingNumber'
  | 'accountNumber'
  | 'externalAvailable'
  | 'externalTransferInfo';

interface IAddStuffSaveAccountModal {
  displayAddStuffSaveAccountModal: boolean;
  addStuffSaveAccountModalType: TAddStuffSaveAccountModalType;
}

interface ISubscriptionModal {
  displaySubscriptionsModal: boolean;
  subscriptionModalType?: ESubscriptionModalType;
  subscriptionAdditional?: { contentPreset?: TSubscriptionModalContentPreset; description?: TSubscriptionModalText };
}

interface IAdditionalInformationModal {
  displayAdditionalInformationModal: boolean;
  additionalInformationModalType: TAdditionalInformationModalType;
}

interface ITenxPayModal {
  displayTenxPayModal: boolean;
  tenxPayModalType?: TTenxPayModalType;
}

export type TTransferSelectorType = 'from' | 'to';

interface ITransferSelectorSheet {
  displayTransferSelector: boolean;
  transferSelectorType?: TTransferSelectorType;
}

interface IProfileEmailVerificationSheet {
  displayProfileEmailVerificationSheet?: boolean;
  currentEmail?: string;
  transactionId?: string;
}

interface IProfilePhoneVerificationSheet {
  displayProfilePhoneVerificationSheet?: boolean;
  currentPhone?: string;
  transactionId?: string;
}

interface UiState {
  theme: ThemeType;
  displayChat: boolean;
  displayCashOpeningExitModal: boolean;
  displayInviteAdditionalModal: boolean;
  displaySubscriptionsModal: boolean;
  displayChangePasswordModal: boolean;
  enrollModal: {
    isOpen: boolean;
    email?: string;
  };
  displayAccountSelectDrawer: boolean;
  displaySortByDrawer: boolean;
  displayDestinationAccountDrawer: boolean;
  displayDateRangeDrawer: boolean;
  displayHistoryFilterDrawer: boolean;
  displayTransactionFailureDrawer: boolean;
  displayAdditionalInformationModal: boolean;
  loginClicked: boolean;
  isDesktopSize: boolean;
  subscriptionModalType: ESubscriptionModalType;
  additionalInformationModalType: TAdditionalInformationModalType;
  headerTitle: string;
  navigationBarData: IMenuItemDataWithChildren[];
  mainMenuData: IMenuItemDataWithChildren[];
  cashAccountModalType?: string;
  subscriptionAdditional?: { contentPreset?: TSubscriptionModalContentPreset; description?: TSubscriptionModalText };
  addStuffSaveAccountModal: IAddStuffSaveAccountModal;
  displayCardHubModal: boolean;
  displayStuffSaveAccountErrorModal: boolean;
  displayPercPlaysInfoModal: boolean;
  isMenuDataLoading: boolean;
  tenxPayModal: ITenxPayModal;
  displayTransferAddNote: boolean;
  transferSelector: ITransferSelectorSheet;
  displayConfirmTransferSheet: boolean;
  displaySuccessTransferSheet: boolean;
  displayTransferErrorModal: boolean;
  displayTransferToSheet: boolean;
  displayEmploymentStatusSelectorSheet: boolean;
  displayAnnualIncomeSelectorSheet: boolean;
  profileEmailVerificationSheet: IProfileEmailVerificationSheet;
  profilePhoneVerificationSheet: IProfilePhoneVerificationSheet;
  displayAddMoneySheet: boolean;
  displayComingSoonModal: boolean;
}

const DEFAULT_THEME = 'dark';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: DEFAULT_THEME,
    displayChat: false,
    displayCashOpeningExitModal: false,
    displayInviteAdditionalModal: false,
    displayChangePasswordModal: false,
    displayAccountSelectDrawer: false,
    displaySortByDrawer: false,
    displayDestinationAccountDrawer: false,
    displayDateRangeDrawer: false,
    displayHistoryFilterDrawer: false,
    displayGoalsAndToolsModal: false,
    displaySubscriptionsModal: false,
    enrollModal: {
      isOpen: false,
      email: '',
    },
    displayAdditionalInformationModal: false,
    subscriptionModalType: 'subscribe',
    additionalInformationModalType: 'goalsAndTools',
    subscriptionAdditional: {},
    displayTransactionFailureDrawer: false,
    loginClicked: false,
    isDesktopSize: false,
    errorModal: { message: '' },
    headerTitle: '',
    mainMenuData: [],
    displayCardHubModal: false,
    addStuffSaveAccountModal: {
      displayAddStuffSaveAccountModal: false,
      addStuffSaveAccountModalType: 'Stuff',
    },
    displayStuffSaveAccountErrorModal: false,
    displayDepositEmailModal: false,
    navigationBarData: [],
    isMenuDataLoading: false,
    displayCashAccountModal: false,
    displayPercPlaysInfoModal: false,
    cashAccountModalType: '',
    tenxPayModal: {
      displayTenxPayModal: false,
      tenxPayModalType: 'earned',
    },
    displayTransferAddNote: false,
    transferSelector: {
      displayTransferSelector: false,
      transferSelectorType: 'from',
    },
    displayConfirmTransferSheet: false,
    displaySuccessTransferSheet: false,
    displayTransferErrorModal: false,
    displayTransferToSheet: false,
    displayEmploymentStatusSelectorSheet: false,
    displayAnnualIncomeSelectorSheet: false,
    profileEmailVerificationSheet: {
      displayProfileEmailVerificationSheet: false,
      currentEmail: '',
      transactionId: '',
    },
    profilePhoneVerificationSheet: {
      displayProfilePhoneVerificationSheet: false,
      currentPhone: '',
      transactionId: '',
    },
    displayMoveMoneyAccountNumberModal: false,
    displayMoveMoneyRoutingNumberModal: false,
    displayAddMoneySheet: false,
    displayComingSoonModal: false,
  } as UiState,
  reducers: {
    setIsDesktopSize: (state, { payload: isDesktopSize }: PayloadAction<boolean>) => {
      state.isDesktopSize = isDesktopSize;
    },
    setLoginClicked: (state, { payload: loginClicked }: PayloadAction<boolean>) => {
      state.loginClicked = loginClicked;
    },
    setShowChat: (state, { payload: displayChat }: PayloadAction<boolean>) => {
      state.displayChat = displayChat;
    },
    setShowCashOpeningExitModal: (state, { payload: displayCashOpeningExitModal }: PayloadAction<boolean>) => {
      state.displayCashOpeningExitModal = displayCashOpeningExitModal;
    },
    setShowInviteAdditionalModal: (state, { payload: displayInviteAdditionalModal }: PayloadAction<boolean>) => {
      state.displayInviteAdditionalModal = displayInviteAdditionalModal;
    },
    setShowSubscriptionsModal: (state, { payload: { displaySubscriptionsModal, subscriptionModalType, subscriptionAdditional = {} } }: PayloadAction<ISubscriptionModal>) => {
      state.displaySubscriptionsModal = displaySubscriptionsModal;
      state.subscriptionAdditional = subscriptionAdditional;

      if (subscriptionModalType) state.subscriptionModalType = subscriptionModalType;
    },
    setShowChangePasswordModal: (state, { payload: displayChangePasswordModal }: PayloadAction<boolean>) => {
      state.displayChangePasswordModal = displayChangePasswordModal;
    },
    setShowEnrollModal: (state, { payload }: PayloadAction<{ isOpen: boolean; email?: string }>) => {
      state.enrollModal = { ...state.enrollModal, ...payload };
    },
    setHeaderTitle: (state, { payload: headerTitle }: PayloadAction<string>) => {
      state.headerTitle = headerTitle;
    },
    setShowAccountSelectDrawer: (state, { payload: displayAccountSelectDrawer }: PayloadAction<boolean>) => {
      state.displayAccountSelectDrawer = displayAccountSelectDrawer;
    },
    setShowSortByDrawer: (state, { payload: displaySortByDrawer }: PayloadAction<boolean>) => {
      state.displaySortByDrawer = displaySortByDrawer;
    },
    setShowDestinationAccountDrawer: (state, { payload: displayDestinationAccountDrawer }: PayloadAction<boolean>) => {
      state.displayDestinationAccountDrawer = displayDestinationAccountDrawer;
    },
    setShowDateRangeDrawer: (state, { payload: displayDateRangeDrawer }: PayloadAction<boolean>) => {
      state.displayDateRangeDrawer = displayDateRangeDrawer;
    },
    setShowHistoryFilterDrawer: (state, { payload: displayHistoryFilterDrawer }: PayloadAction<boolean>) => {
      state.displayHistoryFilterDrawer = displayHistoryFilterDrawer;
    },
    setShowTransactionFailureDrawer: (state, { payload: displayTransactionFailureDrawer }: PayloadAction<boolean>) => {
      state.displayTransactionFailureDrawer = displayTransactionFailureDrawer;
    },
    setShowCardHubModal: (state, { payload: displayCardHubModal }: PayloadAction<boolean>) => {
      state.displayCardHubModal = displayCardHubModal;
    },
    setShowAddStuffSaveAccountModal: (state, { payload: { displayAddStuffSaveAccountModal, addStuffSaveAccountModalType } }: PayloadAction<IAddStuffSaveAccountModal>) => {
      state.addStuffSaveAccountModal = {
        displayAddStuffSaveAccountModal,
        addStuffSaveAccountModalType,
      };
    },
    setShowStuffSaveAccountErrorModal: (state, { payload: displayStuffSaveAccountErrorModal }: PayloadAction<boolean>) => {
      state.displayStuffSaveAccountErrorModal = displayStuffSaveAccountErrorModal;
    },
    setIsMenuDataLoading: (state, { payload: isMenuDataLoading }: PayloadAction<boolean>) => {
      state.isMenuDataLoading = isMenuDataLoading;
    },
    setCashAccountModalType: (state, { payload: cashAccountModalType }: PayloadAction<string>) => {
      state.cashAccountModalType = cashAccountModalType;
    },
    setDisplayPercPlaysInfoModal: (state, { payload: displayPercPlaysInfoModal }: PayloadAction<boolean>) => {
      state.displayPercPlaysInfoModal = displayPercPlaysInfoModal;
    },
    setShowAdditionalInformationModal: (state, { payload: { displayAdditionalInformationModal, additionalInformationModalType } }: PayloadAction<IAdditionalInformationModal>) => {
      state.displayAdditionalInformationModal = displayAdditionalInformationModal;
      if (additionalInformationModalType) state.additionalInformationModalType = additionalInformationModalType;
    },
    setMenuData: (state, { payload }: PayloadAction<IMenuData>) => {
      state.mainMenuData = payload.popup;
      state.navigationBarData = payload.horizontal;
    },
    setShowTenxPayModal: (state, { payload: { displayTenxPayModal, tenxPayModalType } }: PayloadAction<ITenxPayModal>) => {
      state.tenxPayModal = {
        displayTenxPayModal,
        tenxPayModalType,
      };
    },
    setShowTransferAddNote: (state, { payload: displayTransferAddNote }: PayloadAction<boolean>) => {
      state.displayTransferAddNote = displayTransferAddNote;
    },
    setTransferSelector: (state, { payload: { displayTransferSelector, transferSelectorType } }: PayloadAction<ITransferSelectorSheet>) => {
      state.transferSelector = {
        displayTransferSelector,
        transferSelectorType,
      };
    },
    setShowConfirmTransferSheet: (state, { payload: displayConfirmTransferSheet }: PayloadAction<boolean>) => {
      state.displayConfirmTransferSheet = displayConfirmTransferSheet;
    },
    setShowSuccessTransferSheet: (state, { payload: displaySuccessTransferSheet }: PayloadAction<boolean>) => {
      state.displaySuccessTransferSheet = displaySuccessTransferSheet;
    },
    setShowTransferErrorModal: (state, { payload: displayTransferErrorModal }: PayloadAction<boolean>) => {
      state.displayTransferErrorModal = displayTransferErrorModal;
    },
    setShowTransferToSheet: (state, { payload: displayTransferToSheet }: PayloadAction<boolean>) => {
      state.displayTransferToSheet = displayTransferToSheet;
    },
    setShowEmploymentStatusSelectorSheet: (state, { payload: displayEmploymentStatusSelectorSheet }: PayloadAction<boolean>) => {
      state.displayEmploymentStatusSelectorSheet = displayEmploymentStatusSelectorSheet;
    },
    setShowAnnualIncomeSelectorSheet: (state, { payload: displayAnnualIncomeSelectorSheet }: PayloadAction<boolean>) => {
      state.displayAnnualIncomeSelectorSheet = displayAnnualIncomeSelectorSheet;
    },
    setProfileEmailVerificationSheet: (state, { payload: { displayProfileEmailVerificationSheet, currentEmail, transactionId } }: PayloadAction<IProfileEmailVerificationSheet>) => {
      state.profileEmailVerificationSheet = {
        displayProfileEmailVerificationSheet,
        currentEmail,
        transactionId,
      };
    },
    setProfilePhoneVerificationSheet: (state, { payload: { displayProfilePhoneVerificationSheet, currentPhone, transactionId } }: PayloadAction<IProfilePhoneVerificationSheet>) => {
      state.profilePhoneVerificationSheet = {
        displayProfilePhoneVerificationSheet,
        currentPhone,
        transactionId,
      };
    },
    setShowAddMoneySheet: (state, { payload: displayAddMoneySheet }: PayloadAction<boolean>) => {
      state.displayAddMoneySheet = displayAddMoneySheet;
    },
    setShowComingSoonModal: (state, { payload: displayComingSoonModal }: PayloadAction<boolean>) => {
      state.displayComingSoonModal = displayComingSoonModal;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getMenuData.matchFulfilled, (state, { payload }: PayloadAction<IMenuData>) => {
      state.mainMenuData = payload.popup;
      state.navigationBarData = payload.horizontal;
    });
  },
});

export const selectIsDesktopSize = (state: RootState) => state.ui.isDesktopSize;
export const selectLoginClicked = (state: RootState) => state.ui.loginClicked;
export const selectDisplayChat = (state: RootState) => state.ui.displayChat;
export const selectDisplayCardHubModal = (state: RootState) => state.ui.displayCardHubModal;
export const selectDisplayCashOpeningExitModal = (state: RootState) => state.ui.displayCashOpeningExitModal;
export const selectDisplaySubscriptionsModal = (state: RootState) => state.ui.displaySubscriptionsModal;
export const selectSubscriptionsModalType = (state: RootState) => state.ui.subscriptionModalType;
export const selectSubscriptionAdditional = (state: RootState) => state.ui.subscriptionAdditional;
export const selectDisplayChangePasswordModal = (state: RootState) => state.ui.displayChangePasswordModal;
export const selectEnrollModalData = (state: RootState) => state.ui.enrollModal;
export const selectHeaderTitle = (state: RootState) => state.ui.headerTitle;
export const selectDisplaySortByDrawer = (state: RootState) => state.ui.displaySortByDrawer;
export const selectDisplayDestinationAccountDrawer = (state: RootState) => state.ui.displayDestinationAccountDrawer;
export const selectDisplayDateRangeDrawer = (state: RootState) => state.ui.displayDateRangeDrawer;
export const selectDisplayHistoryFiltertDrawer = (state: RootState) => state.ui.displayHistoryFilterDrawer;
export const selectMainMenuData = (state: RootState) => state.ui.mainMenuData;
export const selectNavigationBarData = (state: RootState) => state.ui.navigationBarData;
export const selectShowTransactionFailureDrawer = (state: RootState) => state.ui.displayTransactionFailureDrawer;
export const selectDisplayAddStuffSaveAccountModal = (state: RootState) => state.ui.addStuffSaveAccountModal;
export const selectDisplayStuffSaveAccountErrorModal = (state: RootState) => state.ui.displayStuffSaveAccountErrorModal;
export const selectAdditionalInformationModalType = (state: RootState) => state.ui.additionalInformationModalType;
export const selectDisplayAdditionalInformationModalType = (state: RootState) => state.ui.displayAdditionalInformationModal;
export const selectDisplayPercPlaysInfoModal = (state: RootState) => state.ui.displayPercPlaysInfoModal;
export const selectDisplayTenxPayModal = (state: RootState) => state.ui.tenxPayModal;
export const selectDisplayTransferToSheet = (state: RootState) => state.ui.displayTransferToSheet;
export const selectDisplayEmploymentStatusSelectorSheet = (state: RootState) => state.ui.displayEmploymentStatusSelectorSheet;
export const selectDisplayAnnualIncomeSelectorSheet = (state: RootState) => state.ui.displayAnnualIncomeSelectorSheet;
export const selectProfileEmailVerificationSheet = (state: RootState) => state.ui.profileEmailVerificationSheet;
export const selectProfilePhoneVerificationSheet = (state: RootState) => state.ui.profilePhoneVerificationSheet;
export const selectDisplayAddMoneySheet = (state: RootState) => state.ui.displayAddMoneySheet;
export const selectDisplayComingSoonModal = (state: RootState) => state.ui.displayComingSoonModal;

export const {
  setShowChat,
  setShowCashOpeningExitModal,
  setLoginClicked,
  setIsDesktopSize,
  setShowSubscriptionsModal,
  setShowChangePasswordModal,
  setShowEnrollModal,
  setHeaderTitle,
  setShowSortByDrawer,
  setShowDestinationAccountDrawer,
  setShowDateRangeDrawer,
  setShowHistoryFilterDrawer,
  setShowTransactionFailureDrawer,
  setShowCardHubModal,
  setShowAddStuffSaveAccountModal,
  setShowStuffSaveAccountErrorModal,
  setShowAdditionalInformationModal,
  setDisplayPercPlaysInfoModal,
  setMenuData,
  setShowTenxPayModal,
  setShowTransferToSheet,
  setShowEmploymentStatusSelectorSheet,
  setShowAnnualIncomeSelectorSheet,
  setProfileEmailVerificationSheet,
  setProfilePhoneVerificationSheet,
  setShowAddMoneySheet,
  setShowComingSoonModal,
} = uiSlice.actions;

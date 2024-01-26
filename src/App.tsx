import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@trulioo/docv/style.css';
import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useNavHistory } from 'utils/hooks/useNavHistory';
import { ROUTES } from 'vars/const/ROUTES';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { MainLayout } from 'components/layouts/MainLayout/MainLayout';
import { AuthLayout } from 'components/layouts/AuthLayout/AuthLayout';
import { TransitionLayout } from 'components/layouts/TransitionLayout/TransitionLayout';
import { PrivateRoute } from 'components/routing/PrivateRoute';
import { PublicRoute } from 'components/routing/PublicRoute';
import { GridDesignLayout } from 'components/layouts/Design/GridDesignLayout/GridDesignLayout';
import { RegistrationPage } from 'views/Auth/Registration/RegistrationPage/RegistrationPage';
import { LoginPage } from 'views/Auth/Login/LoginPage/LoginPage';
import { ForgotPasswordPage } from 'views/Auth/ForgotPasswordPage/ForgotPasswordPage';
import { SuccessPage } from 'views/Auth/SuccessPage/SuccessPage';
import { MyIdSuccess } from 'views/OpenCashAccount/MyIdPage/ResultsPage/MyIdSuccess/MyIdSuccess';
import { MyIdPending } from 'views/OpenCashAccount/MyIdPage/ResultsPage/MyIdPending/MyIdPending';
import { MyIdMatch } from 'views/OpenCashAccount/MyIdPage/ResultsPage/MyIdMatch/MyIdMatch';
import { Welcome } from 'views/Auth/Welcome/Welcome';
import { ChangePasswordPage } from 'views/Auth/ChangePasswordPage/ChangePasswordPage';
import { MainPage } from 'views/Main/MainPage/MainPage';
import { ProfilePage } from 'views/Profile/ProfilePage/ProfilePage';
import { MoveMoneyMainPage } from 'views/MoveMoney/MoveMoneyMainPage/MoveMoneyMainPage';
import { PrepPage } from 'views/OpenCashAccount/PrepPage/PrepPage';
import { AcceptInvite } from 'views/OpenCashAccount/AcceptInvite/AcceptInvite';
import { AccountStatementsIframe } from 'views/StatementsAndDocuments/AccountStatementsIframe/AccountStatementsIframe';
import { StarterPage } from 'views/OpenCashAccount/StarterPage/StarterPage';
import { TableOfContentPage } from 'views/OpenCashAccount/TableOfContentPage/TableOfContentPage';
import { MyIdPage } from 'views/OpenCashAccount/MyIdPage/MyIdPage';
import { TenxLayout } from 'components/layouts/TenxLayout/TenxLayout';
import { Disclosures } from 'views/OpenCashAccount/MyInfo/DisclosuresPage/Disclosures';
import { NamePage } from 'views/OpenCashAccount/MyInfo/NamePage/NamePage';
import { AddressPage } from 'views/OpenCashAccount/MyInfo/AddressPage/AddressPage';
import { EmailPage } from 'views/OpenCashAccount/MyInfo/EmailPage/EmailPage';
import { EditAgePage } from 'views/OpenCashAccount/MyInfo/AgeTaxPage/EditAgePage/EditAgePage';
import { SmsCodePage } from 'views/OpenCashAccount/MyInfo/EmailPage/SmsCodePage/SmsCodePage';
import { MyDetailsPage } from 'views/OpenCashAccount/MyInfo/MyDetailsPage/MyDetailsPage';
import { EditTaxIdPage } from 'views/OpenCashAccount/MyInfo/AgeTaxPage/EditTaxIdPage/EditTaxIdPage';
import { SummaryPage } from 'views/OpenCashAccount/MyInfo/SummaryPage/SummaryPage';
import { VerificationStatusPage } from 'views/OpenCashAccount/MyInfo/SummaryPage/VerificationStatusPage';
import { TruliooLayout } from 'views/OpenCashAccount/MyIdPage/TruliooLayout/TruliooLayout';
import { EnrollPage } from 'views/TenxPay/Enroll/EnrollPage';
import { TermsAndConditionsPage } from 'views/TenxPay/TermsAndConditions/TermsAndConditionsPage';
import { SubscriptionsPage } from 'views/Subscriptions/SubscriptionsPage';
import { AccountApprovedPage } from 'views/TenxPay/AccountApproved/AccountApprovedPage';
import { EmailVerificationPage } from 'views/TenxPay/EmailVerification/EmailVerificationPage';
import { VerificationCodePage } from 'views/TenxPay/VerificationCode/VerificationCodePage';
import { HomePage } from 'views/TenxPay/Home/HomePage';
import { HistoryPage } from 'views/TenxPay/History/HistoryPage';
import { SecurityAndPrivacy } from 'views/SecurityAndPrivacy/SecurityAndPrivacy';
import { SuccessfulStuffSaveAccountPage } from 'views/Main/MainPage/StuffSaveAccount/SuccessfulStuffSaveAccountPage';
import { DirectDepositPage } from 'views/Transactions/DirectDeposit/DirectDepositPage';
import { StartDepositPage } from 'views/Transactions/DirectDeposit/StartDeposit/StartDepositPage';
import { WishListLayout } from 'components/layouts/WishListLayout/WishListLayout';
import { NotificationsAndAlertsPage } from 'views/NotificationsAndAlerts/NotificationsAndAlertsPage';
import { DisclosuresPage } from 'views/Profile/Disclosures/DisclosuresPage';
import { StatementsAndDocumentsPage } from 'views/StatementsAndDocuments/StatementsAndDocuments';
import { NewSourceAndFunds } from 'views/MoveMoney/NewSourceAndFunds/NewSourceAndFunds';
import { AddNewSourceIframe } from 'views/MoveMoney/AddMoneyPage/AddNewSourceSection/AddNewSourceIframe/AddNewSourceIframe';
import { AddNewBankAccountPage } from 'views/MoveMoney/NewSourceAndFunds/AddNewSourceSection/AddNewBankAccountPage/AddNewBankAccountPage';
import { FundsPage } from 'views/MoveMoney/NewSourceAndFunds/FundsPage/FundsPage';
import { HelpAndSupport } from 'views/HelpAndSupport/HelpAndSupport';
import { InternalTransferPage } from 'views/Account/Summary/InternalTransfer/InternalTransferPage';
import { AddNeedsGoalsPage } from 'views/Main/MainPage/Accounts/AddNeedsGoals/AddNeedsGoalsPage';
import { AddSuccessPage } from 'views/Main/MainPage/Accounts/AddNeedsGoals/AddSuccessPage';
import { AccountInformationPage } from 'views/Account/AccountInformation/AccountInformationPage';
import { MoveMoneyOnboardingPage } from 'views/MoveMoneyOnboardingPage/MoveMoneyOnboardingPage';
import { SelectedAccountInformationPage } from 'views/Account/AccountInformation/SelectedAccountInformationPage';
import { QuestionSearchPage } from 'views/HelpAndSupport/Search/QuestionSearchPage';
import { PennyJarPage } from 'views/Account/PennyJar/PennyJarPage';
import { PennyJarSetupPage } from 'views/Account/PennyJar/PennyJarSetupPage';
import { PennyJarActivatePage } from 'views/Account/PennyJar/PennyJarActivatePage';
import { DepositOnboardPage } from 'views/Transactions/DirectDeposit/DepositOnboard/DepositOnboardPage';
import { UploadDocumentPage } from 'views/Documents/UploadDocument/UploadDocumentPage';
import { ForgotPasswordCodePage } from 'views/Auth/ForgotPasswordPage/ForgotPasswordCodePage/ForgotPasswordCodePage';
import { ATMLocationsPage } from 'views/MoveMoney/ATMLocations/ATMLocationsPage';
import { OnboardingFristStepsPage } from 'views/Onboarding/FirstSteps/OnboardingFristStepsPage';
import { LanguageSelectionPage } from 'views/Onboarding/LanguageSelection/LanguageSelectionPage';
import { JointAccountsPage } from 'views/OpenCashAccount/MyAccount/JointAccounts/JointAccountsPage';
import { SetUpDepositPage } from 'views/Transactions/DirectDeposit/SetUpDeposit/SetUpDepositPage';
import { SetupBiometricPage } from 'views/Auth/Registration/SetupBiometricPage/SetupBiometricPage';
import { TruliooUploadPage } from 'views/OpenCashAccount/TruliooUploadPage';
import { NotificationsCenterPage } from 'views/NotificationsCenter/NotificationsCenterPage';
import { NotificationItemPage } from 'views/NotificationsCenter/NotificationItemPage';
import { RegistrationCodePage } from './views/Auth/Registration/RegistrationCodePage/RegistrationCodePage';
import { ProductsInterestsPage } from './views/ProductsInterests/ProductsInterestsPage/ProductsInterestsPage';
import { BalancesTransactionsPage } from './views/Account/BalancesTransactionsPage/BalancesTransactionsPage';
import { MenuPage } from './views/MenuPage/MenuPage';
import { WellnessPage } from './views/Wellness/WellnessPage';
import { OnboardingPage } from './views/Onboarding/OnboardingPage/OnboardingPage';
import { Attune } from './views/Wellness/Attune/Attune';
import { PlayPercUp } from './views/Wellness/PlayPercUp/PlayPercUp';
import { InviteAndEarnPage } from './views/Invite/InviteAndEarnPage/InviteAndEarn';
import { IFrameLayout } from './components/layouts/IFrameLayout/IFrameLayout';
import { DeviceVerifyPage } from './views/Auth/Login/DeviceVerifyPage/DeviceVerifyPage';
import { DeviceVerifyWarningPage } from './views/Auth/Login/DeviceVerifyWarningPage/DeviceVerifyWarningPage';
import { EnableThreeGreatFeaturesPage } from './views/EnableThreeGreatFeatures/EnableThreeGreatFeaturesPage';
import { useLanguage } from './utils/hooks/useLanguage';
import { UserDataSentPage } from './views/Auth/Login/UsernameSentPage/UsernameSentPage';

export const App = () => {
  const location = useLocation();
  const { isDesktopSize } = useDeviceDimension();
  useLanguage(true);
  useNavHistory(location.pathname);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Navigate to={ROUTES.login.path} replace />} />
      <Route element={<PublicRoute />}>
        {/* Dummy page for mobile app authentication */}
        <Route path={ROUTES.auth.path} element={<div />} />
        <Route path={ROUTES.app.path} element={<div />} />
        <Route path={ROUTES.onboardingLanguageSelection.path} element={<LanguageSelectionPage />} />
        <Route path={ROUTES.onboarding.path} element={<Welcome />} />
        <Route path={ROUTES.truliooUpload.path} element={<TruliooUploadPage />} />
        <Route path={ROUTES.statementsIframe.path} element={<AccountStatementsIframe />} />

        <Route element={<AuthLayout altLayout="v2" />}>
          <Route element={<TransitionLayout />}>
            <Route path={ROUTES.login.path} element={<LoginPage />} />
          </Route>
        </Route>

        <Route element={<AuthLayout altLayout="v2" tabletWidth="80%" showHeader={false} />}>
          <Route element={<TransitionLayout />}>
            <Route path={ROUTES.onboardingFirstSteps.path} element={<OnboardingFristStepsPage />} />
            <Route path={ROUTES.onboardingHome.path} element={<OnboardingPage />} />
          </Route>
        </Route>

        <Route element={<AuthLayout altLayout={isDesktopSize ? 'v2' : ''} />}>
          <Route element={<TransitionLayout />}>
            <Route element={<GridDesignLayout />}>
              <Route path={ROUTES.registration.path} element={<RegistrationPage />} />
              <Route path={ROUTES.registrationCode.path} element={<RegistrationCodePage />} />
              <Route path={ROUTES.setupBiometric.path} element={<SetupBiometricPage />} />
              <Route path={ROUTES.forgotPassword.path} element={<ForgotPasswordPage />} />
              <Route path={ROUTES.forgotPasswordCode.path} element={<ForgotPasswordCodePage />} />
              <Route path={ROUTES.forgotDataUsernameSent.path} element={<UserDataSentPage type="username" />} />
              <Route path={ROUTES.forgotDataInformationSent.path} element={<UserDataSentPage type="information" />} />
              <Route path={ROUTES.success.path} element={<SuccessPage />} />
              <Route path={ROUTES.changePassword.path} element={<ChangePasswordPage />} />
              <Route path={ROUTES.verifyDeviceWarning.path} element={<DeviceVerifyWarningPage />} />
              <Route path={ROUTES.verifyDevice.path} element={<DeviceVerifyPage />} />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route element={<TenxLayout />}>
        <Route element={<TransitionLayout />}>
          <Route element={<GridDesignLayout />}>
            <Route path={ROUTES.prep.path} element={<PrepPage />} />
            <Route path={ROUTES.acceptInvite.path} element={<AcceptInvite />} />
          </Route>
        </Route>
      </Route>

      <Route path="/" element={<PrivateRoute />}>
        {/* Onboarding welcome screen */}

        <Route path={ROUTES.welcome.path} element={<Welcome />} />

        {/* Onboarding welcome screen */}
        <Route element={<MainLayout headerTitle="Tenx Pay" />}>
          <Route element={<TransitionLayout />}>
            <Route element={<GridDesignLayout />}>
              <Route path={ROUTES.termsAndConditions.path} element={<TermsAndConditionsPage />} />
              <Route path={ROUTES.accountApproved.path} element={<AccountApprovedPage />} />
              <Route path={ROUTES.emailVerification.path} element={<EmailVerificationPage />} />
              <Route path={ROUTES.verificationCode.path} element={<VerificationCodePage />} />
              <Route path={ROUTES.tenxPayBalance.path} element={<HomePage />} />
              <Route path={ROUTES.tenxPayHistory.path} element={<HistoryPage />} />
            </Route>
          </Route>
        </Route>

        {/* Onboarding welcome screen */}
        <Route element={<MainLayout headerTitle="Tenx Pay" />}>
          <Route element={<TransitionLayout />}>
            <Route element={<GridDesignLayout noContentPadding />}>
              <Route path={ROUTES.enroll.path} element={<EnrollPage />} />
            </Route>
          </Route>
        </Route>

        {/* Account opening screens */}
        <Route element={<MainLayout headerTitle="Cash Account Opening" />}>
          <Route element={<TransitionLayout />}>
            <Route element={<GridDesignLayout />}>
              <Route path={ROUTES.openAccountMain.path} element={<TableOfContentPage />} />
              <Route path={ROUTES.myInfoEConsent.path} element={<Disclosures />} />
              <Route path={ROUTES.myId.path} element={<MyIdPage />} />
              <Route path={ROUTES.internalTransfer.path} element={<InternalTransferPage />} />
              <Route path={ROUTES.uploadDocument.path} element={<UploadDocumentPage />} />
              <Route path={ROUTES.myAccountJointAccounts.path} element={<JointAccountsPage />} />
              <Route path={ROUTES.myInfoDisclosures.path} element={<Disclosures />} />
              <Route path={ROUTES.myInfoName.path} element={<NamePage />} />
              <Route path={ROUTES.myInfoHomeAddress.path} element={<AddressPage />} />
              <Route path={ROUTES.myInfoEmailUsername.path} element={<EmailPage />} />
              <Route path={ROUTES.myInfoVerifySms.path} element={<SmsCodePage />} />
              <Route path="/open-account/my-info/age-tax" element={<Navigate replace to={ROUTES.myInfoAge.path} />} />
              <Route path={ROUTES.myInfoAge.path} element={<EditAgePage />} />
              <Route path={ROUTES.myInfoAdditionalDetails.path} element={<MyDetailsPage />} />
              <Route path={ROUTES.myInfoTaxId.path} element={<EditTaxIdPage />} />
              <Route path={ROUTES.myInfoSummary.path} element={<SummaryPage />} />
              <Route path={ROUTES.myInfoVeriticationResult.path} element={<VerificationStatusPage />} />
            </Route>
          </Route>
        </Route>

        {/* With slider */}
        <Route element={<MainLayout noContentPadding headerTitle="Cash Account Opening" />}>
          <Route element={<TransitionLayout />}>
            <Route element={<GridDesignLayout />}>
              <Route path={ROUTES.balancesTransactions.path} element={<BalancesTransactionsPage />} />
            </Route>
          </Route>
        </Route>

        <Route element={<MainLayout />}>
          <Route element={<TransitionLayout />}>
            <Route path={ROUTES.attune.path} element={<Attune />} />
            <Route path={ROUTES.addNewSourceDebit.path} element={<AddNewSourceIframe />} />
            <Route path={ROUTES.starter.path} element={<StarterPage />} />
            <Route path={ROUTES.addNeedsGoalsAccount.path} element={<AddNeedsGoalsPage />} />
            <Route element={<GridDesignLayout />}>
              <Route path={ROUTES.addNewBankAccount.path} element={<AddNewBankAccountPage />} />
              <Route path={ROUTES.home.path} element={<MainPage />} />
              <Route path={ROUTES.mainMenu.path} element={<MenuPage />} />
              <Route path={ROUTES.securityPrivacy.path} element={<SecurityAndPrivacy />} />
              <Route path={ROUTES.successAddNeedsGoalsAccount.path} element={<AddSuccessPage />} />
              <Route path={ROUTES.accountInformation.path} element={<AccountInformationPage />} />
              <Route path={ROUTES.selectedAccountInformation.path} element={<SelectedAccountInformationPage />} />
              <Route path={ROUTES.profile.path} element={<ProfilePage />} />
              <Route path={ROUTES.helpAndSupport.path} element={<HelpAndSupport />} />
              <Route path={ROUTES.disclosures.path} element={<DisclosuresPage />} />
              <Route path={ROUTES.statementsAndDocuments.path} element={<StatementsAndDocumentsPage />} />
              <Route path={ROUTES.notificationSettings.path} element={<NotificationsAndAlertsPage />} />
              <Route path={ROUTES.notificationsCenter.path} element={<NotificationsCenterPage />} />
              <Route path={ROUTES.notificationsCenterItem.path} element={<NotificationItemPage />} />
              <Route path={ROUTES.invite.path} element={<InviteAndEarnPage />} />
              <Route path={ROUTES.successfulAccountOpen.path} element={<SuccessfulStuffSaveAccountPage />} />
              <Route path={ROUTES.depositOnboard.path} element={<DepositOnboardPage />} />
              <Route path={ROUTES.directDeposit.path} element={<DirectDepositPage />} />
              <Route path={ROUTES.startDeposit.path} element={<StartDepositPage />} />
              <Route path={ROUTES.setUpDeposit.path} element={<SetUpDepositPage />} />
              <Route path={ROUTES.subscriptions.path} element={<SubscriptionsPage />} />
              <Route path={ROUTES.myIdSuccess.path} element={<MyIdSuccess />} />
              <Route path={ROUTES.myIdPending.path} element={<MyIdPending />} />
              <Route path={ROUTES.myIdMatch.path} element={<MyIdMatch />} />
              <Route path={ROUTES.helpAndSupportSearch.path} element={<QuestionSearchPage />} />
              <Route path={ROUTES.pennyJar.path} element={<PennyJarPage />} />
              <Route path={ROUTES.pennyJarSetup.path} element={<PennyJarSetupPage />} />
              <Route path={ROUTES.pennyJarActivate.path} element={<PennyJarActivatePage />} />
              <Route path={ROUTES.moveMoneyOnboarding.path} element={<MoveMoneyOnboardingPage />} />
            </Route>
          </Route>
        </Route>

        <Route element={<IFrameLayout />}>
          <Route element={<TransitionLayout />}>
            <Route path={ROUTES.playPercUp.path} element={<PlayPercUp />} />
          </Route>
        </Route>

        <Route element={<MainLayout />}>
          <Route element={<GridDesignLayout />}>
            <Route path={ROUTES.wellnessQuestion.path} element={<WellnessPage />} />
          </Route>

          <Route element={<TransitionLayout />}>
            <Route element={<GridDesignLayout />}>
              <Route path={ROUTES.moveMoney.path} element={<MoveMoneyMainPage />} />
              <Route path={ROUTES.addMoney.path} element={<NewSourceAndFunds />} />
              <Route path={ROUTES.sendMoneyPage.path} element={<NewSourceAndFunds isSendType />} />
              <Route path={ROUTES.addFunds.path} element={<FundsPage />} />
              <Route path={ROUTES.sendFunds.path} element={<FundsPage isSendType />} />
              <Route path={ROUTES.enableThreeGreatFeatures.path} element={<EnableThreeGreatFeaturesPage />} />
              <Route path={ROUTES.atmLocations.path} element={<ATMLocationsPage />} />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route element={<TransitionLayout />}>
        <Route element={<WishListLayout />}>
          <Route path={ROUTES.productsInterests.path} element={<ProductsInterestsPage />} />
        </Route>
      </Route>

      <Route element={<TransitionLayout />}>
        <Route path={ROUTES.truliooTransaction.path} element={<TruliooLayout />} />
      </Route>
    </Routes>
  );
};

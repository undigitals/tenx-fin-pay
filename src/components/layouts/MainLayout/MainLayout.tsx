import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavigationBar } from 'components/navigation/NavigationBar/NavigationBar';
import { useAppDispatch } from 'utils/hooks/store';
import { setHeaderTitle } from 'store/ui.slice';
import { PageHeader } from 'components/navigation/PageHeader/PageHeader';
import { useRouteConfig } from 'utils/hooks/useRouteConfig';
import { SortBySheet } from 'components/general/BottomDrawers/SortBySheet/SortBySheet';
import { DestinationAccountSheet } from 'components/general/BottomDrawers/DestinationAccountSheet/DestinationAccountSheet';
import { DateRangeSheet } from 'components/general/BottomDrawers/DateRangeSheet/DateRangeSheet';
import { HistoryFilterSheet } from 'components/general/BottomDrawers/HistoryFilterSheet/HistoryFilterSheet';
import { CardHubModal } from 'components/general/Modals/CardHubModal/CardHubModal';
import { AddStuffSaveAccountModal } from 'components/general/Modals/AddStuffSaveAccountModal/AddStuffSaveAccountModal';
import { StuffSaveAccountErrorModal } from 'components/general/Modals/AddStuffSaveAccountModal/StuffSaveAccountErrorModal';
import { AdditionalInformationModal } from 'components/general/Modals/AdditionalInformationHandler/AdditionalInformationHandler';
import { TenxPlaysInfoModal } from 'components/general/Modals/TenxPlaysInfoModal/TenxPlaysInfoModal';
import { SubscriptionsModal } from 'components/general/Modals/SubscriptionsModal/SubscriptionsModal';
import { TenxPayModal } from 'components/general/Modals/TenxPayModal/TenxPayModal';
import { EnrollModal } from 'components/general/Modals/EnrollModal/EnrollModal';
import { CashOpeningExitModal } from 'components/general/Modals/CashOpeningExitModal/CashOpeningExitModal';
import { ChatSheet } from 'components/general/BottomDrawers/ChatSheet/ChatSheet';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { AddMoneySheet } from 'views/Main/MainPage/Accounts/AddMoneySheet/AddMoneySheet';
import { ComingSoonModal } from 'views/MoveMoney/MoveMoneyMainPage/ComingSoonModal';
import clsx from 'clsx';
import { ROUTES } from 'vars/const/ROUTES';
import { SContentWrapper, SLayout, SLayoutContent } from './MainLayout.styles';
import { IMainLayout } from './MainLayout.types';
import { Header } from './Header';

export const MainLayout: React.FC<IMainLayout> = ({ noContentPadding = false, headerTitle = '' }) => {
  const { isDesktopSize } = useDeviceDimension();
  const wrapperRef = useRef(null);
  const { noBottomNav, noLeftNav, isRoundedDesktopLeftNav } = useRouteConfig();
  const [isShadowVisible, setIsShadowVisible] = useState(true);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const contentBgColor = (path: string) => {
    switch (path) {
      case ROUTES.attune.path:
        return 'white';
      default:
        return 'cream70';
    }
  };

  const onScroll = () => {
    if (wrapperRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = wrapperRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setIsShadowVisible(false);
      } else {
        setIsShadowVisible(true);
      }
    }
  };

  useEffect(() => {
    dispatch(setHeaderTitle(''));
  }, []);

  /*
   * Do not merge Header and PageHeader into one component, they are distinct for a reason.
   * Header is _the_ header of the application, PageHeader is _a_ header of a specific page.
   * Ideally, the document structure should be as follows:
   * <body>
   *   // The header of the application
   *   <header><h1>Tenx</h1></header>
   *   <main>
   *     // Page header
   *     <header><h2>Home</h2></header>
   *   </main>
   * </body>
   */
  return (
    <SLayout className="main-layout">
      {isDesktopSize ? <Header /> : <PageHeader headerTitle={headerTitle} />}
      <SLayoutContent id="container" className={clsx('layout-content', !noBottomNav && 'nav')} background={contentBgColor(pathname)}>
        {(!noBottomNav || isDesktopSize) && !noLeftNav && <NavigationBar isShadowVisible={isShadowVisible} />}

        <SContentWrapper noContentPadding={noContentPadding || isRoundedDesktopLeftNav} onScroll={onScroll} ref={wrapperRef}>
          <Outlet />
        </SContentWrapper>

        {/* --- Modals block --- */}
        <CashOpeningExitModal />
        <CardHubModal />
        <EnrollModal />
        <AddStuffSaveAccountModal />
        <StuffSaveAccountErrorModal />
        <AdditionalInformationModal />
        <SubscriptionsModal />
        <TenxPayModal />
        <TenxPlaysInfoModal />
        <ComingSoonModal />

        {/* --- Sheets block --- */}
        <SortBySheet />
        <DestinationAccountSheet />
        <DateRangeSheet />
        <HistoryFilterSheet />
        <ChatSheet />
        <AddMoneySheet />
      </SLayoutContent>
    </SLayout>
  );
};

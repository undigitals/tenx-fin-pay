import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { lsGetItem } from 'utils/helpers/storage';
import { urlString } from 'utils/helpers/urlString/urlString';
import { useTranslation } from 'react-i18next';
import { mobileApiCall } from 'services/mobileService';
import { ROUTES } from 'vars/const/ROUTES';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { Title, BodyText } from 'components/general/Typography';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { Icon } from 'components/general/Icon/Icon';
import { Loader } from 'components/general/Loader/Loader';
import { SPage } from 'views/Main/MainPage/MainPage.styles';
import { SIframeCloseButton, SIFrame } from 'views/TenxPay/Home/Home.styles';
import { useLazyGetEstatementIframeUrlQuery } from 'store/user/authentication.api';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { StatementItem } from './StatementItem';

interface IStatements {
  title: string;
  url: string;
}

const statements: IStatements[] = [{ title: 'Account Statements', url: '' }];

export const StatementsAndDocumentsPage = () => {
  const { t } = useTranslation();
  const [iFrameTitle, setIFrameTitle] = useState('');
  const [iFrameUrl, setIFrameUrl] = useState('');
  const [isIframeOpen, setIsIframeOpen] = useState(false);
  const [iFrameIsLoading, setIFrameIsLoading] = useState(true);
  const [getEstatementIframeUrl] = useLazyGetEstatementIframeUrlQuery();
  const { preferredName } = useSelector(selectCurrentUser) || {};

  const handleOpenIframe = async (isOpen: boolean, title: string) => {
    const isMobileApp = lsGetItem('isMobileApp');
    getEstatementIframeUrl()
      .unwrap()
      .then((res) => {
        if (isMobileApp) {
          const browserData = {
            url: res,
            inApp: false,
          };
          mobileApiCall('showFullBrowser', JSON.stringify(browserData));
        } else {
          if (title === 'Account Statements') {
            const params = { iFrameUrl: res, iFrameTitle: title };
            window.open(urlString({ url: ROUTES.statementsIframe.path, params }), '_blank');
          } else {
            setIsIframeOpen(isOpen);
            setIFrameTitle(title);
            setIFrameUrl(res);
          }
        }
      });
  };

  const handleCloseIframe = () => {
    setIsIframeOpen(false);
    setIFrameTitle('');
    setIFrameUrl('');
  };

  const isPreferredName = preferredName !== undefined && preferredName.length > 0 ? `${String(preferredName)}'s ` : '';

  return (
    <SPage>
      {isIframeOpen ? (
        <CustomModal
          open={isIframeOpen}
          onCancel={handleCloseIframe}
          padding="10px"
          topPosition="0"
          closeIcon={
            <SIframeCloseButton>
              <Icon name="close" size="small" color="blue" />
            </SIframeCloseButton>
          }
        >
          {iFrameIsLoading && <Loader />}
          <SIFrame width="100%" height="100%" frameBorder="0" onLoad={() => setIFrameIsLoading(false)} title={String(iFrameTitle)} src={iFrameUrl} />
        </CustomModal>
      ) : (
        <>
          <Title font="Poppins" fontWeight="SB" size="S" color="charcoal">
            {t(`statementsDocuments.Statements & Documents`)}
          </Title>
          <BodyText textType="bodyText" fontWeight="R" color="charcoal70" size="M" marginTop={10}>
            {t(`statementsDocuments.You can find here statements and documents.`)}
          </BodyText>
          <BodyText textType="bodyText" fontWeight="B" color="charcoal" size="M" marginTop={35}>
            {isPreferredName}
            {t(`statementsDocuments.Statements & Documents`)}
          </BodyText>
          <CustomCard>
            {statements.map((item: IStatements, index: number) => (
              <StatementItem title={String(item.title)} key={item.url} index={index} handleOpenIframe={handleOpenIframe} />
            ))}
          </CustomCard>
        </>
      )}
    </SPage>
  );
};

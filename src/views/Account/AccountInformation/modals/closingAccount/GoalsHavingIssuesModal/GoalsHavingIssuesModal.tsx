import React from 'react';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { BodyText, Title } from 'components/general/Typography';
import { Trans, useTranslation } from 'react-i18next';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { cantOpenAccount } from 'assets/images';
import { IModalCommonProps } from 'views/Account/Summary/InternalTransfer/InternalTransferPage.types';
import { SContentLayout, SCustomButton } from './GoalsHavingIssuesModal.styles';

interface IModalProps extends IModalCommonProps {
  onConfirm: () => void;
}

export const GoalsHavingIssuesModal: React.FC<IModalProps> = ({ open, onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <CustomModal open={open} onClose={onClose} closable={false} topPosition="0">
      <SContentLayout>
        <img src={cantOpenAccount} alt="having-issues" style={{ width: 119, alignSelf: 'center', marginBottom: 32 }} />

        <Title size="M" fontWeight="M" marginBottom={18}>
          {t('accountInformation.HavingIssuesWithYourGoalsAccount')}
        </Title>

        <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" lineHeight={1.5} marginBottom={18}>
          <Trans
            i18nKey="accountInformation.IfYouAreFrustratedAndCantResolveAnIssue"
            components={{
              phone: (
                <a className="link-phone" href="tel: 888-302-5055">
                  888-302-5055
                </a>
              ),
            }}
          />
        </BodyText>

        <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" lineHeight={1.5} marginBottom={24}>
          {t('accountInformation.IfYouPreferToContinueClosing')}
        </BodyText>

        <ul className="list">
          <li>
            <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" lineHeight={1.5}>
              {t('accountInformation.TransferAnyRemainingFunds')}
            </BodyText>
          </li>

          <li>
            <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" lineHeight={1.5}>
              {t('accountInformation.EnsureThatAllYourTransactions')}
            </BodyText>
          </li>

          <li>
            <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" lineHeight={1.5}>
              {t('accountInformation.CancelOrMoveYourDirectDeposit')}
            </BodyText>
          </li>
        </ul>

        <BodyText textType="bodyText" fontWeight="B" size="M" color="charcoal" lineHeight={1.5} marginBottom={32}>
          {t('accountInformation.AreYouSureYouWantToContinue')}
        </BodyText>

        <CustomRow justifyContent="flex-end">
          <SCustomButton preset="red" size="xl" onClick={onClose} marginRight={10}>
            {t('accountInformation.Cancel')}
          </SCustomButton>
          <SCustomButton preset="primary-red" size="xl" onClick={onConfirm}>
            {t('accountInformation.Confirm')}
          </SCustomButton>
        </CustomRow>
      </SContentLayout>
    </CustomModal>
  );
};

// http://localhost:3000/account_information/selected

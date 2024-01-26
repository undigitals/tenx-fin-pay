import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { BodyText } from 'components/general/Typography';
import { ITenxPayHistoryItem } from 'vars/types/userInfo.types';
import { getFormattedDateFromString } from 'utils/helpers/dateHelpers';
import groupBy from 'lodash-es/groupBy';
import { format, parseISO, startOfDay } from 'date-fns';
import { EmptyHistory } from 'views/TenxPay/History/PageStatuses/EmptyHistory/EmptyHistory';
import { ErrorHistory } from 'views/TenxPay/History/PageStatuses/ErrorHistory/ErrorHistory';
import { ListItem } from './ListItem/ListItem';

interface ITransferHistory {
  transferHistory?: ITenxPayHistoryItem[];
  sortedByAmount: boolean;
  isError: boolean;
}

export const TransferHistory: React.FC<ITransferHistory> = ({ transferHistory, sortedByAmount, isError }) => {
  const { t } = useTranslation();
  const getExtendedTransferHistory = () => transferHistory?.filter((item) => item.type !== 'EMPLOYEES_FEE');
  const getItemFee = (uuid: string) => transferHistory?.find((item) => item.type === 'EMPLOYEES_FEE' && uuid === item.uuid)?.amount || 0;

  const extendedTransferHistory = getExtendedTransferHistory();

  const groupedTransferHistory = groupBy(extendedTransferHistory, (item) => {
    const formatWeek = format(startOfDay(parseISO(item.dateTime)), 'eee');
    const formatDaysMonth = getFormattedDateFromString(item.dateTime);
    return `${t(`tenxPayHome.${formatWeek}`)} ${formatDaysMonth}`;
  });

  return (
    <div>
      {!extendedTransferHistory?.length && !isError && <EmptyHistory isTransferHistory />}
      {isError && <ErrorHistory />}
      {!sortedByAmount &&
        !isError &&
        !!extendedTransferHistory?.length &&
        Object.keys(groupedTransferHistory)?.map((date) => (
          <React.Fragment key={date}>
            <BodyText textType="bodyText" font="Poppins" size="N" fontWeight="R" color="charcoal70" marginTop={22}>
              {date}
            </BodyText>

            <CustomCard marginBottom={10}>
              {groupedTransferHistory[date]?.map((history, index) => (
                <ListItem
                  icon={history.owned ? 'atmWithdrawal' : 'externalAccount'}
                  accountNickName={history.account}
                  amount={history.amount}
                  key={history.uuid}
                  first={index === 0}
                  last={index + 1 === groupedTransferHistory[date]?.length}
                  fee={getItemFee(history.uuid)}
                  accountType={history.accountType}
                  additionalData={history.additionalData}
                />
              ))}
            </CustomCard>
          </React.Fragment>
        ))}
      {sortedByAmount && !!extendedTransferHistory?.length && (
        <CustomCard marginBottom={10}>
          {extendedTransferHistory?.map((history, index) => (
            <ListItem
              icon={history.owned ? 'atmWithdrawal' : 'externalAccount'}
              accountNickName={history.account}
              amount={history.amount}
              key={history.uuid}
              first={index === 0}
              last={index + 1 === extendedTransferHistory?.length}
              fee={getItemFee(history.uuid)}
              accountType={history.accountType}
              additionalData={history.additionalData}
            />
          ))}
        </CustomCard>
      )}
    </div>
  );
};

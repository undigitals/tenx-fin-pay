import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { parseISO } from 'date-fns';
import { CustomAmount } from 'components/theme/CustomAmount/CustomAmount';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { ITimeEntriesItem } from 'vars/types/userInfo.types';
import { getFormattedDateFromString } from 'utils/helpers/dateHelpers';
import { BodyText } from 'components/general/Typography';
import { EmptyHistory } from 'views/TenxPay/History/PageStatuses/EmptyHistory/EmptyHistory';
import { ErrorHistory } from 'views/TenxPay/History/PageStatuses/ErrorHistory/ErrorHistory';
import { usePayments } from 'utils/hooks/usePayments';
import { ListItem } from './ListItem/ListItem';

interface ITimeCard {
  timeEntries: ITimeEntriesItem[];
  isError: boolean;
}

export const TimeCard: React.FC<ITimeCard> = ({ timeEntries, isError }) => {
  const { paymentsInfo } = usePayments();
  const { t } = useTranslation();
  const startDate = paymentsInfo.earnCicleStartDate || '';
  const endDate = paymentsInfo.earnCicleEndDate || '';
  const theme = useTheme();

  const formatDate = (start: string, end: string) => {
    const fStartDate = start ? getFormattedDateFromString(start) : '';
    const fEndDate = end ? getFormattedDateFromString(end) : '';
    return `(${fStartDate} - ${fEndDate})`;
  };

  const totalAmount = useMemo(() => timeEntries.reduce((acc, item) => acc + item.earned, 0), [timeEntries]);

  const totalHours = useMemo(() => {
    const seconds = timeEntries.reduce((acc, item) => acc + item.workedSeconds, 0);
    return Math.floor(seconds / 3600);
  }, [timeEntries]);

  const timeEntriesSortedByWorkDateDesc = useMemo(() => [...timeEntries].sort((a, b) => parseISO(b.workDate).getTime() - parseISO(a.workDate).getTime()), [timeEntries]);

  if (isError) {
    return <ErrorHistory />;
  }

  if (timeEntries.length === 0) {
    return <EmptyHistory />;
  }

  return (
    <>
      <CustomRow flexDirection="column" justifyContent="center" alignItems="flex-start" marginBottom={16} marginTop={32}>
        <BodyText color="charcoal" textType="bodyText" size="M" fontWeight="M">
          {t(`tenxPayHome.Pay Period Details`)}
        </BodyText>
        <BodyText color="charcoal60" textType="bodyText" size="N" fontWeight="R" marginTop={10}>
          {formatDate(startDate, endDate)}
        </BodyText>
      </CustomRow>

      <CustomRow>
        <CustomRow justifyContent="flex-start">
          <BodyText color="charcoal70" textType="bodyText" size="N" fontWeight="R">
            {t(`tenxPayHome.Total hours`)}
          </BodyText>
          <BodyText color="charcoal" textType="bodyText" size="N" fontWeight="R" marginLeft={5}>
            {totalHours}
          </BodyText>
        </CustomRow>
        <BodyText color="charcoal70" textType="bodyText" size="N" fontWeight="R">
          {t(`tenxPayHome.Total amount`)} <CustomAmount amount={totalAmount} size="smallerStrong" sign />
        </BodyText>
      </CustomRow>

      <CustomCard border={`2px solid ${theme.charcoal5}`}>
        {timeEntriesSortedByWorkDateDesc.map((item, index) => (
          <ListItem time={item.workedSeconds} date={item.workDate} amount={item.earned} first={index === 0} last={index + 1 === timeEntries.length} key={`${item.workDate}_${item.workedSeconds}`} />
        ))}
      </CustomCard>
    </>
  );
};

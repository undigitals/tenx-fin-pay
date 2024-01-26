import React, { CSSProperties, useMemo } from 'react';
import { Tag } from 'views/Account/BalancesTransactionsPage/Tag/Tag';
import { TTagBarProps } from 'views/Account/BalancesTransactionsPage/BalancesTransactionsPage.types';
import { formatLocaleDate } from 'utils/helpers/date';
import { SLayout } from './TagBar.styles';

const getTagsData = ({ filterBy, tagNameList, onClose, locale }: TTagBarProps) => {
  const { incoming, outgoing, minAmount, maxAmount, fromDate, toDate } = filterBy;
  let isDateRange = false;
  let isAmountRange = false;

  return Object.entries(filterBy)
    .map((item) => {
      const filterName = item[0];
      const filterValue = item[1];
      const tagName = tagNameList.filterBy[filterName] ?? filterName;
      let tagFullName = '';

      switch (filterName) {
        case 'fromDate':
        case 'toDate':
          if (isDateRange) {
            const dateFromString = formatLocaleDate(new Date(fromDate as Date), 'PP', locale);
            const dateToString = formatLocaleDate(new Date(toDate as Date), 'PP', locale);

            tagFullName = `${dateFromString} - ${dateToString}`;
            break;
          } else {
            isDateRange = true;
            return '';
          }
        case 'minAmount':
        case 'maxAmount':
          if (isAmountRange) {
            tagFullName = `$${minAmount} - $${maxAmount}`;
            break;
          } else {
            isAmountRange = true;
            return '';
          }
        case 'incoming':
        case 'outgoing':
          if (incoming && outgoing) return '';

          tagFullName = tagName;
          break;
        case 'read':
        case 'unread':
        case 'deleted':
          tagFullName = tagName;
          break;
        default:
          tagFullName = `${tagName}: ${filterValue}`;
      }

      return filterValue ? { title: tagFullName, onClose: () => onClose(filterName), isClosable: true } : '';
    })
    .filter(Boolean);
};

export const TagBar = (props: TTagBarProps) => {
  const tagsData = useMemo(() => getTagsData(props), [props]);

  const style: CSSProperties = {
    marginBottom: tagsData?.length ? props?.marginBottom ?? 24 : 0,
    paddingTop: props?.paddingTop ?? 0,
  };

  return (
    <SLayout style={style}>
      {tagsData.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Tag {...item} key={index} />
      ))}
    </SLayout>
  );
};

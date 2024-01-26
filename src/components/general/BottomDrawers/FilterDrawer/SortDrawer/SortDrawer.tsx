import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Icon } from 'components/general/Icon/Icon';
import { Title } from 'components/general/Typography';
import { SortItem } from 'components/general/BottomDrawers/SortBySheet/SortItem/SortItem';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { SORT_VARIABLES } from 'components/general/BottomDrawers/FilterDrawer/constants';
import { TSortType } from 'components/general/BottomDrawers/FilterDrawer/FilterDrawer.types';
import { TSize } from 'components/theme/CustomButton/CustomButton.types';

type TSortDrawerProps = {
  isOpen: boolean;
  sortOptions?: Record<'id' | 'title', string>[];
  onClose: () => void;
  getSortValue: () => TSortType;
  onFinish: (sortBy: TSortType) => void;
  sheetHeight?: string;
  confirmButtonOptions?: {
    title?: string;
    size: TSize;
  };
};

export const SortDrawer: React.FC<TSortDrawerProps> = ({ isOpen, sortOptions, onClose, getSortValue, onFinish, sheetHeight = '90%', confirmButtonOptions }) => {
  const [sortBy, setSortBy] = useState<TSortType>(sortOptions?.length ? sortOptions[0] : SORT_VARIABLES[0]);
  const { t } = useTranslation();

  const handleSortChanged = (id: string, title: string) => setSortBy({ id, title });

  const handleApplyClick = () => {
    onFinish(sortBy);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      const sortValue = getSortValue();

      setSortBy(sortValue);
    }
  }, [isOpen]);

  return (
    <CustomSheet
      isOpen={isOpen}
      onClose={onClose}
      header
      paddingBottom="56px"
      headerStyle={{ minHeight: 0, padding: 0 }}
      wrapperPadding={false}
      height={sheetHeight}
      contentWrapperStyle={{ borderRadius: '24px 24px 0px 0px' }}
    >
      <CustomRow minHeight="100%" flexDirection="column">
        <CustomRow flexDirection="column" width="100%" justifyContent="flex-start" alignItems="flex-start">
          <CustomRow justifyContent="flex-start" alignItems="center" marginBottom={18} paddingTop={10}>
            <Icon name="arrowLeft" color="charcoal" cursorPointer size="small" onClick={onClose} />

            <Title size="S" fontWeight="SB" font="Poppins" marginLeft={15}>
              {t('balancesTransactions.SortByTitle')}
            </Title>
          </CustomRow>

          {(sortOptions?.length ? sortOptions : SORT_VARIABLES).map((item) => (
            <SortItem id={item.id} key={item.id} title={item.title} onChange={handleSortChanged} selected={item.id === sortBy.id} />
          ))}
        </CustomRow>

        <CustomButton preset="primary" size={confirmButtonOptions?.size ?? 'middleStretch'} onClick={handleApplyClick} marginTop={32}>
          {confirmButtonOptions?.title ?? t('balancesTransactions.Sort')}
        </CustomButton>
      </CustomRow>
    </CustomSheet>
  );
};

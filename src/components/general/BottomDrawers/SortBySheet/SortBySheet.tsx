import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ISortBy } from 'store/historyFilter/historyFilter.types';
import { selectDisplaySortByDrawer, setShowHistoryFilterDrawer, setShowSortByDrawer } from 'store/ui.slice';
import { useAppDispatch } from 'utils/hooks/store';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { selectHistorySortParameters, setSortBy } from 'store/historyFilter/historyFilter.slice';
import { SortItem } from './SortItem/SortItem';

const SORT_VARIABLES = [
  {
    title: 'tenxPayHome.Newest to Oldest',
    id: '0',
  },
  {
    title: 'tenxPayHome.Oldest to Newest',
    id: '1',
  },
  {
    title: 'tenxPayHome.Highest to Lowest',
    id: '2',
  },
  {
    title: 'tenxPayHome.Lowest to Highest',
    id: '3',
  },
];

export const SortBySheet: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isDrawerVisible = useSelector(selectDisplaySortByDrawer);
  const sortBy = useSelector(selectHistorySortParameters);
  const [unAppliedSortBy, setUnAppliedSortBy] = useState<ISortBy>(sortBy);

  const handleOnClose = () => {
    dispatch(setShowSortByDrawer(false));
    dispatch(setShowHistoryFilterDrawer(true));
  };

  const handleApplyClick = () => {
    dispatch(setSortBy(unAppliedSortBy));
    dispatch(setShowSortByDrawer(false));
    dispatch(setShowHistoryFilterDrawer(true));
  };

  const handleSortChanged = (id: string, title: string) => {
    setUnAppliedSortBy({ id, title });
  };

  useEffect(() => {
    if (isDrawerVisible) setUnAppliedSortBy(sortBy);
  }, [isDrawerVisible]);

  return (
    <CustomSheet
      isOpen={isDrawerVisible}
      onClose={handleOnClose}
      header
      headerStyle={{ minHeight: 0, padding: 0 }}
      wrapperPadding={false}
      height="61%"
      contentWrapperStyle={{ borderRadius: '24px 24px 0px 0px' }}
    >
      <CustomRow minHeight="100%" flexDirection="column">
        <CustomRow flexDirection="column" width="100%" justifyContent="flex-start" alignItems="flex-start">
          <CustomRow justifyContent="flex-start" alignItems="center" marginBottom={18} paddingTop={10}>
            <Icon name="arrowLeft" color="charcoal" cursorPointer size="small" onClick={handleOnClose} />

            <Title size="S" fontWeight="SB" font="Poppins" marginLeft={15}>
              {t('tenxPayHome.Sort by')}
            </Title>
          </CustomRow>

          {SORT_VARIABLES.map((item) => (
            <SortItem id={item.id} key={item.id} title={item.title} onChange={handleSortChanged} selected={item.id === unAppliedSortBy.id} />
          ))}
        </CustomRow>

        <CustomButton preset="primary" size="middleStretch" onClick={handleApplyClick} marginTop={32}>
          {t('tenxPayHome.Apply')}
        </CustomButton>
      </CustomRow>
    </CustomSheet>
  );
};

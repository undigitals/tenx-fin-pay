import React from 'react';
import { useTranslation } from 'react-i18next';
import { Title, BodyText } from 'components/general/Typography';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { Icon } from 'components/general/Icon/Icon';
import { SCustomCard } from 'views/MoveMoney/ATMLocations/ATMLocationsPage.styles';
import { SearchForm } from './SearchForm';

interface ISearchProps {
  open: boolean;
  onClose: () => void;
  data:
    | {
        title: string;
      }
    | undefined;
  handleSearch: (value: string) => void;
  getDataByUserLocation: () => void;
  openSearchByAddress: () => void;
}

export const SearchSheet = ({ open, data, onClose, handleSearch, getDataByUserLocation, openSearchByAddress }: ISearchProps) => {
  const { t } = useTranslation();

  return (
    <CustomSheet isOpen={open} onClose={onClose} header={false} title={data?.title} paddingBottom="48px" className="atm-search">
      <Title size="S" fontWeight="SB" marginBottom={32} marginTop={16}>
        {data?.title}
      </Title>

      {data?.title === t('atmLocations.Search') && (
        <>
          <SCustomCard cursorPointer onClick={openSearchByAddress}>
            <Icon name="city" />
            <BodyText textType="bodyText" size="M" fontWeight="R" color="charcoal">
              {t('atmLocations.SearchByCities')}
            </BodyText>
            <Icon name="arrowRight" size="smallest" />
          </SCustomCard>
          <SCustomCard cursorPointer onClick={getDataByUserLocation}>
            <Icon name="location" />
            <BodyText textType="bodyText" size="M" fontWeight="R" color="charcoal">
              {t('atmLocations.SearchByLocation')}
            </BodyText>
          </SCustomCard>
        </>
      )}

      {data?.title === t('atmLocations.SearchByCities') && <SearchForm searchType="City" onClose={onClose} handleSearch={(searchString: string) => handleSearch(searchString)} />}
    </CustomSheet>
  );
};

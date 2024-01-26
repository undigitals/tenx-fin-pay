import React, { useEffect, useState } from 'react';
import { BodyText, Title } from 'components/general/Typography';
import { useGetATMLocationsMutation, useLazyGetATMByAddressQuery } from 'store/user/users.api';
import { Loader } from 'components/general/Loader/Loader';
import { IATMLocations, IApiType } from 'store/user/atmLocations/atmLocations.types';
import { useSelector } from 'react-redux';
import { selectAtmLocationsData } from 'store/user/atmLocations/atmLocations.slice';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Icon } from 'components/general/Icon/Icon';
import { useTranslation } from 'react-i18next';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { selectCurrentUser } from 'store/user/authentication.slice';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { ROUTES } from 'vars/const/ROUTES';
import { useNavigate } from 'react-router-dom';
import { useToggle } from 'utils/hooks/useToggle';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { useGetUserLocation } from './helpers/useGetUserLocation';
import { Card } from './Card/Card';
import { SCustomButton, SContentWrapper, SAddressCard, SDisclosure, SWrapper } from './ATMLocationsPage.styles';
import { FilterSheet } from './FilterSheet/FilterSheet';
import { SearchSheet } from './SearchSheet/SearchSheet';
import { feeFilter, open24Filter, wheelchairFilter } from './constants';

export const ATMLocationsPage = () => {
  const { latitude, longitude } = useGetUserLocation();
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);
  const { isDesktopSize } = useDeviceDimension();
  const navigate = useNavigate();

  const [getATMLocations, getATMLocationsResult] = useGetATMLocationsMutation();
  const [getATMByAddress, getATMByAddressResult] = useLazyGetATMByAddressQuery();

  const { foundAtmLocations } = useSelector(selectAtmLocationsData);
  const [filteredData, setFilteredData] = useState<IATMLocations[] | null>(null);
  const [apiType, setApiType] = useState<IApiType>('locationFilter');
  const [inputAddress, setInputAddress] = useState('');

  const [isNoFeeFiltered, setIsNoFeeFiltered] = useState(false);
  const [isOpen24Filtered, setIsOpen24Filtered] = useState(false);

  const filterSheet = useToggle(false);
  const searchSheet = useToggle(false, { title: t('atmLocations.Search') });

  const filterNoFee = () => {
    setIsNoFeeFiltered(!isNoFeeFiltered);
  };
  const filterOpen24 = () => {
    setIsOpen24Filtered(!isOpen24Filtered);
  };

  const openFilterSheet = () => {
    filterSheet.show();
    setIsNoFeeFiltered(false);
    setIsOpen24Filtered(false);
  };

  const onCloseSearch = () => {
    searchSheet.hide();
    searchSheet.setData({ title: t('atmLocations.Search') });
  };

  const handleSearch = (address: string) => {
    setInputAddress(address);
    setFilteredData([]);
    getATMByAddress({ address });
  };

  const openSearchByAddress = () => {
    setApiType('addressFilter');
    setIsNoFeeFiltered(false);
    setIsOpen24Filtered(false);
    searchSheet.setData({ title: t('atmLocations.SearchByCities') });
  };

  const getDataByUserLocation = () => {
    setApiType('locationFilter');
    setInputAddress('');
    setIsNoFeeFiltered(false);
    setIsOpen24Filtered(false);
    if (latitude !== undefined && longitude !== undefined) {
      getATMLocations({ latitude, longitude });
    }
    onCloseSearch();
  };

  const handleIconClick = () => {
    navigate(ROUTES.myInfoHomeAddress.path, {
      state: {
        isEditing: true,
        backPage: ROUTES.atmLocations.path,
        editingModeHeaderTitle: '',
      },
    });
  };

  const getFilteredData = (filter: any) => {
    if (apiType === 'locationFilter' && latitude !== undefined && longitude !== undefined) {
      getATMLocations({ latitude, longitude, filter });
    }
    if (apiType === 'addressFilter' && inputAddress) {
      getATMByAddress({ address: inputAddress, filter });
    }
  };

  const handleFilter = (values: Record<string, boolean | string>) => {
    const filter: string[] = [];
    for (const val in values) {
      if (values[val]) {
        switch (val) {
          case 'noFee':
            filter.push(feeFilter);
            continue;
          case 'openNow':
            filter.push(open24Filter);
            continue;
          case 'wheelchair':
            filter.push(wheelchairFilter);
            continue;
          default:
            continue;
        }
      }
    }
    getFilteredData(filter);
  };

  useEffect(() => {
    if (isNoFeeFiltered && !isOpen24Filtered) {
      const filter = [feeFilter];
      getFilteredData(filter);
    }
    if (!isNoFeeFiltered && isOpen24Filtered) {
      const filter = [open24Filter];
      getFilteredData(filter);
    }
    if (isNoFeeFiltered && isOpen24Filtered) {
      const filter = [feeFilter, open24Filter];
      getFilteredData(filter);
    }
    if (!isNoFeeFiltered && !isOpen24Filtered) {
      getFilteredData('');
    }
  }, [isNoFeeFiltered, isOpen24Filtered, latitude, longitude]);

  useEffect(() => {
    setFilteredData(foundAtmLocations);
  }, [foundAtmLocations]);

  return (
    <SWrapper>
      <Title size="S" color="charcoal" fontWeight="SB" font="Poppins" marginBottom={16}>
        {t('atmLocations.ATMLocations')}
      </Title>
      <BodyText fontWeight="R" size="T" textType="bodyText" color="charcoal70">
        {t('atmLocations.Information')}
      </BodyText>
      <SContentWrapper>
        {isDesktopSize && (
          <SAddressCard background="beige">
            <CustomRow justifyContent="flex-start" alignItems="start" flexDirection="column">
              <BodyText fontWeight="R" size="M" textType="bodyText" color="charcoal70" lineHeight="24px">
                {t('atmLocations.HomeAddress')}
              </BodyText>
              <BodyText fontWeight="M" size="M" textType="bodyText" color="charcoal" lineHeight="24px">
                {user?.address1}
              </BodyText>
              <BodyText fontWeight="M" size="M" textType="bodyText" color="charcoal" lineHeight="24px">
                {user?.city}, {user?.stateProvince} {user?.postalCode}
              </BodyText>
            </CustomRow>
            <Icon name="edit" color="blue" size="small" onClick={handleIconClick} cursorPointer />
          </SAddressCard>
        )}

        <CustomRow className="filter" flexWrap="nowrap" marginTop={16} marginBottom={32} justifyContent="space-between">
          <CustomRow justifyContent="flex-start">
            <SCustomButton type="button" onClick={filterNoFee} marginRight={8} className={isNoFeeFiltered ? 'active' : ''}>
              <Icon name="noFee" size="small" color={isNoFeeFiltered ? 'white' : 'charcoal70'} marginRight={8} />
              {t('atmLocations.NoFee')}
            </SCustomButton>
            <SCustomButton type="button" onClick={filterOpen24} marginRight={8} className={isOpen24Filtered ? 'active' : ''}>
              <Icon name="circleTime" size="small" color={isOpen24Filtered ? 'white' : 'charcoal70'} marginRight={8} />
              {t('atmLocations.Open24')}
            </SCustomButton>
          </CustomRow>

          <CustomRow justifyContent="flex-end">
            <SCustomButton type="button" onClick={openFilterSheet} className="noBorder" marginRight={16}>
              <Icon name="filter" size="normal" color="charcoal70" cursorPointer />
            </SCustomButton>
            <SCustomButton type="button" onClick={searchSheet.show} className="noBorder">
              <Icon name="search" size="normal" color="charcoal70" cursorPointer />
            </SCustomButton>
          </CustomRow>
        </CustomRow>

        <CustomCard marginBottom={32} background="blue5" borderRadius={16} padding="16px 50px" className="card-header">
          <BodyText textType="bodyText" size="T" fontWeight="B" color="charcoal" textAlign="center">
            {t('atmLocations.CashBack')}
          </BodyText>
        </CustomCard>

        {filteredData?.length ? (
          // eslint-disable-next-line react/no-array-index-key
          <section className="locations">{filteredData && filteredData?.map((item, i) => <Card data={item} key={i} lat={latitude} long={longitude} />)}</section>
        ) : (
          <BodyText fontWeight="M" size="M" textType="bodyText" color="charcoal40" lineHeight="24px">
            {t('atmLocations.NothingFound')}
          </BodyText>
        )}

        {(getATMLocationsResult.isLoading || getATMByAddressResult.isFetching) && <Loader />}
      </SContentWrapper>

      <SDisclosure>
        <SuttonDisclaimerNote />
      </SDisclosure>

      <FilterSheet open={filterSheet.isActive} onClose={filterSheet.hide} onFilter={handleFilter} />

      <SearchSheet
        open={searchSheet.isActive}
        data={searchSheet.data}
        onClose={onCloseSearch}
        handleSearch={handleSearch}
        getDataByUserLocation={getDataByUserLocation}
        openSearchByAddress={openSearchByAddress}
      />
    </SWrapper>
  );
};

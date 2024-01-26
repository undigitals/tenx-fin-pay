import React, { useRef, useState } from 'react';
import { IInput } from 'components/general/BaseInput/BaseInput.types';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { Loader } from 'components/general/Loader/Loader';
import { useClickOutside } from 'utils/hooks/useClickOutside';
import { useGetUserLocation } from 'views/MoveMoney/ATMLocations/helpers/useGetUserLocation';
import { SSelectContainer } from './AutocompleteAddress.styles';
import { TAddressFields, TDataAddress } from './AutocompleteAddress.types';

const ADDRESS_TYPES_IGNORE_LIST = ['political'];

interface IAutocompleteAddressInputProps extends IInput {
  handleAddressSelect?: (addressObj: {} | Record<TAddressFields, string | undefined>, addressFieldName?: string) => void;
  setAddressComponents?: (addressComponents: any, name: string | undefined) => void;
  textFormat?: 'short' | 'long';
  isInline?: boolean;
}

export const AutocompleteAddress: React.FC<IAutocompleteAddressInputProps> = ({ handleAddressSelect, value, setAddressComponents, id, onChange, onBlur, textFormat = 'short', isInline, ...props }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { latitude, longitude } = useGetUserLocation();
  const searchBounds =
    latitude && longitude
      ? {
          north: latitude + 0.1,
          south: latitude - 0.1,
          east: longitude + 0.1,
          west: longitude - 0.1,
        }
      : undefined;

  useClickOutside(dropdownRef, () => setIsDropdownVisible(false));

  const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
    apiKey: 'AIzaSyAPORw1Ex8_a8nsyiTvjE_KV7Jp73cy7Tc',
  });

  const prepareFullAddress = (addressComponents: TDataAddress[], format?: 'short' | 'long') => {
    let fullAddress = {};

    if (!addressComponents?.length) return {};

    addressComponents?.forEach((item: TDataAddress) => {
      const addressType = item?.types?.filter((type) => !ADDRESS_TYPES_IGNORE_LIST.includes(type))[0];

      fullAddress = {
        ...fullAddress,
        [addressType]: format
          ? item[`${format}_name`]
          : {
              short_name: item?.short_name,
              long_name: item?.long_name,
            },
      };
    });

    return fullAddress;
  };

  const getAddressComponents = (record: any) => {
    const fullAddress: Record<TAddressFields, string> | {} = isInline ? record.formatted_address : prepareFullAddress(record.address_components, textFormat);

    if (setAddressComponents) {
      setAddressComponents(fullAddress, id);
    } else {
      if (onChange) onChange(record.formatted_address);
    }

    setIsDropdownVisible(false);
  };

  const onInputClick = () => {
    if (placePredictions?.length) {
      setIsDropdownVisible(true);
    }
  };

  const onInputChange = (inputValue: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(inputValue);
    console.log('bounds', searchBounds);
    getPlacePredictions({
      input: inputValue.target.value,
      bounds: searchBounds,
      strictBounds: false,
    });
    setIsDropdownVisible(true);
  };

  const onSelect = ({ place_id }: { place_id: string }) => {
    placesService?.getDetails({ placeId: place_id }, getAddressComponents);
  };

  return (
    <SSelectContainer isOpen={isDropdownVisible} ref={dropdownRef}>
      {isPlacePredictionsLoading && <Loader />}

      <BaseInput {...props} value={value} onClick={onInputClick} onChange={onInputChange} onBlur={onBlur} />

      {placePredictions?.length ? (
        <ul className="address-select-dropdown">
          {placePredictions?.map((place: typeof placePredictions[0], index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className="dropdown-item">
              <span onClick={() => onSelect(place)}>{place.description}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </SSelectContainer>
  );
};

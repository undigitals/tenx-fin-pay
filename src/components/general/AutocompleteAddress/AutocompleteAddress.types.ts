export type TAddressFields = 'street_number' | 'administrative_area_level_1' | 'administrative_area_level_2' | 'country' | 'locality' | 'route' | 'postal_code';

export type TDataAddress = {
  long_name: string;
  short_name: string;
  types: string[];
};

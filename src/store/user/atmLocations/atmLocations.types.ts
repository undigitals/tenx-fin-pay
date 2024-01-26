export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IATMProperties {
  name: string;
  value: string;
}

export interface IATMLocations {
  location: {
    ownerBusId: string | null;
    ownerBusName: string;
    address: {
      street: string;
      street2: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      formattedAddress: string;
    };
    placeName: string;
    typeName: string | null;
    coordinates: ICoordinates;
    properties: IATMProperties[];
    score: number;
    isMappable: 'Y' | 'N' | null;
  };
}

export interface IATMLocationsResponse {
  foundAtmLocations: IATMLocations[];
}

export interface IFilter {
  filterValue: string;
  filterName: string;
}

export interface IATMLocationsRequest {
  latitude: number;
  longitude: number;
  filter?: string[];
}
export interface IATMLocationsByAddressRequest {
  address: string;
  filter?: string[];
}

export type IApiType = 'locationFilter' | 'addressFilter';

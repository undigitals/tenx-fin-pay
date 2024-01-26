export interface IUSPSValidateAddressRequest {
  address?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  mailingAddress1?: string;
  mailingAddress2?: string;
  mailingCity?: string;
  mailingState?: string;
  mailingPostalCode?: string;
}

export interface IUSPSValidateAddressResponse {
  AddressValidateResponse: {
    Address: {
      Error?: {
        description: string;
      };
      DPVCMRA?: string | boolean;
      Footnotes?: string;
      City?: string;
      Address1?: string;
      Address2?: string;
      Zip5?: string;
      State?: string;
    };
  };
}

import { IDisclosuresData, IGetDisclosureResponse } from 'store/user/disclosures/disclosures.types';

export interface IDisclosureResult {
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
  error?: IDisclosuresErrorRes;
  errorMessage?: string;
}

export interface IDisclosureHelper {
  getPrivacyPolicyDisclosure?: IGetDisclosureResponse;
  getPrivacyPolicyDisclosureResult?: any;
  setPrivacyPolicyStatus?: (value: boolean) => void;
  disclosuresData?: IDisclosuresData;
  getTermsOfUseDisclosure?: IGetDisclosureResponse;
  getTermsOfUseDisclosureResult?: IDisclosureResult;
  setTermsOfUseStatus?: (value: boolean) => void;
}

export interface IDisclosuresErrorRes {
  data?: {
    Error?: string;
    error?: string;
  };
}

export interface IDisclosuresStatus {
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
  error?: IDisclosuresErrorRes;
}

export interface IDisclosuresStatusData extends IDisclosuresStatus {
  errorMessage?: string;
}

export interface IConsentsState {
  flows: {
    [key: string]: IConsentData[];
  };
  isTenxPlayConsentsAccepted: boolean;
}

export interface IConsentData {
  id: string;
  name: string;
  text: string;
  accepted: boolean;
  disclaimerName: string;
  timestamp: string;
  version: string;
  createdByUserId: string | null;
  subTitle: string | null;
  acceptCheckBoxText: string | null;
  acceptButtonText: string;
}

export interface IAllConsentsResponse {
  [key: string]: IConsentData[];
}

export interface IConsentHelper {
  getConsentByFlowName?: () => void;
  acceptConsent?: (id: string, flowName: string) => void;
  getConsentByFlowNameResult?: any;
  acceptConsentResult?: any;
  consentsData?: IConsentData[];
  setIsActiveConsent?: (value: boolean) => void;
}

export interface IConsentsErrorRes {
  data?: {
    Error?: string;
    error?: string;
  };
}

export interface IConsentsStatus {
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  error?: IConsentsErrorRes;
}

export interface IConsentsStatusData extends IConsentsStatus {
  errorMessage?: string;
}

import { FinishRegistrationRequest } from './registration.types';

export type TSmsCodeType = 'registration' | 'forgot-password' | 'otp';
export interface ISmsCodeStatus {
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
}
export interface ISmsCodeErrorRes {
  data?: {
    Error?: string;
    error?: string;
    validationErrors?: string[];
  };
}
export interface ISmsCodeStatusData extends ISmsCodeStatus {
  errorMessage?: string;
}

export interface ISmsCodeMutationResult extends ISmsCodeStatus {
  error?: ISmsCodeErrorRes;
}

export interface ISmsCodeRegistrationHelper {
  data?: FinishRegistrationRequest;
  resultData?: {
    otpSeed?: string;
    systemProperties?: {
      postRegisterURL?: string;
    };
  };
  isFinished?: boolean;
  finishRegistration?: (data: FinishRegistrationRequest) => void;
}

export interface ISmsCodeHelper {
  generateCode?: (phone?: string | null, email?: string | null) => void;
  checkCode?: (code: string) => void;
  generateError?: string;
  checkError?: string;
  generateStatus?: ISmsCodeStatusData;
  checkStatus?: ISmsCodeStatusData;
  registrationHelper?: ISmsCodeRegistrationHelper;
}

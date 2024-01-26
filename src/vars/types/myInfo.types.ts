import { IRequestResult } from 'utils/helpers/request';
import { ITruliooValidateUserRequest } from 'store/trulioo/trulioo.types';
import { GetUserInfoResponse, UserInfo, UserInfoData } from './userInfo.types';

export interface IMyInfoHelper {
  validateUserStatus?: IRequestResult;
  validateUser?: (userData: ITruliooValidateUserRequest) => void;
  openingAccountData: UserInfoData;
  saveOnboardingData: (userData: UserInfo) => void;
  generateCodeEmail?: (email: string) => void;
  checkCodeEmail?: (code: string) => void;
  clearMyInfoData?: () => void;
  getUserStatus?: IRequestResult;
  setUserStatus?: IRequestResult;
  updateUserDataStatus?: IRequestResult;
  generateCodeEmailStatus?: IRequestResult;
  checkCodeEmailStatus?: IRequestResult;
  getUserResult?: GetUserInfoResponse;
  getOnboardingDataIsLoading?: boolean;
  hasGetTransactionsInfoError?: boolean;
  saveOnboardingDataLoading?: boolean;
}

export interface ISuggestedAddress {
  city?: string;
  address?: string;
  state?: string;
  zip?: string;
}

export interface IMyInfoHomeAddressStatusData extends IRequestResult {
  errorType?: string;
  hasSuggestions?: boolean;
  suggested?: any;
  errorMessages?: string[];
}

import { ICardHubSsoData, IPolicies, ISystemProperties, IThirdPartyIds, IUserInfo } from './authentication.types';

export interface IMobileAuthInjection {
  token?: string;
  accessToken?: string;
  AuthRefresh?: string;
  language: 'en' | 'es';
  environment: string;
  client: IUserInfo;
  otpSeed?: string;
  otp?: string;
  isEmailVerifiedOrAbsent: boolean | null;
  thirdPartyIds: IThirdPartyIds;
  systemProperties: ISystemProperties;
  deviceId?: string;
  biometryType?: string;
  biometryState?: boolean;
  policies: IPolicies | null;
  redirectUrl?: string;
  cardHubSsoData: ICardHubSsoData;
}

export interface MobileRefrethTokenInjection {
  token: string;
}

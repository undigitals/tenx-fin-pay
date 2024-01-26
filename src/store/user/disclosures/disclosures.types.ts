export interface IGetDisclosureResponse {
  text: string;
  name: string;
  subTitle: string;
  acceptCheckBoxText: string;
  acceptButtonText: string;
  disclaimerId: string;
}

export interface IDisclosuresData {
  privacyPolicy: boolean;
  privacyPolicyStatus?: boolean;
  termsOfUseStatus?: boolean;
  disclosureText?: string;
  disclosureName?: string;
  disclosureSubTitle?: string;
  disclosureAcceptCheckBoxText?: string;
  disclosureAcceptButtonText?: string;
  disclosureId?: string;
  cardholderAgreement: boolean;
  suttonBankPrivacyPolicy: boolean;
  tenxPrivacyPolicy: boolean;
  tenxTermsOfUse: boolean;
  termsOfUseText?: string;
  termsOfUseName?: string;
  termsOfUseSubTitle?: string;
  termsOfUseAcceptCheckBoxText?: string;
  termsOfUseAcceptButtonText?: string;
  termsOfUseDisclosureId?: string;
}

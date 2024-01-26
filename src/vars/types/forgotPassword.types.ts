export interface ISmsCodeRequestBase {
  transactionId: string;
  fingerprint: string;
}

export interface IForgotPasswordRequest {
  username: string;
  fingerprint: string;
}

export interface IForgotPasswordData {
  username?: string;
  transactionId: string;
  email: string;
  phone: string;
}

export interface IForgotPasswordGenerateCodeRequest extends ISmsCodeRequestBase {
  codeDelivery: string;
}

export interface IForgotPasswordGenerateCodeResponse {
  transactionId: string;
}

export interface IForgotPasswordCheckCodeRequest extends ISmsCodeRequestBase {
  code: string;
}

export interface IPasswordChangeRequest extends ISmsCodeRequestBase {
  password: string;
}

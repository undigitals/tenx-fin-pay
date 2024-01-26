export interface RegistrationData {
  phone: string;
  transactionId: string;
  password: string;
}

export interface RegistrationFormData {
  phone: string;
  password: string;
  username: string;
}

export interface GenerateCodeRequest {
  phone?: string;
  email?: string;
  username?: string;
  inviteId?: string;
}

export interface GenerateCodeResponse {
  transactionId: string;
}

export interface CheckCodeRequest {
  transactionId: string;
  code: string;
}

export interface IUpdateUserRequest {
  firstName: string;
  lastName: string;
  birthday?: string;
  email?: string;
  userId: string;
}

export interface FinishRegistrationRequest extends RegistrationData {
  fingerprint: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  username: string;
  question1: string;
  question2: string;
  question3: string;
  answer1: string;
  answer2: string;
  answer3: string;
  type: string;
  name?: string;
  manufacture?: string;
  os?: string;
  version?: string;
  userAgent?: string;
}

// Gives back an empty object for now, we check only the response status
export interface CheckCodeResponse {}

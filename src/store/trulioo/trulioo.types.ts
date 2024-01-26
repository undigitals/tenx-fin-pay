export interface ITruliooValidateUserRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  dayOfBirth: number;
  monthOfBirth: number;
  yearOfBirth: number;
  city: string;
  state: string;
  postalCode: string;
  address1: string;
  address2?: string;
  phone?: string;
  email: string;
  id: string;
  idType?: string;
  mailingCity?: string;
  mailingState?: string;
  mailingPostalCode?: string;
  mailingAddress1?: string;
  mailingAddress2?: string;
}

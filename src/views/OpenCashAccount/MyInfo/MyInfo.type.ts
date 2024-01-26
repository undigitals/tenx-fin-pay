import { Dispatch, SetStateAction } from 'react';
import { FormInstance } from 'antd';
import { UserInfoData } from 'vars/types/userInfo.types';

export interface IMyInfoEditFromVerify {
  state?: {
    isEditing: boolean;
    prevPage?: string;
  };
}

export interface FormInputProps<T> {
  onCompletion: Dispatch<SetStateAction<boolean>>;
  openingAccountData?: UserInfoData;
  handleCompletion?: (arg: T) => void;
  form: FormInstance;
  onChange?: (values: T) => void;
  handleSubmit?: (values: T) => void;
  initialValues?: T;
  isEditMode?: boolean;
  isMailing?: boolean;
  isCheckboxAgreed?: boolean;
  handleChangeAgree?: () => void;
}

export interface IVerifyEmailFormProps<T> {
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
  initialValues?: T;
  handleSubmit: (values: T) => void;
  setIsEmailChanged: (isChanged: boolean) => void;
  form: FormInstance;
  isEditMode?: boolean;
}

export interface IVerifyEmailForm {
  email?: string;
  username?: string;
}

export interface IVerifySmsCodeForm {
  emailCode: string;
}

export interface IHomeAddressForm {
  address: string;
  address2: string;
  apt: string;
  city: string;
  stateProvince: string;
  zipCode: string;
  isEditMode?: boolean;
  mailingCity: string;
  mailingState: string;
  mailingPostalCode: string;
  mailingAddress1: string;
  mailingAddress2: string;
}

export interface MyInfoFormInputProps<T> {
  onCompletion: Dispatch<SetStateAction<boolean>>;
  openingAccountData?: UserInfoData;
  handleCompletion?: (arg: T) => void;
  form: FormInstance;
  onChange?: (values: T) => void;
  handleSubmit?: (values: T) => void;
  initialValues?: T;
  isEditMode?: boolean;
  isMailing?: boolean;
  isCheckboxAgreed?: boolean;
  handleChangeAgree?: () => void;
}

export interface IAgeForm {
  dateOfBirth: string;
}

export interface IAgeTaxForm {
  dateOfBirth: string;
  taxId: string;
}

export interface INameForm {
  middleName?: string;
  firstName: string;
  lastName: string;
  suffix?: string;
}

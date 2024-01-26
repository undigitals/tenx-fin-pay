export interface IChangePasswordFormProps {
  handleChangePassword: Function;
  handleOpen?: () => void;
  isLoading: boolean;
}

export interface IChangePasswordFormValues {
  newPassword: string;
  retypePassword: string;
}

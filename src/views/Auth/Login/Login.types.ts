export type TFormData = {
  username: string;
};

export type TPasswordFinish = (values: TFormData) => void;

export type TForgotUsernameConfirm = {
  email?: string;
  phone?: string;
};

export type TForgotUsernameSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  onFinish: (args: TForgotUsernameConfirm) => void;
};

export type TForgotUsernameFormProps = {
  onFinish: (args: TForgotUsernameConfirm) => void;
};

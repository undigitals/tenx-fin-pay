import { ISuggestedAddress } from 'vars/types/myInfo.types';
import { FormInstance } from 'antd';

export interface MyInfoHomeAddressModalInputProps {
  isModalVisible: boolean;
  errorType?: string;
  errors?: string[];
  onClose: () => void;
  onEditClick: () => void;
  onConfirmClick: () => void;
  addressForm: FormInstance;
  suggested?: ISuggestedAddress;
  isMailingAddress?: boolean;
}

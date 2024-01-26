import { notification } from 'antd';

interface INotification {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  description?: string;
}

export const showNotification = ({ type, message, description }: INotification) => {
  notification[type]({
    message,
    description,
  });
};

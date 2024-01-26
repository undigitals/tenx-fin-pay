import { IAccountButton } from 'views/Main/MainPage/Accounts/AccountCardItem/types';
import { ROUTES } from 'vars/const/ROUTES';

export const buttons: IAccountButton[] = [
  {
    title: 'See Time Card',
    preset: '',
    size: 'small',
    extraStyles: { maxWidth: 170, width: '48%', padding: '8px 16px', marginRight: 4 },
    to: ROUTES.tenxPayHistory.path,
  },
  {
    title: 'Request Tenx Pay',
    preset: 'primary',
    size: 'small',
    extraStyles: { maxWidth: 170, width: '48%', padding: '8px 16px', marginLeft: 4 },
    to: ROUTES.tenxPayHome.path,
  },
];

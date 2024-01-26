import { getColor } from 'utils/helpers/styleHelpers';
import { IAccountButton } from './types';

export const buttons: IAccountButton[] = [
  {
    title: 'homeScreen.See Account Info',
    preset: '',
    size: 'small',
    extraStyles: {
      maxWidth: 170,
      width: '43%',
      padding: '8px 16px',
      marginRight: 8,
      borderColor: getColor('blue20'),
      whiteSpace: 'normal',
    },
    src: '',
    to: '',
    onClick: () => {},
  },
  {
    title: 'homeScreen.See Transactions',
    preset: 'primary',
    src: '',
    size: 'small',
    extraStyles: { maxWidth: 170, width: '43%', padding: '8px 16px', marginRight: 4, whiteSpace: 'normal' },
    onClick: () => {},
    to: '',
  },
];

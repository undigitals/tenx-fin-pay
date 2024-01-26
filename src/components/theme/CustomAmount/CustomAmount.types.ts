import { TThemeColor } from 'styles/theme';

export type TSizeType = 'smallerStrong' | 'smaller' | 'smallest' | 'small' | 'xs' | 'normal' | 'thin' | 'large' | 'larger' | 'largest' | 'xl';

export type ICustomAmountProps = {
  className?: string;
  size: TSizeType;
  color?: TThemeColor;
  amount: number;
  lineHeight?: number;
  sign?: boolean;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  cursorPointer?: boolean;
  align?: 'left' | 'right' | 'center';
  isPoppins?: boolean;
} & (
  | {
      multiSizable: true;
      remainingSize: TSizeType;
      remainingWeight: number;
    }
  | {
      multiSizable?: false;
      remainingSize?: never;
      remainingWeight?: never;
    }
);

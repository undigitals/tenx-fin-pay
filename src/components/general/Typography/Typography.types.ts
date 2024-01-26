/*
Fonts sizes are in pixels.
L=Large, M=Medium, N=Normal, S=Small,
T=TinyR=Regular, SM=Semimedium M=Medium  SB=Semibold B=Bold.

Primaly Font: Poppins
Secondary Font: DM Sans
*/

export type ITextType = 'bodyText' | 'helperText' | 'errorText';
export type TFontProp = 'Poppins' | 'DM Sans';
export type TTitleSizeProp = 'L' | 'M' | 'S' | 'N' | 'T' | 'sL' | 'sM' | 'sS' | 'XL' | 'XXXL';
export type TSizeProp = 'L' | 'M' | 'S' | 'N' | 'T';
export type TWeightProp = 'R' | 'SM' | 'M' | 'SB' | 'B';
export type TSpaceProp =
  | 'spacing-tiny'
  | 'spacing-x-small'
  | 'spacing-small'
  | 'spacing-med'
  | 'spacing-normal'
  | 'spacing-large'
  | 'spacing-x-large'
  | 'spacing-xx-large'
  | 'spacing-xxx-large'
  | 'spacing-jumbo'
  | 'spacing-super-jumbo';

export const FONT_SIZE: Record<ITextType, Record<TSizeProp, string>> = {
  bodyText: {
    L: '18px',
    M: '16px',
    S: '10px',
    N: '14px',
    T: '12px',
  },
  helperText: {
    L: '',
    M: '',
    S: '14px',
    N: '12px',
    T: '10px',
  },
  errorText: {
    L: '',
    M: '16px',
    S: '14px',
    N: '',
    T: '',
  },
};

export const WEIGHT_SIZE: Record<TWeightProp, string> = {
  R: '400',
  M: '500',
  SM: '',
  SB: '600',
  B: '700',
};

export const SPACER_SIZE: Record<TSpaceProp, string> = {
  'spacing-tiny': '4px',
  'spacing-x-small': '8px',
  'spacing-small': '12px',
  'spacing-med': '16px',
  'spacing-normal': '20px',
  'spacing-large': '24px',
  'spacing-x-large': '32px',
  'spacing-xx-large': '40px',
  'spacing-xxx-large': '48px',
  'spacing-jumbo': '64px',
  'spacing-super-jumbo': '96px',
};

export type TTagProp = 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span';
export type TDisplayProp = 'block' | 'flex' | 'inline' | 'inline-flex';
export type TTextAlignProp = 'start' | 'center' | 'end';
export type TJustifyContentProp = 'start' | 'end' | 'center' | 'space-between';

export interface IStylesProps {
  marginBottom?: number | TSpaceProp;
  marginTop?: number | TSpaceProp;
  marginLeft?: number | TSpaceProp;
  marginRight?: number | TSpaceProp;
  paddingBottom?: number | TSpaceProp;
  paddingTop?: number | TSpaceProp;
  paddingLeft?: number | TSpaceProp;
  paddingRight?: number | TSpaceProp;
  extraStyles?: { [key: string]: string | number | undefined } | React.CSSProperties;
}

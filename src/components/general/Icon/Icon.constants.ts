export interface ISizeMap {
  [key: string]: {
    width: number;
    height: number;
  };
}

export const ICON_SIZE_MAP: IDictionary<number> = {
  xs: 12,
  mini: 10,
  smallest: 14,
  smaller: 16,
  small: 22,
  normal: 24,
  big: 26,
  l: 32,
  xl: 40,
  bigger: 48,
  biggest: 56,
  xxl: 120,
};

export const INITIAL_SIZE_MAP: ISizeMap = {
  earnings: {
    width: 22,
    height: 24,
  },
  creditCard: {
    width: 24,
    height: 19,
  },
};

export const CLEAR_ICONS = ['flagUS', 'logo'];

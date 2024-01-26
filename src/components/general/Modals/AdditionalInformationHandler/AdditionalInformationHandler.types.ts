import { TThemeColor } from 'styles/theme';
import { ReactNode } from 'react';
import { TWeightProp } from 'components/general/Typography/Typography.types';

interface IAdditionalInformationHandlerData {
  readonly [key: string]: string | number | boolean | string[] | ReactNode;
  TEXT_COLOR: TThemeColor;
  TITLE_COLOR: TThemeColor;
  FONT_WEIGHT: TWeightProp;
}

export interface IAdditionalInformationHandlerConfig {
  readonly [key: string]: IAdditionalInformationHandlerData;
}

import styled, { css } from 'styled-components/macro';
import { getProp, ifProp } from 'utils/helpers/styleHelpers';
import { ICustomTextText, ISCustomTextContainerProps, TTextSizeProp, TTextWeightProp } from './CustomText.types';

const TEXT_SIZE: Record<TTextSizeProp, string | number> = {
  smaller: '10px',
  small: '12px',
  normal: '14px',
  big: '16px',
  bigger: '20px',
  xl: '24px',
  xxl: '28px',
  biggest: '31px',
  '16': '16px',
  '18': '18px',
  '30': '30px',
  '6': '6px',
  '32': '32px',
};

const TEXT_WEIGHT: Record<TTextWeightProp, string> = {
  normal: '400',
  strong: '500',
  stronger: '600',
  strongest: '700',
};

export const SCustomTextContainer = styled.div<ISCustomTextContainerProps>`
  display: ${getProp('display', 'flex')};
  white-space: ${ifProp('nowrap', 'nowrap', 'normal')};
  flex-direction: row;
  align-items: center;

  .svg-icon {
    position: relative;
    margin-right: 12px;
  }
`;
export const SCustomText = styled.div<ICustomTextText>`
  font-style: normal;
  font-family: ${getProp('font')};
  font-size: ${({ size }) => TEXT_SIZE[size]};
  font-weight: ${({ fontWeight }) => TEXT_WEIGHT[fontWeight]};
  color: ${({ color, theme }) => theme[color]};
  text-align: ${getProp('textAlign')};
  display: ${getProp('display', 'block')};
  line-height: ${getProp('lineHeight', 1.2)};
  cursor: ${ifProp('cursorPointer', 'pointer', 'default')};
  font-style: ${getProp('fontStyle')};
  ${({ $StylesObj, $extraStyles }) => css({ ...$StylesObj, ...$extraStyles })}
`;

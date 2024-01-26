import styled, { css } from 'styled-components/macro';
import { getProp } from 'utils/helpers/styleHelpers';
import { ICustomTitleContainer, ICustomTitleIcon, ICustomTitleText, TTitleAlignProp, TTitleMarginProp, TTitleSizeProp, TTitleWeightProp } from './CustomTitle.types';

const TITLE_ALIGN: Record<TTitleAlignProp, string> = {
  center: 'center',
  start: 'flex-start',
  end: 'flex-end',
};

const TITLE_SIZE: Record<TTitleSizeProp, string> = {
  smallest: '14px',
  smaller: '16px',
  small: '18px',
  normal: '20px',
  big: '24px',
  xl: '28px',
  bigger: '31px',
  biggest: '35px',
};

const TITLE_WEIGHT: Record<TTitleWeightProp, string> = {
  lighter: '400',
  light: '500',
  normal: '600',
  strong: '700',
};

const TITLE_MARGIN: Record<TTitleMarginProp, string> = {
  none: '0',
  smallest: '5px',
  smaller: '12px',
  small: '15px',
  normal: '25px',
  big: '32px',
  bigger: '45px',
  biggest: '73px',
  xl: '90px',
};

export const SCustomTitleContainer = styled.div<ICustomTitleContainer>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ align }) => TITLE_ALIGN[align]};
  margin-bottom: ${({ marginBottom }) => TITLE_MARGIN[marginBottom]};
  margin-top: ${({ marginTop }) => TITLE_MARGIN[marginTop]};
  cursor: pointer;
  line-height: 1;
`;

export const SCustomTitleText = styled.div<ICustomTitleText>`
  font-family: ${getProp('font')};
  font-style: normal;
  font-size: ${({ size }) => TITLE_SIZE[size]};
  font-weight: ${({ fontWeight }) => TITLE_WEIGHT[fontWeight]};
  color: ${({ color, theme }) => theme[color]};
  line-height: ${getProp('lineHeight', 1)};
  text-align: ${getProp('textAlign')};
  ${({ $StylesObj, $extraStyles }) => css({ ...$StylesObj, ...$extraStyles })}
`;

export const SCustomTitleIcon = styled.div<ICustomTitleIcon>`
  margin-right: 14px;
  line-height: 1.5em;
`;

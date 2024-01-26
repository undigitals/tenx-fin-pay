import styled, { css } from 'styled-components/macro';
import { getProp } from 'utils/helpers/styleHelpers';
import { SPACER_SIZE, TTitleSizeProp, WEIGHT_SIZE } from 'components/general/Typography/Typography.types';
import { ITitle, ITitleContainer } from './Title.types';

export const TITLE_SIZE: Record<TTitleSizeProp, string> = {
  XXXL: '56px',
  XL: '32px',
  L: '32px',
  M: '28px',
  S: '24px',
  N: '22px',
  T: '20px',
  sL: '20px',
  sM: '18px',
  sS: '16px',
};

export const STitleText = styled.h2<ITitle>`
  font-family: ${getProp('font')};
  font-style: normal;
  font-size: ${({ size }) => size && TITLE_SIZE[size]};
  font-weight: ${({ fontWeight }) => fontWeight && WEIGHT_SIZE[fontWeight]};
  color: ${({ color, theme }) => color && theme[color]};
  line-height: ${getProp('lineHeight', 1.2)};
  text-align: ${getProp('textAlign')};
  margin: 0px;
`;

export const STitleContainer = styled.div<ITitleContainer>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${getProp('justifyContent')};

  ${({ marginBottom }) =>
    marginBottom && typeof marginBottom === 'string'
      ? css`
          margin-bottom: ${SPACER_SIZE[marginBottom]};
        `
      : css`
          margin-bottom: ${getProp('marginBottom')}px;
        `};
  ${({ marginTop }) =>
    marginTop && typeof marginTop === 'string'
      ? css`
          margin-top: ${SPACER_SIZE[marginTop]};
        `
      : css`
          margin-top: ${getProp('marginTop')}px;
        `};
  ${({ marginLeft }) =>
    marginLeft && typeof marginLeft === 'string'
      ? css`
          margin-left: ${SPACER_SIZE[marginLeft]};
        `
      : css`
          margin-left: ${getProp('marginLeft')}px;
        `};
  ${({ marginRight }) =>
    marginRight && typeof marginRight === 'string'
      ? css`
          margin-right: ${SPACER_SIZE[marginRight]};
        `
      : css`
          margin-right: ${getProp('marginRight')}px;
        `};

  ${({ paddingBottom }) =>
    paddingBottom && typeof paddingBottom === 'string'
      ? css`
          padding-bottom: ${SPACER_SIZE[paddingBottom]};
        `
      : css`
          padding-bottom: ${getProp('paddingBottom')}px;
        `};
  ${({ paddingTop }) =>
    paddingTop && typeof paddingTop === 'string'
      ? css`
          padding-top: ${SPACER_SIZE[paddingTop]};
        `
      : css`
          padding-top: ${getProp('paddingTop')}px;
        `};
  ${({ paddingLeft }) =>
    paddingLeft && typeof paddingLeft === 'string'
      ? css`
          padding-left: ${SPACER_SIZE[paddingLeft]};
        `
      : css`
          padding-left: ${getProp('paddingLeft')}px;
        `};
  ${({ paddingRight }) =>
    paddingRight && typeof paddingRight === 'string'
      ? css`
          padding-right: ${SPACER_SIZE[paddingRight]};
        `
      : css`
          padding-right: ${getProp('paddingRight')}px;
        `};

  ${({ extraStyles }) => css({ ...extraStyles })}
  cursor: pointer;
  line-height: 1;
`;

export const SIcon = styled.div`
  margin-right: 14px;
  line-height: 1.5em;
`;

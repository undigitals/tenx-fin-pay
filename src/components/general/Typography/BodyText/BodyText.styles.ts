import styled, { css } from 'styled-components';
import { getProp, ifProp } from 'utils/helpers/styleHelpers';
import { FONT_SIZE, SPACER_SIZE, WEIGHT_SIZE } from 'components/general/Typography/Typography.types';
import { IBodyText, IBodyTextContainer } from './BodyText.types';

export const SBodyTextContainer = styled.div<IBodyTextContainer>`
  display: ${getProp('display', 'flex')};
  white-space: ${ifProp('nowrap', 'nowrap', 'normal')};
  flex-direction: row;
  align-items: center;
  justify-content: ${getProp('justifyContent')};
  cursor: ${ifProp('cursorPointer', 'pointer', 'default')};

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

  .svg-icon {
    position: relative;
  }
`;

export const SBodyText = styled.p<IBodyText>`
  margin: 0;
  word-break: break-word;
  font-family: ${getProp('font')};
  font-size: ${({ size, textType }) => FONT_SIZE[textType][size]};
  font-weight: ${({ fontWeight }) => WEIGHT_SIZE[fontWeight]};
  color: ${({ color, theme }) => theme[color]};
  display: ${getProp('display', 'block')};
  text-align: ${getProp('textAlign')};
  line-height: ${getProp('lineHeight', 1.2)};
  font-style: ${getProp('fontStyle')};
  text-decoration: ${ifProp('underlined', 'underline', 'none')};
`;

export const SIcon = styled.div`
  line-height: 1.5em;
  margin-right: 12px;
`;

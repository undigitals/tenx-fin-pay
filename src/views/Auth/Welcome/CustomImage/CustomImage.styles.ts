import styled, { css } from 'styled-components/macro';
import { ifProp, getProp } from 'utils/helpers/styleHelpers';
import { ISImageProps } from './CustomImage.types';

const STopLeftPosition = css`
  top: 20px;
  left: 20px;
`;

const STopRightPosition = css`
  top: 20px;
  right: 20px;
`;

const SBottomLeftPosition = css`
  bottom: 20px;
  left: 20px;
`;

const SBottomRightPosition = css`
  bottom: 20px;
  right: 20px;
`;

export const SImageWrapper = styled.div<ISImageProps>`
  position: absolute;
  max-width: 15%;

  ${ifProp(
    'width',
    css`
      max-width: ${getProp('width')};
    `
  )};

  ${({ $position }) => {
    switch ($position) {
      case 'topLeft':
        return STopLeftPosition;
      case 'topRight':
        return STopRightPosition;
      case 'bottomLeft':
        return SBottomLeftPosition;
      case 'bottomRight':
        return SBottomRightPosition;
      default:
        return SBottomRightPosition;
    }
  }}
`;

export const SImage = styled.img`
  width: 100%;
`;

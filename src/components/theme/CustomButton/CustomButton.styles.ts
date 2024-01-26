import styled from 'styled-components';
import { css } from 'styled-components/macro';
import { getColor, mediaUpTo } from 'utils/helpers/styleHelpers';
import { transparentize } from 'polished';
import { FONT_SIZE } from 'components/general/Typography/Typography.types';
import { ICustomButtonStyleProps } from './CustomButton.types';

const mobileMedia = css`
  ${mediaUpTo(
    'mobile',
    css`
      padding: 8px 10px;
      font-size: ${FONT_SIZE.bodyText.M};
    `
  )}
`;

const SCommon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  font-weight: 500;
  font-family: Poppins;
  transition: all 100ms linear;
  white-space: nowrap;
`;

// Size
const SPresetDefaultSize = css`
  width: 100%;
  padding: 12px 32px;
  font-size: 18px;
  line-height: 28px;
  ${mobileMedia}
`;

const SPresetSmallSize = css`
  min-width: 104px;
  padding: 8px 14px;
  font-size: 12px;
  line-height: 18px;
`;

const SPresetMiddleSize = css`
  min-width: 113px;
  padding: 8px 24px;
  font-size: 14px;
  line-height: 20px;
`;

const SPresetMiddleStretchSize = css`
  width: 100%;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

const SPresetXlSize = css`
  width: 100%;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;

const SPresetMiddleAltSize = css`
  min-width: 120px;
  padding: 10px 24px;
  font-size: 14px;
  line-height: 20px;
`;

// Style
const SPresetOutlineDisabled = css`
  background: transparent;
  color: ${getColor('charcoal40')};
  cursor: not-allowed;
  border: 2px solid ${getColor('charcoal40')};
`;

const SPresetOutline = css`
  ${SCommon};

  background: transparent;
  color: ${getColor('blue')};
  border: 2px solid ${getColor('blue')};

  &:disabled {
    ${SPresetOutlineDisabled};
  }
`;

const SPresetPrimaryDisabled = css`
  background: ${getColor('charcoal40')};
  cursor: not-allowed;
  border: 2px solid ${getColor('charcoal40')};
`;

const SPresetPrimarySolid = css`
  ${SCommon};

  background: ${getColor('blue')};
  color: ${getColor('white')};
  border: 2px solid ${getColor('blue')};

  &:hover {
    background: ${(props) => transparentize(0.1, getColor('blue')(props) as string)};
  }

  &:active {
    background: ${getColor('blue')};
  }

  &:disabled {
    ${SPresetPrimaryDisabled};
  }
`;

const SPresetSecondarySolid = css`
  ${SCommon};
  background: ${getColor('white')};
  color: ${getColor('blue')};
  border: 2px solid ${getColor('blue')};
  &:hover {
    background: ${(props) => transparentize(0.1, getColor('blue')(props))};
  }
  &:active {
    background: ${getColor('white')};
  }
  &:disabled {
    ${SPresetPrimaryDisabled};
  }
`;

const SPresetPrimaryWithOutline = css`
  ${SCommon}

  background: ${getColor('blue')};
  color: ${getColor('white')};
  border: 2px solid ${getColor('blue')};

  &:disabled {
    ${SPresetOutlineDisabled};
  }
`;

const SPresetPrimaryRed = css`
  ${SCommon};

  color: ${getColor('white')};
  background: ${getColor('red')};
  border: 2px solid ${getColor('red')};

  &:hover {
    background: ${(props) => transparentize(0.1, getColor('red')(props))};
  }

  &:active {
    background: ${getColor('red')};
  }

  &:disabled {
    ${SPresetOutlineDisabled};
  }
`;

const SPresetOutlineRed = css`
  ${SCommon};

  color: ${getColor('red')};
  background: transparent;
  border: 2px solid ${getColor('red')};
`;

const SPresetTransparent = css`
  ${SCommon};

  color: ${getColor('charcoal')};
  background: transparent;
  border: 2px solid ${getColor('transparent')};
`;

// Elements
export const SButton = styled.button`
  // initial dynamic style

  ${({ $preset }: ICustomButtonStyleProps) => {
    switch ($preset) {
      case 'primary':
        return SPresetPrimarySolid;
      case 'secondary':
        return SPresetSecondarySolid;
      case 'red':
        return SPresetOutlineRed;
      case 'primary-red':
        return SPresetPrimaryRed;
      case 'primary-with-outline':
        return SPresetPrimaryWithOutline;
      case 'transparent':
        return SPresetTransparent;
      default:
        return SPresetOutline;
    }
  }}

  ${({ $size }: ICustomButtonStyleProps) => {
    switch ($size) {
      case 'small':
        return SPresetSmallSize;
      case 'middle':
        return SPresetMiddleSize;
      case 'xl':
        return SPresetXlSize;
      case 'middleStretch':
        return SPresetMiddleStretchSize;
      case 'middleAlt':
        return SPresetMiddleAltSize;
      case 'large':
      default:
        return SPresetDefaultSize;
    }
  }}

  // Other inline styles
  ${({ $StyleObj }: ICustomButtonStyleProps) => css({ ...$StyleObj })};
`;

// Helpers
export const SChildrenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

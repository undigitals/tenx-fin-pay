import styled, { css } from 'styled-components/macro';
import { getColor } from 'utils/helpers/styleHelpers';
import { transparentize } from 'polished';
import { Icon } from 'components/general/Icon/Icon';
import { TChipElProps, TChipElStyleProps } from './Chip.types';

// Size Presets
const SChipCommon = css`
  padding: 0 24px;
  height: 36px;
  border: 2px transparent solid;
  border-radius: 100px;
  cursor: pointer;

  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-family: Poppins, Arial, sans-serif;
`;

const SChipMiddleSize = css`
  ${SChipCommon};
`;

const SChipBigSize = css`
  ${SChipCommon};

  height: 55px;
  padding: 15px 40px;
  font-size: 18px;
  line-height: 23px;
`;

const SChipSmallSize = css`
  ${SChipCommon};

  height: auto;
  padding: 5px 8px;
  font-size: 12px;
  line-height: normal;
`;

// Color Presets
const SChipDefaultPreset = css`
  background: transparent;
  color: ${getColor('charcoal60')};
  border-color: ${getColor('charcoal60')};
`;

const SChipDefaultActivePreset = css`
  background: transparent;
  color: ${getColor('blue')};
  border-color: ${getColor('blue')};
`;

const SChipPrimaryPreset = css`
  background: transparent;
  color: ${getColor('blue')};
  border-color: ${getColor('blue')};
`;

const SChipPrimaryActivePreset = css`
  background: ${getColor('blue')};
  color: ${getColor('white')};

  &:hover {
    background: ${(props) => transparentize(0.1, getColor('blue')(props))};
  }

  &:active {
    background: ${getColor('blue')};
  }
`;

const SChipCreamPreset = css`
  background: ${getColor('cream')};
  color: ${getColor('blue')};

  &:hover {
    background: ${(props) => transparentize(0.1, getColor('cream')(props))};
  }

  &:active {
    background: ${getColor('cream')};
  }
`;

const SChipCreamActivePreset = css`
  // mock
  ${SChipCreamPreset};

  border-color: ${getColor('blue')};
`;

const SChipLightPreset = css`
  background: ${getColor('charcoal5')};
  color: ${getColor('charcoal')};

  &:hover {
    background: ${(props) => transparentize(0.1, getColor('cream')(props))};
  }
`;

const SChipDefaultDisabledPreset = css`
  background: ${getColor('charcoal10')};
  color: ${getColor('charcoal30')};
  cursor: not-allowed;

  &:hover {
    background: ${(props) => transparentize(0.1, getColor('charcoal10')(props))};
  }

  &:active {
    background: ${getColor('charcoal10')};
  }
`;

const SChipLightActivePreset = css`
  background: ${getColor('blue10')};
  color: ${getColor('blue')};
`;

const SChipRedPreset = css`
  background: transparent;
  color: ${getColor('red')};
  border-color: ${getColor('red')};
`;

const SChipRedActivePreset = css`
  background: ${getColor('red')};
  color: ${getColor('white')};

  &:hover {
    background: ${(props) => transparentize(0.1, getColor('red')(props))};
  }

  &:active {
    background: ${getColor('red')};
  }
`;

const SChipTabPreset = css`
  background: ${getColor('white')};
  color: ${getColor('charcoal')};
`;

const SChipTabActivePreset = css`
  ${SChipPrimaryActivePreset};
`;

// Main styles
export const SChipContentLayout = styled.span``;

// assets styles
export const SChipImgLayout = styled.div`
  pointer-events: inherit;
  display: inline-flex;
  // background: lightpink;
  margin-right: 10px;
`;

export const SChipIconLayoutImg = styled(Icon)`
  pointer-events: none;
  background: none;
  color: red;
`;

export const SChipIconLayout = styled.div`
  display: inline-flex;
  background: lightgray;
  margin-right: 10px;
`;

export const SChip = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 100ms linear;

  ${({ $size }: TChipElProps) => {
    switch ($size) {
      case 'small':
        return SChipSmallSize;
      case 'big':
        return SChipBigSize;
      case 'middle':
      default:
        return SChipMiddleSize;
    }
  }};

  ${({ $preset, $isActive }: TChipElProps) => {
    switch ($preset) {
      case 'disabled':
        return SChipDefaultDisabledPreset;

      case 'primary':
        return $isActive ? SChipPrimaryActivePreset : SChipPrimaryPreset;
      case 'cream':
        return $isActive ? SChipCreamActivePreset : SChipCreamPreset;
      case 'light':
        return $isActive ? SChipLightActivePreset : SChipLightPreset;
      case 'red':
        return $isActive ? SChipRedActivePreset : SChipRedPreset;
      case 'tab':
        return $isActive ? SChipTabActivePreset : SChipTabPreset;
      case 'default':
      default:
        return $isActive ? SChipDefaultActivePreset : SChipDefaultPreset;
    }
  }};

  ${({ className, $styleProps, $extraStyles }: TChipElStyleProps) => css({ className, ...$styleProps, ...$extraStyles })};
  ${(props) =>
    props.$extraStyles?.color &&
    css`
      color: ${getColor(props.$extraStyles.color)(props)};
    `}

  ${(props) =>
    props.$extraStyles?.background &&
    css`
      background: ${getColor(props.$extraStyles.background)(props)};
      &:hover {
        background: ${props.noHoverEffect ? getColor(props.$extraStyles.background)(props) : transparentize(0.1, getColor(props.$extraStyles.background)(props))};
      }
    `}

${(props) =>
    props.$extraStyles?.borderColor &&
    css`
      border-color: ${getColor(props.$extraStyles.borderColor)(props)};
    `}
`;

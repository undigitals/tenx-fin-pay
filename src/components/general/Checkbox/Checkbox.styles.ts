import styled from 'styled-components';
import { css } from 'styled-components/macro';
import { getColor, getProp } from 'utils/helpers/styleHelpers';
import { Icon } from 'components/general/Icon/Icon';
import { ISInputWrapper } from './Checkbox.types';

export const SErrorPreset = css`
  border: 2px solid ${getColor('red')};
`;

// Checkbox styles
export const SCheckboxWrapper = styled.div`
  display: inline-flex;
  position: relative;
`;

export const SInputWrapper = styled.div<ISInputWrapper>`
  display: flex;
  background-color: ${getProp('bgColor', 'transparent')};
  justify-content: center;
  align-items: center;
  position: relative;
  min-width: 24px;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  margin-right: 8px;
  border: 2px solid ${getColor('charcoal20')};

  ${({ $isError }) =>
    $isError &&
    css`
      ${SErrorPreset};
    `};
`;

export const SIcon = styled(Icon)`
  position: absolute;
  cursor: pointer;
`;

export const SCheckbox = styled.input`
  cursor: pointer;
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;

  &:disabled {
    cursor: not-allowed;
  }
`;

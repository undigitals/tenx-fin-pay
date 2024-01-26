import { Select } from 'antd';
import styled, { css } from 'styled-components/macro';
import { getColor, getColorByProp, getProp } from 'utils/helpers/styleHelpers';
import { CustomDropdownInputProps } from './CustomDropdown.type';

export const SCustomDropdown = styled(Select)<CustomDropdownInputProps>`
  background: ${getColorByProp('bgColor', 'transparent')} !important;
  padding: ${getProp('padding')};
  margin-bottom: ${getProp('marginBottom')}px;
  margin-right: ${getProp('marginRight')}px;
  border-radius: 100px !important;
  height: ${getProp('height')}px;
  width: 100%;
  font-size: 16px !important;
  ::placeholder {
    color: ${getColor('charcoal60')};
  }

  :hover,
  :focus,
  :active {
    background: ${({ theme, bgColor }) => (bgColor ? theme[bgColor] : 'transparent')};
  }

  .ant-select-selector {
    background: ${getColorByProp('bgColor', 'transparent')} !important;
    border-radius: 100px !important;
    height: 55px !important;
    padding-top: 8px !important;
  }
  .ant-select-selection-placeholder {
    color: ${getColor('charcoal40')} !important;
    margin-left: 15px;
  }
  .ant-select-arrow {
    color: ${getColor('black')} !important;
    margin-right: 15px;
  }

  ${(props) =>
    props.stylePreset === 'on-white' &&
    css`
      .ant-select-selector {
        padding: 0 !important;
        background: ${getColorByProp('bgColor', 'white')} !important;
        border: 2px solid ${getColor('charcoal10')} !important;
        border-radius: 16px !important;
        height: 55px !important;
      }

      &:focus {
        border: 2px solid ${getColor('blue')} !important;
        background: ${getColor('white')};
      }

      &:hover {
        background: ${getColor('white')};
      }

      &.ant-select-open {
        .ant-select-selector {
          border: 2px solid ${getColor('blue')} !important;
        }
      }

      .ant-select-selection-item {
        line-height: 18px !important;
        padding: 16px 20px !important;
      }
    `}
  ${({ dDstyle }) =>
    dDstyle === 'transfer' &&
    css`
      .ant-select-selector {
        border-radius: 10px !important;
      }
      .ant-select-focused .ant-select-selector,
      .ant-select-selector:focus,
      .ant-select-selector:active,
      .ant-select-open .ant-select-selector {
        border: solid ${getColor('blue')} !important;
        border-width: 2px 2px 2px 2px !important;
        box-shadow: none !important;
        border-radius: 10px 10px 10px 10px !important;
      }
      .ant-select-selector .ant-select-selection-item {
        margin: -10px -12px 0 -12px !important;
        padding: 0 32px 0 12px !important;
        width: 100%;
        border: solid ${getColor('blue')} !important;
        border-width: 2px 2px 2px 2px !important;
        border-radius: 10px 10px 10px 10px !important;
        box-shadow: none !important;
      }
    `};

  .ant-select-selection-search {
    height: 100% !important;
    left: 0 !important;

    &-input {
      font-size: 16px !important;
      padding: 16px 20px !important;
    }
  }

  .ant-select-selection-search-input {
    height: 100% !important;
    font-size: 16px !important;
    left: 0 !important;
    padding: 16px 20px !important;
  }
`;

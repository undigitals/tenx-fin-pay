import styled, { css } from 'styled-components/macro';
import { Checkbox } from 'antd';
import Text from 'antd/lib/typography/Text';
import { getColor, getProp } from 'utils/helpers/styleHelpers';
import { ISCheckboxProps } from './CustomCheckbox.type';

export const SCustomCheckbox = styled(Checkbox)<ISCheckboxProps>`
  align-items: center;

  &.multiple {
    .ant-checkbox {
      top: 12px;
    }
  }

  &.beige {
    .ant-checkbox {
      &-checked {
        .ant-checkbox-inner {
          border-color: ${getColor('creamSS2')};
        }
      }

      & + span {
        padding-right: 6px;
        padding-left: 16px;
      }

      span {
        color: ${getColor('blue')};
        top: 4px;
      }

      &-wrapper {
        background: ${getColor('creamSS2')};

        :hover {
          border-color: ${getColor('blue')};
        }
      }

      &-inner {
        width: 30px;
        height: 30px;
        border: 1px solid ${getColor('creamSS2')};
        background: ${getColor('cream')};
        border-radius: 4px;
        top: -4px;
        border-width: 2.3px;
        border-color: ${getColor('creamSS3')};

        &:after {
          left: 25%;
          top: 45%;
        }
      }
    }

    .ant-typography {
      color: ${getColor('charcoal')};
      font-size: 16px;
      bottom: 1px;
    }
  }

  .ant-checkbox {
    span {
      color: ${getColor('blue')};
    }

    &-wrapper {
      background: ${getColor('creamSS2')};
      border-color: ${({ borderColor }) => getColor(borderColor)};

      :hover {
        border-color: ${({ borderColor }) => getColor(borderColor)};
      }
    }

    &-inner {
      ${({ borderColor, $chBoxType }) => {
        if ($chBoxType === 'registration') {
          return css`
            height: 24px;
            width: 24px;
            border: 2px solid ${getColor('charcoal10')};
            border-radius: 5px;
            background-color: ${getColor('white')};
          `;
        }

        return css`
          width: 26px;
          height: 26px;
          border: 1px solid ${getColor(borderColor)};
          border-radius: 4px;
          background-color: transparent;
        `;
      }};

      &:after {
        left: 25%;
        top: 45%;
      }
    }
  }

  .ant-checkbox-checked {
    &:after {
      border: none;
    }

    .ant-checkbox-inner {
      background: ${getColor('creamSS2')};
      border-color: ${getColor('charcoal60')};

      :hover {
        border-color: ${getColor('charcoal60')};
      }

      :after {
        background: ${getColor('creamSS2')};
        border-color: ${getColor('blue')};
        width: 7px;
        height: 13px;
      }

      ${({ $chBoxType }) => {
        if ($chBoxType === 'registration') {
          return css`
            background: ${getColor('white')};
            border-color: ${getColor('charcoal10')};

            &:hover {
              border-color: ${getColor('charcoal10')};
            }

            &:after {
              background: ${getColor('white')};
            }
          `;
        }

        return css``;
      }};
    }
  }

  .ant-checkbox-wrapper:hover,
  .ant-checkbox:hover,
  .ant-checkbox-input:focus {
    .ant-checkbox-inner {
      ${({ $chBoxType }) => {
        if ($chBoxType === 'registration') {
          return css`
            border: 2px solid ${getColor('charcoal10')};
          `;
        }

        return css`
          border: 1px solid ${getColor('charcoal60')};
        `;
      }};
    }
  }
  margin-bottom: ${getProp('marginBottom', 10)}px;
  ${({ $StyleObj }) => css({ ...$StyleObj })};
`;

export const SCheckboxText = styled(Text)`
  color: ${getColor('charcoal60')};
  position: relative;
`;

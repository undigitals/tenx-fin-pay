import { MaskedInput } from 'antd-mask-input';
import styled, { css } from 'styled-components';
import { getColor, getColorByProp, getProp, ifProp } from 'utils/helpers/styleHelpers';
import { ISMaskedInput } from './MaskedInput.types';

export const SMaskedInput = styled(MaskedInput)<ISMaskedInput>`
  ${ifProp(
    'isSuccess',
    css`
      border: 2px solid ${getColor('green')} !important;

      :hover {
        border: 2px solid ${getColor('green')} !important;
      }
    `
  )};

  ${ifProp(
    'isError',
    css`
      border: 2px solid ${getColor('red')} !important;

      :hover {
        border: 2px solid ${getColor('red')} !important;
      }

      :focus {
        border: 2px solid ${getColor('red')} !important;
      }
    `
  )};

  border: 2px solid ${getColor('charcoal10')};
  border-radius: 16px;

  margin-top: ${getProp('marginRight')}px;
  margin-bottom: ${getProp('marginBottom')}px;
  margin-right: ${getProp('marginRight')}px;
  margin-left: ${getProp('marginRight')}px;
  min-width: ${getProp('minWidth')}px;

  height: 56px;
  padding: 10px 20px;

  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${getColor('charcoal')};

  ::placeholder {
    font-weight: 400;
    font-size: 16px;
    color: ${getColorByProp('placeholderColor')};
  }

  :disabled {
    background: ${getColor('charcoal5')};
  }

  :hover,
  :focus {
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
  }

  &.ant-input {
    ${ifProp(
      'onBeige',
      css`
        border: none;
        outline: none;
        transition: unset;

        :disabled {
          border: none !important;
          outline: 2px solid ${getColor('charcoal10')} !important;
        }

        :hover {
          border: none !important;
          outline: none !important;
        }

        :focus {
          border: none !important;
          outline: 2px solid ${getColor('blue')} !important;
          box-shadow: none !important;
          -webkit-box-shadow: none !important;
        }
      `
    )};

    ${ifProp(
      'isError',
      css`
        border: none !important;
        outline: 2px solid ${getColor('red')} !important;

        :hover {
          border: none !important;
          outline: 2px solid ${getColor('red')} !important;
        }

        :focus {
          border: none !important;
          outline: 2px solid ${getColor('red')} !important;
        }
      `
    )};

    ${ifProp(
      'isSuccess',
      css`
        border: none !important;
        outline: 2px solid ${getColor('green')} !important;

        :hover {
          border: none !important;
          outline: 2px solid ${getColor('green')} !important;
        }
      `
    )};

    :hover {
      border: none;
      outline: 2px solid ${getColor('charcoal10')};
    }

    :focus {
      border: none;
      outline: 2px solid ${getColor('blue')};
    }

    ${ifProp(
      'isBorderHidden',
      css`
        border: none !important;
        outline: 2px solid ${getColor('white')};
        :hover {
          border: none;
          outline: 2px solid ${getColor('white')};
        }
      `
    )}
  }

  &.ant-input-affix-wrapper {
    ${ifProp(
      'onBeige',
      css`
        border: none;
        transition: unset;

        :disabled {
          border: 2px solid ${getColor('charcoal10')} !important;
        }

        :hover {
          border: none !important;
        }

        &-focused {
          border: 2px solid ${getColor('blue')} !important;
          box-shadow: none !important;
          -webkit-box-shadow: none !important;

          :hover {
            border: 2px solid ${getColor('blue')} !important;
          }
        }

        &-focused.ant-input-affix-wrapper-status-error {
          border: 2px solid ${getColor('red')} !important;
        }

        &-status-error:hover {
          border: none !important;
        }
      `
    )};

    :hover {
      border: 2px solid ${getColor('charcoal10')};
    }

    &-focused {
      border: 2px solid ${getColor('blue')} !important;
      box-shadow: none !important;
      -webkit-box-shadow: none !important;
    }

    &-focused.ant-input-affix-wrapper-status-error {
      border: 2px solid ${getColor('red')} !important;
    }

    .ant-input {
      &-prefix {
        margin-right: 12px;

        svg {
          color: ${getColor('charcoal40')};
          width: 20px;
          height: 20px;
        }
      }

      &-suffix {
        margin-left: 12px;

        svg {
          ${ifProp(
            'isSuffixIcon',
            css``,
            css`
              color: ${getColor('charcoal40')} !important;
              width: 20px;
              height: 20px;
            `
          )}
        }
      }
    }
  }
`;

import styled, { css } from 'styled-components/macro';
import { Input } from 'antd';
import { Icon } from 'components/general/Icon/Icon';
import { getColor, getProp, ifProp } from 'utils/helpers/styleHelpers';
import { ICustomInputProps } from './CustomInput.types';

export const SINputContainer = styled.div`
  position: relative;
`;

export const SAfterIcon = styled(Icon)`
  position: absolute;
  top: 16px;
  right: 18px;
`;

export const SCustomInput = styled(Input)<ICustomInputProps>`
  background: ${({ theme, bgColor }) => (bgColor ? theme[bgColor] : 'transparent')};
  padding:  ${getProp('padding')};
  margin-bottom: ${getProp('marginBottom')}px;
  margin-right: ${getProp('marginRight')}px;
  margin-top: ${getProp('marginTop')}px;
  border: 0;
  border-radius: ${getProp('borderRadius')}px !important;
  height: ${getProp('height')}px;
  width: 100%;
  font-size: 16px !important;
  
  ::placeholder {
    color: ${getColor('charcoal40')};
  }

  :hover, :focus, :active {
    background: ${({ theme, bgColor }) => (bgColor ? theme[bgColor] : 'transparent')};
  }

  .ant-input {
    color: ${getColor('charcoal60')} !important;
    font-size: 16px !important;
  }

  &.ant-input-status-error, 
  &.ant-input-borderless.ant-input-status-error {
    border: 1px solid ${getColor('red')} !important;
  }

  ${ifProp(
    'isSuccess',
    css`
      border: 1px solid ${getColor('green')} !important;
    `
  )}};

  .anticon {
    color: ${getColor('blue')};
  }

  .ant-input-prefix {
    margin-right: 10px;
  }
  
  
  ${(props) =>
    props.inputTheme !== 'sms-code' &&
    ifProp(
      'isError',
      css`
        border: 1px solid ${getColor('red')} !important;
      `
    )};
  
  ${(props) =>
    props.inputTheme === 'sms-code' &&
    css`
      background: transparent;
      border-radius: 16px !important;
      padding: 10px;
      font-size: 24px;

      width: 56px;
      height: 56px;

      &:focus {
        ::placeholder {
          color: transparent !important;
        }
      }

      ${ifProp(
        'isError',
        css`
          color: ${getColor('red')};
          border: 2px solid ${getColor('red')} !important;
        `
      )}
    `}
    
    ${(props) =>
      props.inputTheme === 'filter' &&
      css`
        border: 2px solid ${getColor('charcoal5')};

        .ant-input {
          font-size: 12px !important;
        }

        :hover {
          border: 2px solid ${getColor('charcoal5')};
        }
      `}

    ${(props) =>
      props.inputTheme === 'my-info' &&
      css`
        border: 2px solid ${getColor('charcoal10')} !important;
        background: transparent;
        border-radius: 16px !important;
        padding: 10px;
        height: 48px;
        max-width: 33px;
        font-size: 24px;
        gap: 0.5px;

        &:focus {
          border: 2px solid ${getColor('charcoal10')} !important;
        }
      `}

  ${(props) =>
    props.inputTheme === 'on-white' &&
    css`
      background: ${getColor('white')};
      border: 2px solid ${getColor('charcoal10')} !important;
      background: white;
      border-radius: 16px !important;
      padding: 20px ${ifProp('iconAfter', '45px', '20px')} 20px 20px;
      height: 56px;
      font-size: 16px;
      gap: 0.5px;

      &:focus {
        border: 2px solid ${getColor('blue')} !important;
        background: ${getColor('white')};
      }

      &:hover {
        background: ${getColor('white')};
      }

      &.ant-input {
        &-status-error,
        &-borderless.ant-input-status-error {
          border: 2px solid ${getColor('red')} !important;
        }

        &-status-success,
        &-borderless.ant-input-status-success {
          border: 2px solid ${getColor('green')} !important;
        }
      }
    `}
  
    ${(props) =>
      props.inputTheme === 'my-info-big' &&
      css`
        border: 1.5px solid ${getColor('charcoal10')} !important;
        background: transparent;
        border-radius: 10px !important;
        padding: 10px;
        height: 56px;
        min-width: 56px;
        font-size: 24px;
        gap: 0.5px;

        &:focus {
          border: 2px solid ${getColor('charcoal10')} !important;
        }
      `}

    ${(props) =>
      props.inputTheme === 'profile-input' &&
      css`
        border: 2px solid ${getColor('blue')} !important;
        background: transparent;
        border-radius: 15px;
        padding: 10px 20px;
        height: 56px;
        min-width: 56px;
        font-size: 24px;
        gap: 0.5px;
        &:focus {
          border: 2px solid ${getColor('blue')} !important;
        }
      `}

    :disabled {
      background: ${getColor('charcoal10')};
    }
`;

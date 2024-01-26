import styled from 'styled-components/macro';
import { Radio } from 'antd';
import { getColor } from 'utils/helpers/styleHelpers';

export const SCustomRadioButtonsGroup = styled(Radio.Group)`
  display: flex;
  justify-content: space-between;

  .ant-radio-button-wrapper.ant-radio-button-wrapper-checked {
    border: 1.5px solid ${getColor('blue')} !important;
    color: ${getColor('blue')};
  }

  .ant-radio-button-wrapper {
    width: 100%;
    height: auto;
    background: none;
    border-radius: 100px;
    text-align: center;
    padding: 4px;
    margin-top: 16px;
    border: 1.5px solid ${getColor('charcoal40')};
    color: ${getColor('charcoal40')};

    &:first-child {
      margin-right: 20px;
    }

    &:before {
      content: none;
    }
  }
`;

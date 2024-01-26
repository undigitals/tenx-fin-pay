import styled from 'styled-components/macro';
import SignatureCanvas from 'react-signature-canvas';
import { MEDIA_SIZE, getColor } from 'utils/helpers/styleHelpers';
import { CustomCheckbox } from 'components/theme/CustomCheckbox/CustomCheckbox';
import { CustomInput } from 'components/theme/CustomInput/CustomInput';
import { InputNumber } from 'antd';

export const SLayout = styled.div`
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  @media screen and (min-width: ${MEDIA_SIZE.minDesktop}px) {
    background-color: ${getColor('white')};
    border-radius: 25px;

    .footer button {
      max-width: fit-content;
      padding: 14px 40px;
      margin-top: 0;
    }
  }
`;

export const SInputNumber = styled(InputNumber)`
  &.ant-input-number-affix-wrapper {
    .ant-input-number-prefix {
      margin-right: 12px;

      svg {
        color: ${getColor('charcoal40')} !important;
        width: 20px;
        height: 20px;
      }
    }

    .ant-input-number {
      .ant-input-number-input-wrap {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: ${getColor('charcoal')};
        font-family: 'DM Sans';
      }

      .ant-input-number-handler-wrap {
        visibilty: none !important;
      }
    }

    min-width: 224px;
    height: 56px;
    padding: 10px 20px;
    width: 100%;

    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: ${getColor('charcoal')};

    border: 2px solid ${getColor('charcoal10')};
    border-radius: 16px;

    ::placeholder {
      font-weight: 400;
      font-size: 16px;
      color: ${getColor('charcoal40')};
    }

    :disabled {
      background: ${getColor('charcoal5')};
    }

    :hover {
      border: 2px solid ${getColor('charcoal10')};
    }

    &-focused {
      box-shadow: none !important;
      -webkit-box-shadow: none !important;
      border: 2px solid ${getColor('blue')} !important;
    }
  }
`;

export const SSignatureCanvas = styled(SignatureCanvas)`
  border-bottom: 1px solid ${getColor('charcoal')} !important;
`;

export const SCheckbox = styled(CustomCheckbox)`
  .ant-checkbox {
    &-checked {
      .ant-checkbox-inner {
        border-color: ${getColor('transparent')};

        :after {
          background: ${getColor('transparent')} !important;
        }
      }
    }

    & + span {
      padding-right: 6px;
      padding-left: 16px;
    }

    span {
      color: ${getColor('charcoal70')};
      top: 4px;
    }

    &-wrapper {
      background: ${getColor('transparent')};

      :hover {
        border-color: ${getColor('charcoal20')};
      }
    }

    &-inner {
      width: 24px;
      height: 24px;
      border: 2px solid ${getColor('charcoal20')} !important;
      background: ${getColor('transparent')} !important;
      border-radius: 8px;
      top: -4px;
      border-width: 2.3px;
      border-color: ${getColor('charcoal')};

      &:after {
        left: 25%;
        top: 45%;
      }
    }
  }
`;

export const SInput = styled(CustomInput)`
  width: 44px;
  height: 20px;
  border-radius: 0;
  border-bottom: 1px solid ${getColor('charcoal')};

  :hover {
    border-bottom: 1px solid ${getColor('charcoal')};
  }
`;

import { MaskedInput } from 'antd-mask-input';
import styled from 'styled-components/macro';
import { getColor, MEDIA_SIZE } from 'utils/helpers/styleHelpers';

export const SInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 30px;

  .ant-form-item {
    margin: 0;

    &-label {
      padding: 0 0 4px 0;
    }
  }

  .ant-form-item-label > label {
    display: flex;
    width: 100%;
  }
`;

export const SButtonWrapper = styled.div`
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;

export const SMaskedInput = styled(MaskedInput)`
  background: ${getColor('white')};
  color: ${getColor('charcoal60')} !important;
  border-radius: 100px !important;
  height: 55px;
  padding: 17px 26px;
  font-size: 16px;

  ::placeholder {
    color: ${getColor('charcoal60')};
  }

  :hover,
  :focus,
  :active {
    background: ${getColor('white')};
  }

  :disabled {
    background: ${getColor('charcoal10')};
  }
`;

export const SFieldInputContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

import styled, { css } from 'styled-components/macro';
import { getColor, ifProp, mediaUpTo } from 'utils/helpers/styleHelpers';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { CustomInput } from 'components/theme/CustomInput/CustomInput';
import { ISInputNumber } from './SmsCodeForm.types';

const CompletedStyles = css`
  color: ${getColor('green')} !important;
  border: 2px solid ${getColor('charcoal10')};
`;

const WrongCodeStyles = css`
  color: ${getColor('red')} !important;
  border: 2px solid ${getColor('red')} !important;
`;

export const SFields = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${mediaUpTo(
    400,
    css`
      gap: 2px;
    `
  )}
`;

export const SSmsCodeWrapper = styled.div`
  align-items: center;
  flex-direction: column;
  display: flex;
  position: relative;
`;

export const SInputNumber = styled(CustomInput)<ISInputNumber>`
  max-width: 56px;
  height: 56px;
  min-width: 33px;
  padding: 0;
  text-align: center;

  ${mediaUpTo(
    410,
    css`
      height: 50px;
      max-width: 50px;
    `
  )}

  ${mediaUpTo(
    357,
    css`
      height: 40px;
      max-width: 40px;
    `
  )}


  font-weight: 700;
  font-size: 14px;

  border: 2px solid ${getColor('charcoal10')} !important;

  ${ifProp('isCompleted', CompletedStyles)};
  ${ifProp('isWrongCode', WrongCodeStyles)};

  :focus {
    border: 2px solid ${getColor('charcoal10')} !important;

    ::placeholder {
      color: transparent;
    }
  }
`;

export const SError = styled(CustomText)`
  position: absolute;
  bottom: -48px;
  margin: 0;
`;

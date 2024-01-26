import styled, { css } from 'styled-components/macro';
import { getColor, ifProp, mediaUpTo } from 'utils/helpers/styleHelpers';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { ISInputNumber } from './PhoneForm.types';

export const SFields = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${mediaUpTo(
    500,
    css`
      gap: 2px;
    `
  )}
`;

export const SWrapper = styled.div`
  align-items: center;
  flex-direction: column;
  display: flex;
  position: relative;
  margin-left: 5px;
  margin-right: 5px;
`;

export const SInputNumber = styled(BaseInput)<ISInputNumber>`
  width: 8px;
  padding: 0;
  text-align: center;

  font-weight: 700;
  font-size: 14px;
  color: ${ifProp('isCompleted', '#5BB398', '#353131')};

  border: none;
  border-radius: 0px;

  :focus {
    border-bottom: 2px solid ${getColor('charcoal')};
    margin-bottom: 3px;

    ::placeholder {
      color: transparent;
    }
  }
`;

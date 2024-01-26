import styled from 'styled-components/macro';
import { Icon } from 'components/general/Icon/Icon';

export const SIconTooltip = styled(Icon).attrs({
  name: 'info',
  color: 'blue',
})`
  display: inline-block;
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-left: 10px;
  top: 3px;
`;

export const SInviteAndEarnFormLayout = styled.div`
  display: flex;
  flex-direction: column;

  & .base-input-container .base-input-input::placeholder,
  & .masked-input-input::placeholder {
    font-size: 11px;
    font-family: 'DM Sans', sans-serif;
  }
`;

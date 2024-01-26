import { getColor } from 'utils/helpers/styleHelpers';
import { Icon } from 'components/general/Icon/Icon';
import styled from 'styled-components';

export const SLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  .sing-up-btn {
    color: ${getColor('orange')};
    border-color: ${getColor('orange20')};
  }
`;
export const SList = styled.ul`
  position: relative;
  width: 100%;
  margin-top: 7px;
  padding: 0 5px;
  margin-bottom: 17px;
`;
export const SListItem = styled.li`
  position: relative;
  width: 100%;
  font-size: 14px;
  color: ${getColor('charcoal70')};
  font-family: DM Sans, sans-serif;
  display: flex;
  &::before {
    content: '\u2022';
    color: ${getColor('charcoal70')};
    font-weight: bold;
    display: inline-block;
    margin-right: 12px;
  }
`;

export const SIconWrapper = styled(Icon).attrs({
  name: 'internationalRemittance',
  size: 'big',
  color: 'orange',
})`
  background: ${getColor('orange5')};
  width: 39px;
  height: 39px;
  padding: 8px;
  border-radius: 50%;
`;

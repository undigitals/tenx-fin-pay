import styled from 'styled-components';
import { Icon } from 'components/general/Icon/Icon';
import { getColor } from 'utils/helpers/styleHelpers';

export const STableOfContentPage = styled.div`
  position: relative;

  .custom-row + .icon {
    position: absolute;
    right: 0;
    background: ${getColor('blue')};
    padding: 10px;
    border-radius: 50%;
  }
`;

export const SIcon = styled(Icon)`
  background: ${getColor('blue')};
  padding: 10px;
  border-radius: 50%;
  float: right;
`;

export const SIconWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 24px;
`;

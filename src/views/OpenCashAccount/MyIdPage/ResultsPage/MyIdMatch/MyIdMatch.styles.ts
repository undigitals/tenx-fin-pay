import styled from 'styled-components/macro';
import { Icon } from 'components/general/Icon/Icon';
import { getColor } from 'utils/helpers/styleHelpers';

export const SIcon = styled(Icon)`
  width: 150px;
  height: 150px;
`;

export const SDark = styled.div`
  color: ${getColor('charcoal')};
  font-weight: 700;
`;

import styled from 'styled-components';
import { Icon } from 'components/general/Icon/Icon';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';

export const SCustomCard = styled(CustomCard)`
  & .base-input-container .base-input-input::placeholder {
    font-size: 12px;
  }
`;

export const AddressLayout = styled.div`
  padding: 0 15px;
  background-color: white;
`;

export const SIcon = styled(Icon)`
  width: 22px;
  margin-bottom: 25px;
`;

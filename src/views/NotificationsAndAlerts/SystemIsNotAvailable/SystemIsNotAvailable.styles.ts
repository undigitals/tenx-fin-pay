import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SSystemNotAvailable = styled.div`
  margin-bottom: 40px;

  .icon-sign {
    margin-right: 24px;
  }

  .content {
    display: flex;
    padding: 22px 20px 24px;
    background: ${getColor('white')};
    border-radius: 20px;
  }
`;

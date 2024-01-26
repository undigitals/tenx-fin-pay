import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import styled from 'styled-components';

export const SModal = styled(CustomModal)`
  button:is(.default, .primary) {
    max-width: 115px;
    padding: 10px 24px;
    font-family: 'Poppins';
    font-size: 14px;
    line-height: 1.5;
    font-weight: 500;
  }
`;

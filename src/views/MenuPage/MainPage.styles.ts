import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { CustomTitle } from 'components/theme/CustomTitle/CustomTitle';

export const SPage = styled.div`
  padding: 0;
`;

export const SCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const SCardTitle = styled(CustomTitle)`
  align-self: flex-start;
`;

export const SLinkContainer = styled.div`
  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

export const STopLink = styled(Link)`
  font-size: 18px;
`;

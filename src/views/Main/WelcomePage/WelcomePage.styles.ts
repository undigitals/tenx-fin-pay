import styled from 'styled-components/macro';
import { CustomTitle } from 'components/theme/CustomTitle/CustomTitle';

export const STitle = styled(CustomTitle)`
  margin-bottom: 128px;
`;

export const SLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const SActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 42px;
  margin-bottom: 40px;
`;

import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding: 0 0 35px 5px;
  min-height: 100%;
  width: 100%;

  .birth-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    width: 100%;
    border-radius: 20px;
    background: ${getColor('white')};
    padding: 32px 24px;
    margin-top: 32px;
  }

  .footer {
    display: flex;
    flex-direction: column;
  }
`;

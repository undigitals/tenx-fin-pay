import styled from 'styled-components';

export const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0 0 35px 5px;

  .listItem {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .verificationCard {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &Inner {
      display: flex;
      align-items: center;
    }
  }
`;

import styled from 'styled-components';

export const SImg = styled.img`
  width: 50%;
  margin-left: 10%;
  @media screen and (max-width: 400px) {
    width: 40%;
    margin-left: 7%;
  }

  @media screen and (max-width: 350px) {
    width: 35%;
  }
`;

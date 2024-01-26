import styled from 'styled-components';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';

export const SContentLayout = styled.div`
  display: flex;
  flex-direction: column;

  .link-phone {
    color: #3e4fe5;
    text-decoration: underline;
  }

  & .list {
    list-style: none;
    padding-left: 8px;
  }

  & .list li {
    display: flex;
  }

  & .list li:before {
    content: '\u2022';
    color: #df4f4f;
    font-weight: bold;
    margin-right: 10px;
  }
`;

export const SCustomButton = styled(CustomButton)`
  width: auto;
`;

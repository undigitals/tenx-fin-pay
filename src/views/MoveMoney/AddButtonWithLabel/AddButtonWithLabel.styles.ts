import styled from 'styled-components/macro';
import { Button } from 'antd';
import { getColor } from 'utils/helpers/styleHelpers';

const ButtonAddContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonAdd = styled(Button)`
  border: 1px solid ${getColor('blue')};
  height: 30px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.5rem;

  span {
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: ${getColor('blue')};
  }
`;

export { ButtonAdd, ButtonAddContainer };

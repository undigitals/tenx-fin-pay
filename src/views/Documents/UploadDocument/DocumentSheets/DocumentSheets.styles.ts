import { Upload } from 'antd';
import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SActivityCard = styled(Upload)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 2px solid ${getColor('charcoal10')};
  cursor: pointer;
  width: 120px;
  height: 120px;
`;

import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SIntentsHeader = styled.div`
  display: flex;
  width: 80%;
`;

export const SButton = styled.button`
  border-radius: 50px;
  padding: 6.4px 14.4px;
  margin-top: 6px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${getColor('blue')};
  color: ${getColor('white')};
`;

export const SColumnLeft = styled.div`
  width: 43%;
`;

export const SAnswerWrapper = styled.div`
  margin-left: 10px;
  height: 130px;
  width: 62%;
  font-size: 14px;
  overflow-y: auto;
  word-break: break-word;
  flex-shrink: 0;
`;

export const SQuestionWrapper = styled.div`
  font-size: 14px;
`;

export const SIntentsHeaderLeft = styled.div`
  flex-shrink: 0;
  width: 35%;
`;

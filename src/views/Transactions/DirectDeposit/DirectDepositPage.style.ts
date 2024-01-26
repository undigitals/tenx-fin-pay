import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 5px;
  max-width: 536px;
  margin: 0 auto;

  .ant-form-item {
    margin-bottom: 12px;
  }

  .ant-checkbox + span {
    padding-left: 10px;
  }

  .ant-input-affix-wrapper .ant-input-prefix svg {
    color: ${getColor('charcoal')};
  }
`;

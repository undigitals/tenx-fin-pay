import { Icon } from 'components/general/Icon/Icon';
import styled from 'styled-components/macro';

export const SInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 20px;

  .ant-form-item {
    margin: 0;

    &-label {
      padding: 0 0 11px 15px;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }

  .checkbox-layout {
    display: flex;
    justify-content: flex-start;
  }
`;

export const SProductItem = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: flex-start;
  white-space: nowrap;

  .custom-text-inner {
    font-size: 18px;
    font-weight: 400;
  }
`;

export const SInfo = styled(Icon)`
  flex: 0 0 auto;
`;

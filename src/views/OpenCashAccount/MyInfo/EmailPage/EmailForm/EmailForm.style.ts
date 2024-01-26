import { Form } from 'antd';
import styled, { css } from 'styled-components';
import { Icon } from 'components/general/Icon/Icon';
import { mediaUpTo } from 'utils/helpers/styleHelpers';

export const SFormItem = styled(Form.Item)`
  &:last-child {
    margin-bottom: 0;
  }

  .flex {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const SInputWrapper = styled.div`
  position: relative;

  ${mediaUpTo(
    400,
    css`
      .icon-edit {
        width: 23px;
      }
    `
  )}
`;

export const SWrapper = styled.div`
  width: 100%;
`;

export const SIcon = styled(Icon)`
  position: absolute;
  top: 16px;
  right: 18px;
  z-index: 999;
`;

export const EditIcon = styled(Icon)`
  width: 16px;
  height: 16px;
`;

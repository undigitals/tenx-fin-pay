import { Form } from 'antd';
import styled from 'styled-components';

export const SCurrentPassword = styled(Form.Item)`
  margin-bottom: 24px;

  & + div {
    margin-bottom: 0;
    & + div .ant-form-item-explain {
      padding-right: 0;
      padding-left: 0;
    }
  }
`;

export const SRetypePassword = styled(Form.Item)`
  margin-bottom: 5px;
`;

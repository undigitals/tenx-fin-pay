import styled from 'styled-components/macro';
import { Typography } from 'antd';
import { CustomTitle } from 'components/theme/CustomTitle/CustomTitle';
import { getColor } from 'utils/helpers/styleHelpers';
import { SmsCodeForm } from 'components/general/SmsCodeForm/SmsCodeForm';

const { Paragraph } = Typography;

export const SSmsCodeForm = styled(SmsCodeForm)`
  margin-bottom: 80px;
`;

export const STitle = styled(CustomTitle)`
  margin-bottom: 60px;
`;

export const SCaption = styled(Paragraph)`
  margin-bottom: 50px !important;
  font-size: 16px;
  text-align: center;
`;

export const SSubmit = styled.div`
  margin: 60px 0 80px;
`;

export const SResendWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  text-align: center;
  color: ${getColor('charcoal60')};
  font-size: 16px;
`;

export const SResend = styled.div`
  color: ${getColor('charcoal')};
  font-size: 18px;
  cursor: pointer;
`;

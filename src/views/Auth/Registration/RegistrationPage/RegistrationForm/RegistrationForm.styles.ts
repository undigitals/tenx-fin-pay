import styled from 'styled-components/macro';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { Link } from 'react-router-dom';
import { getColor, MEDIA_SIZE } from 'utils/helpers/styleHelpers';
import { SInputGroup } from 'views/Auth/Login/LoginForm/LoginForm.styles';

export const SButtonWrapper = styled.div`
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    margin-top: 30px;
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;

export const SFields = styled.div`
  position: relative;
  margin-bottom: 46px;

  .ant-form-item-explain {
    padding: 0;
  }

  .remember-me {
    margin-bottom: 15px;
  }
`;

export const SSubmitError = styled(CustomText)`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -40px;
  width: 100%;
`;

export const SAction = styled.div`
  display: flex;
  justify-content: center;
`;

export const STermsLink = styled(Link)`
  font-size: 14px;
  color: ${getColor('blue')};
  margin: 15px 0 20px;
`;

export const SLoginLink = styled(Link)`
  color: ${getColor('blue')};
`;

export const SSheetFooter = styled.div`
  width: 100%;
  padding: 10px 10px 20px;
  & .ant-checkbox {
    border: 2px solid ${getColor('charcoal30')};
    border-radius: 6px;
    &-inner {
      border: 0;
    }
  }
  .ant-checkbox:hover,
  .ant-checkbox-wrapper:hover,
  .ant-checkbox:hover,
  .ant-checkbox-input:focus {
    .ant-checkbox-inner {
      border: 0;
    }
`;

export const SDisclosureToggler = styled.span`
  text-decoration: underline;
`;

export const SInputGroupRegForm = styled(SInputGroup)`
  margin: 0;
  gap: 32px;

  &-label {
    padding: 0 0 11px 15px;
  }
`;

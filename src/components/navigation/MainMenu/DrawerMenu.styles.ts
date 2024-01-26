import { Collapse } from 'antd';
import styled from 'styled-components/macro';
import { getColor } from 'utils/helpers/styleHelpers';
import { SCustomRadioButtonsGroup } from 'components/theme/CustomRadioButtonsGroup/CustomRadioButtonsGroup.styles';

export const SMenuCollapsible = styled(Collapse)`
  padding: 0;

  .ant-collapse-header {
    padding: 0 !important;

    &-text {
      flex: 1 1 auto;
    }
  }

  .ant-collapse-content-box {
    padding: 0;
  }
`;

export const SMenuGroupContainer = styled.div`
  margin-left: 20px;
`;

export const SMenuContainer = styled.div`
  padding: 30px 34px 1px 32px;
  border-radius: 16px;
  background: ${getColor('white')};
  .menu-item {
    margin-bottom: 25px;
  }

  & .icon-profile {
    width: 20px;
    height: 20px;
  }
`;

export const SContainer = styled.div`
  height: 100%;
  background: ${getColor('creamSS2')};
`;

export const SLanguageSwitcher = styled.div`
  display: flex;
  flex-direction: column;
  margin: 56px 0 24px;
`;

export const SLanguageRadio = styled(SCustomRadioButtonsGroup)`
  width: 70%;
  align-self: flex-end;
`;

export const SShadow = styled.div`
  background: linear-gradient(180deg, ${getColor('creamSS2')} 0%, ${getColor('cream')} 100%);
  position: absolute;
  height: 73px;
  width: 100%;
  bottom: 65px;
  z-index: 999;
`;

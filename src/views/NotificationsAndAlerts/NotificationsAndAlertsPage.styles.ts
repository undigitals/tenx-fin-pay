import styled, { css } from 'styled-components';
import { Icon } from 'components/general/Icon/Icon';
import { BaseSelect } from 'components/general/BaseSelect/BaseSelect';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { Switch } from 'antd';
import { Checkbox } from 'components/general/Checkbox/Checkbox';
import { getColor, mediaUpTo } from 'utils/helpers/styleHelpers';

export const SIcon = styled(Icon).attrs((props) => ({
  name: props.name,
  size: props.size,
  color: props.color,
  cursorPointer: true,
  marginRight: props.marginRight,
  marginLeft: props.marginLeft,
}))`
  display: flex;
`;

export const SInput = styled.input`
  border: none;
  padding: 1px;
  font-size: 12px;
  font-weight: 400;
  text-align: right;
  width: 80px;
  outline: #eaeaea;
  color: #353131;
  background: transparent;

  &:disabled {
    color: #9a9898;
  }

  &::placeholder {
    text-align: right;
    font-size: 12px;
    font-weight: 400;
    color: #353131;
  }
`;

export const SCard = styled(CustomCard)`
  z-index: 0;
`;

export const SAlertSourceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  width: 33.3%;
  ${mediaUpTo(
    'mobile',
    css`
      .icon-envelope,
      .icon-mobile,
      .icon-comment {
        width: 35px;
        height: 35px;
      }
    `
  )}
`;

export const SSwitch = styled(Switch)`
  height: 24px;
  width: 48px;

  .ant-switch-handle {
    width: 20px;
    height: 20px;
  }

  &.ant-switch-checked {
    background-color: ${getColor('blue')};

    .ant-switch-handle {
      left: calc(100% - 22px);
    }
  }
`;

export const SCheckbox = styled(Checkbox)`
  margin-left: 8px;
`;

export const SSelect = styled(BaseSelect)``;

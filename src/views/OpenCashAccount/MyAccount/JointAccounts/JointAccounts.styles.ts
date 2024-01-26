import { Icon } from 'components/general/Icon/Icon';
import styled from 'styled-components';
import { SCard } from 'components/theme/CustomCard/CustomCard.styles';
import { getColor } from 'utils/helpers/styleHelpers';

export const SIcon = styled(Icon)`
  background: ${getColor('blue')};
  padding: 10px;
  border-radius: 50%;
  float: right;
`;

export const SIconWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 24px;
`;

export const SArrowRight = styled(Icon).attrs({
  name: 'chevronRight',
  size: 'smallest',
})`
  margin-left: 12px;
`;

export const SButtonContentWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SJointAccounts = styled.div`
  & ${SCard} {
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 0;

    & .ant-form-item-control {
      padding-left: 20px;
    }

    & + .svg-icon {
      position: absolute;
      right: 0;
      padding: 8px;
      background: ${getColor('blue')};
      border-radius: 50%;
    }
  }
`;

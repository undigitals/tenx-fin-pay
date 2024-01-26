import styled from 'styled-components/macro';
import { Icon } from 'components/general/Icon/Icon';

export const Scontainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 14px;
`;

export const SIconValidationDefault = styled(Icon).attrs({
  name: 'validationDefault',
  color: 'charcoal60',
  size: 'smaller',
})`
  margin-right: 10px;
`;

export const SIconValidationError = styled(Icon).attrs({
  name: 'circleClose',
  color: 'red',
  size: 'smaller',
})`
  margin-right: 10px;
`;

export const SIconValidationSuccess = styled(Icon).attrs({
  name: 'tickInCircle',
  color: 'green',
  size: 'smaller',
})`
  margin-right: 10px;
`;

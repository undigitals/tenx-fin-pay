import { Icon } from 'components/general/Icon/Icon';
import styled from 'styled-components/macro';

export const SIcon = styled(Icon).attrs({
  name: 'edit',
  size: 'smaller',
})`
  flex: 0 0 auto;
`;

export const SData = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 0;
  width: 100%;
  position: relative;

  & .data-text-inner {
    display: flex;
    flex-direction: row;
  }

  & .custom-text-inner {
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 12px;
    line-height: 1.3;
  }

  & .icon-circleInfo {
    margin-top: 2px;
  }
`;

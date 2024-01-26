import styled from 'styled-components';
import { BodyText } from 'components/general/Typography';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { getColor } from 'utils/helpers/styleHelpers';

export const SAddNeedsGoalsPage = styled(CustomRow)`
  padding: 0 15px;
  button.primary {
    padding: 12px 15px;
    white-space: unset;
  }
`;

export const SList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 32px;
`;

export const SListItem = styled.li`
  position: relative;
  padding-left: 28px;
  margin-top: 8px;

  &::before {
    content: '•';
    color: ${getColor('blue')};
    font-weight: 700;
    font-size: 14px;
    display: block;
    position: absolute;
    left: 10px;
  }
`;

export const SBodyText = styled(BodyText)`
  width: 60%;
  margin: 60px;
`;

export const SPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 72px;

  & a.to-home {
    color: ${getColor('blue')};
    font-weight: 500;
  }
`;

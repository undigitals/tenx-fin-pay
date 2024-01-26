import styled from 'styled-components/macro';
import { Chip } from 'components/general/Chip/Chip';
import { getColor } from 'utils/helpers/styleHelpers';

export const SLayout = styled.div`
  display: flex;
  justify-content: right;
`;

export const SLangSwitcherWrapper = styled.div`
  height: 132px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${getColor('white')};
  padding: 24px;
  border-radius: 16px;
  margin-top: 22px;
  margin-bottom: 20px;
  & + div {
    background: ${getColor('white')};
    padding: 24px;
    border-radius: 16px;
  }
`;

export const SChip = styled(Chip)`
  width: 170px;
  padding-left: 2px;
  padding-right: 2px;

  @media only screen and (max-width: 428px) {
    width: 96px;
    & span {
      font-size: 12px;
    }
  }
`;

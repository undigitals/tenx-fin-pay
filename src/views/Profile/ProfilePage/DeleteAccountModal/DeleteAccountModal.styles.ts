import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';
import { SList, SListItem } from 'components/general/Modals/AddStuffSaveAccountModal/AddStuffSaveAccountModal.styles';

export const SDeleteAccountModal = styled.div`
  & .centerImage {
    margin-bottom: 35px;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    margin-top: 35px;
    margin-bottom: 15px;
    margin-right: 7px;
  }

  & ${SList} {
    margin-top: 15px;
    padding-left: 16px;
    margin-left: 0;
  }

  & ${SListItem} {
    display: flex;
    padding-left: 0px;
    font-size: 13px;
    margin-bottom: 4px;
    padding-right: 10px;
    &::before {
      content: '\u2022';
      color: red;
      font-weight: bold;
      display: inline-block;
      margin-right: 12px;
    }
  }
`;

export const SLink = styled.a`
  color: ${getColor('charcoal')};
  font-weight: 600;
  &:hover {
    color: ${getColor('blue')};
  }
`;

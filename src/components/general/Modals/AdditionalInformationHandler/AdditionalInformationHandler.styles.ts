import styled, { css } from 'styled-components';
import { getColor, mediaUpTo, mediaUpToHeight } from 'utils/helpers/styleHelpers';
import { TITLE_SIZE } from 'components/general/Typography/Title/Title.styles';

export const SMediaLayout = styled.div`
  button {
    align-self: center;
  }

  ${mediaUpTo(
    'mobile',
    css`
      .custom-title-text {
        font-size: ${TITLE_SIZE.N};
      }
    `
  )}
`;

const SListItemCommon = css`
  display: flex;
  font-family: DM Sans;
  font-weight: 400;
  padding-right: 40px;
  font-size: 14px;
  color: ${getColor('charcoal70')};

  &:first-child {
    margin-bottom: 15px;
  }

  ${mediaUpTo(
    380,
    css`
      ${mediaUpToHeight(
        680,
        css`
          & {
            font-size: 12px;
          }
        `
      )}
    `
  )}
`;

const SListItemBefore = css`
  content: '\u2022';
  font-weight: bold;
  display: inline-block;
  margin-right: 12px;
`;

export const SListItem = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 5px;
  margin-left: 0;
`;

export const SListItemText = styled.li`
  ${SListItemCommon};

  &::before {
    ${SListItemBefore};
    color: ${getColor('blue')};
  }
`;
export const SListInnerItemText = styled.li`
  display: inline-flex;
  color: ${getColor('charcoal70')};
  &::marker {
    content: '';
  }

  &::before {
    ${SListItemBefore};
    color: ${getColor('charcoal')};
  }
`;

export const SBlueText = styled.span`
  display: contents;
  color: ${getColor('blue')};
`;

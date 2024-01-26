import styled, { css } from 'styled-components/macro';
import { Title } from 'components/general/Typography';
import { mediaFrom } from 'utils/helpers/styleHelpers';

export const SPage = styled.div``;

export const SCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const SCardTitle = styled(Title)`
  align-self: flex-start;
`;

export const Box = styled.div<{
  margin?: string;
  padding?: string;
  justify?: string;
  align?: string;
  changeDirection?: boolean;
  width?: string;
  cursorPointer?: boolean;
}>`
  display: flex;
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  justify-content: ${({ justify }) => justify || 'normal'};
  align-items: ${({ align }) => align || 'normal'};
  flex-direction: ${({ changeDirection }) => (!changeDirection ? 'row' : 'column')};
  width: ${({ width }) => width || 'auto'};
  cursor: ${({ cursorPointer }) => (cursorPointer ? 'pointer' : 'default')};
`;

export const SDisclosureContainer = styled.div`
  display: flex;

  ${mediaFrom(
    'minDesktop',
    css`
      justify-content: flex-start;
      text-align: left;
      width: 65%;
      margin-bottom: 35px;
    `
  )}
`;

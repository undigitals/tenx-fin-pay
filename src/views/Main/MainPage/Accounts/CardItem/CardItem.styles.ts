import { getColor, mediaFrom } from 'utils/helpers/styleHelpers';
import styled, { css } from 'styled-components';

export const SDashedBox = styled.div`
  border-radius: 20px;
  border: 2px dashed ${getColor('creamS10')};
  margin: 16px 0;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  ${mediaFrom(
    'minDesktop',
    css`
      max-width: 265px;
      margin-right: 16px;
      flex-direction: column;
    `
  )};

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    display: flex;
    justify-content: flex-start;
    gap: 16px;
  }

  .add {
    display: flex;
    justify-content: flex-end;
    margin-left: 5px;
  }

  .description {
    margin-left: 40px;
    margin-top: 18px;
  }

  .icon-add {
    flex: 0 0 auto;
  }
`;

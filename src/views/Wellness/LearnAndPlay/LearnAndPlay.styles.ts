import styled, { css } from 'styled-components';
import { mediaFrom, mediaUpTo } from 'utils/helpers/styleHelpers';
import { WonderingAbout } from './WonderingAbout/WonderingAbout';

export const SLearnAndPlay = styled.div`
  padding-top: 90px;
`;

export const SWonderingAbout = styled(WonderingAbout)`
  padding-bottom: 42px;
`;

export const SDisclosureContainer = styled.div`
  display: flex;
  margin-top: 40px;
  width: 100%;

  ${mediaUpTo(
    'minDesktop',
    css`
      .disclosure-web {
        display: none;
      }
    `
  )}

  ${mediaFrom(
    'minDesktop',
    css`
      justify-content: flex-start;
      padding-bottom: 50px;

      .disclosure-mobile {
        display: none;
      }
    `
  )}
`;

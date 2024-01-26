import { Icon } from 'components/general/Icon/Icon';
import styled, { css } from 'styled-components';
import { getColor, mediaUpTo, mediaFrom } from 'utils/helpers/styleHelpers';

export const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;

  .wellnessFAQHeader {
    margin-bottom: 32px;
  }
`;

export const SCircle = styled.div`
  width: 40px;
  height: 40px;
  background: ${getColor('blue5')};
  border-radius: 20px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SHelpLayout = styled.div`
  padding: 0 5px;
  margin-bottom: 30px;

  .helpSupportHeader {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 32px;
    gap: 20px;
  }

  .helpSupportSearchBar {
    display: flex;
    cursor: pointer;
  }
`;

export const SLink = styled.a`
  color: ${getColor('blue')};
  text-decoration: underline;

  :hover {
    color: ${getColor('blue')};
    text-decoration: underline;
  }
`;

export const SSearchIcon = styled(Icon)`
  flex: 0 0 auto;
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

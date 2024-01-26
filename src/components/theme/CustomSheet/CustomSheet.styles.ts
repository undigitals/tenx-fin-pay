import styled, { css, keyframes } from 'styled-components';
import { transparentize } from 'polished';
import { ifProp, getProp, getColor } from 'utils/helpers/styleHelpers';
import { Icon } from 'components/general/Icon/Icon';
import { ISCustomSheet, THeaderProps, ISDialogBodyProps, ISDialogHeaderProps } from './CustomSheet.types';

export const SCloseIcon = styled(Icon)`
  position: absolute;
  right: 14px;
  top: 14px;
  padding: 0;
  margin: 0;
  z-index: 20;
`;

export const SWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
`;

export const SDialogHeader = styled.div<ISDialogHeaderProps>`
  position: sticky;
  top: 0;
  justify-content: flex-start;
  padding: 20px;
  background: ${getColor('charcoal5')};
  border-radius: 20px;
  flex: 0 0 auto;
  ${({ $headerStyle }: THeaderProps) => css({ ...$headerStyle })};
`;

export const SDialogBody = styled.div<ISDialogBodyProps>`
  padding: ${getProp('padding', '24px')};
  padding-bottom: ${getProp('paddingBottom', '24px')};
  padding-top: ${getProp('paddingTop', '24px')};
  flex: 1 1 auto;
  overflow: auto;

  h1 {
    font-size: 16px !important;
    font-weight: 600 !important;
    line-height: 20px !important;
    margin-bottom: 20px !important;
  }

  p {
    font-size: 14px !important;
    line-height: 20px !important;
    font-family: 'DM Sans', sans-serif !important;
  }
`;

export const dialogFadeOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

export const dialogFadeIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const SDialog = styled.dialog<ISCustomSheet>`
  position: fixed;
  display: flex;
  align-items: stretch;
  border: 0;
  padding: 0;
  bottom: 0;
  top: unset;
  max-width: 100%;
  height: ${getProp('height', 'fit-content')};
  width: ${getProp('width', '100%')};
  -webkit-backface-visibility: hidden;
  max-height: ${getProp('maxHeight', '90%')};
  box-sizing: border-box;
  border-radius: ${getProp('borderRadius', '20px 20px 0 0')};
  overflow: hidden;

  footer {
    padding: 20px;
  }

  :modal {
    margin-bottom: ${getProp('modalBottom', '0')};
  }

  ::backdrop {
    background-color: ${(props) => transparentize(0.1, getColor('blockingOverlay')(props))};
  }

  ::-webkit-scrollbar {
    display: none !important;
  }

  :focus-visible {
    outline: -webkit-focus-ring-color auto 0px;
  }

  ${ifProp(
    'isDialogOpen',
    css`
      animation: ${dialogFadeIn} 0.3s ease-in-out;
      opacity: 1;
      pointer-events: auto;
    `,
    css`
      animation: ${dialogFadeOut} 0.3s ease-in-out;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s;
    `
  )};

  ${ifProp(
    'wrapperPadding',
    css``,
    css`
      margin-left: 0;
      margin-right: 0;
      max-width: 100%;
    `
  )}
`;

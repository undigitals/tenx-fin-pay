import styled from 'styled-components';
import { getColor, MEDIA_SIZE } from 'utils/helpers/styleHelpers';
import { transparentize } from 'polished';

export const SCustomButton = styled.button`
  appearance: none;
  border-width: 2px;
  border-style: solid;
  border-radius: 100px;
  font-family: 'Poppins';
  font-weight: 500;
  /*
   * **DO NOT** set line-height to anything lower than 1.5 (here or anywhere else throughout the codebase)
   * since it is a gross failure to meet WCAG AA guidelines which websites
   * that are subject to US ADA are legally obliged to comply with.
   * In cases where the design requires line-heights lower than 1.5 it should be discussed with the UI/UX team and
   * product owners and not just blindly copied over from Figma.
   * See here: https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html
   */
  line-height: 1.5;
  cursor: pointer;
  /*
   * TODO: This is an accessibility failure. Focusable elements should have a distinguishable appearance in a focused state.
   * The UI/UX team should provide designs for buttons (and other focusable elements) in a focused state
   * (as well as in other possible states) which should be **DISTINGUISHABLE** from the hover state since many people actually
   * use assistive technologies, keyboard and mouse together, and having the same visual appearance for hovered and focused elements
   * would be greatly consufing for them.
   */
  outline: none;
  white-space: nowrap;
  transition-property: color, background-color, border-color;
  transition-duration: 100ms;
  transition-timing-function: linear;

  &:disabled {
    cursor: not-allowed;
  }

  &.primary.solid {
    border-color: ${getColor('blue')};
    background-color: ${getColor('blue')};
    color: ${getColor('white')};
  }

  &.primary.solid:hover {
    background-color: ${(props) => transparentize(0.1, getColor('blue')(props))};
  }

  &.primary.solid:disabled {
    border-color: ${getColor('charcoal40')};
    background-color: ${getColor('charcoal40')};
  }

  &.primary.outlined {
    border-color: ${getColor('blue')};
    background-color: ${getColor('white')};
    color: ${getColor('blue')};
  }

  &.primary.outlined:disabled {
    border-color: ${getColor('charcoal40')};
    background-color: ${getColor('charcoal40')};
  }

  &.alert {
    border-color: ${getColor('red')};
  }

  &.alert.solid {
    background-color: ${getColor('red')};
    color: ${getColor('white')};
  }

  &.alert.solid:hover {
    background-color: ${(props) => transparentize(0.1, getColor('red')(props))};
  }

  &.alert.solid:disabled {
    border-color: ${getColor('charcoal40')};
    background-color: transparent;
    color: ${getColor('charcoal40')};
  }

  &.alert.outlined {
    background-color: transparent;
    color: ${getColor('red')};
  }

  &.transparent.solid {
    border-color: ${getColor('transparent')};
    background-color: transparent;
    color: ${getColor('charcoal')};
  }

  &.transparent.outlined {
    border-color: ${getColor('blue')};
    background-color: transparent;
    color: ${getColor('blue')};
  }

  &.transparent.outlined:disabled {
    border-color: ${getColor('charcoal40')};
    background-color: transparent;
    color: ${getColor('charcoal40')};
  }

  &.small {
    min-width: 104px;
    padding: 8px 14px;
    font-size: 12px;
  }

  &.middle {
    min-width: 113px;
    padding: 8px 24px;
    font-size: 14px;
  }

  &.middleStretch {
    width: 100%;
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 400;
  }

  &.middleAlt {
    min-width: 120px;
    padding: 10px 24px;
    font-size: 14px;
  }

  &.xl {
    width: 100%;
    padding: 14px 24px;
    font-size: 16px;
  }

  &.standard {
    width: 100%;
    padding: 12px 32px;
    font-size: 18px;
  }

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: ${MEDIA_SIZE.mobile}px) {
    &.standard {
      padding: 8px 10px;
      font-size: 16px;
    }
  }
`;

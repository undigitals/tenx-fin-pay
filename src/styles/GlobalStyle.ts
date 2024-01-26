import { transparentize } from 'polished';
import { createGlobalStyle, css } from 'styled-components';
import { getColor, mediaUpToHeight, mediaUpTo } from 'utils/helpers/styleHelpers';

const removeAutoCompleteBackgroundEffectStyle = css`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px ${getColor('transparent')} inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
  }

  #root {
    height: 100%;
  }
  
  .layout-space-between {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
    padding-bottom: 30px;
  }

  button.new {
    appearance: none;
    border-width: 2px;
    border-style: solid;
    border-radius: 100px;
    font-family: 'Poppins', sans-serif;
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
    transition-property: color, background-color, border-color;
    transition-duration: 100ms;
    transition-timing-function: linear;

    &:disabled {
      cursor: not-allowed;
    }

    &.primary {
      border-color: ${getColor('blue')};
      background-color: ${getColor('blue')};
      color: ${getColor('white')};
    }

    &.primary:hover {
      background-color: ${(props) => transparentize(0.1, getColor('blue')(props))};
    }

    &.primary:disabled {
      border-color: ${getColor('charcoal40')};
      background-color: ${getColor('charcoal40')};
    }

    &.secondary.outlined {
      border-color: ${getColor('blue')};
      background-color: transparent;
      color: ${getColor('blue')};
    }

    &.secondary.outlined:disabled {
      border-color: ${getColor('charcoal40')};
      background-color: transparent;
      color: ${getColor('charcoal40')};
    }

    &.secondary.solid {
      border-color: ${getColor('blue')};
      background-color: ${getColor('white')};
      color: ${getColor('blue')};
    }

    &.small {
      min-width: 104px;
      padding: 8px 14px;
      font-size: 12px;
    }
  }

  .ant-modal-wrap {
    overflow: hidden;
  }

  .ant-typography {
    a {
      color: ${getColor('blue')};

      &:hover {
        color: ${getColor('blue')};
      }
    }
  }

  .consent-checkbox {
    display: flex;
    margin-bottom: 15px;
    &-disclosure-text {
      display: flex;
      margin-top: 5px;

      .custom-text-inner {
        ${mediaUpTo(
          415,
          css`
            font-size: 13px;
          `
        )}
        ${mediaUpTo(
          'mobile',
          css`
            font-size: 12px;
          `
        )}
      }
    }
  }

  ${removeAutoCompleteBackgroundEffectStyle};

  .tenx-pay-request {
    .flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-indent {
        margin-bottom: 25px;
      }
      &-start {
        justify-content: flex-start;
      }
    }

    .amount-transfer {
      margin-top: 24px; 
      margin-bottom: 22px;
    }

    .access-fee {
      margin-bottom: 22px;
    }

    .tenx-pay-format {
      margin-bottom: 22px;
    }
  }

  .payment-prepare-sheet {
    & .flex {
      display: flex;
      justify-content: space-between;
      &-column {
        flex-direction: column;
      }
      &-start {
        justify-content: flex-start;
      }
      &-end {
        justify-content: flex-end;
      }
    }
    &-account-part {
      margin-bottom: 34px;
    }
    &-button-part {
      margin-top: 20px;
    }
  }

  .transferToSheet {
    &Header {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 24px;
    }

    &MultipleRow {
      display: flex;
      flex-direction: column;
      align-items: flex-start; 
      justify-content: flex-start; 
      margin-bottom: 12px; 
      gap: 10px;
    }
  }

  .ant-form-item-explain {
    padding: 10px 0;
  }

  .baseSelectClass .ant-form-item-explain {
    margin-bottom: 10px;
  }

  #svg-icon-sprite {
    display: none;
  }

  .center-image img {
    display: block;
    margin-inline: auto;
  }

  .ant-picker-dropdown-range {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 0 !important;
    left: 0 !important;
    width: 100%;
    margin-top: 90%;
    ${mediaUpToHeight(
      735,
      css`
        margin-top: 50%;
      `
    )}
    ${mediaUpToHeight(
      500,
      css`
        margin-top: 20%;
        transform: scale(0.85);
        transform-origin: top;
      `
    )}
  }

  .ant-picker-cell-disabled:before {
    background: ${getColor('transparent')};
  }

  .ant-checkbox-checked .ant-checkbox-inner:after {
    background: ${getColor('transparent')} !important;
  }

  .slick-dots {
    margin-right: 0 !important;
    margin-left: 0 !important;
    & li button:before {
      display: none;
    }
  }

  .tenxPlaysInfo {

    &Header {
      display: flex;
      flex-direction: column;
      align-items: start;
      margin-bottom: 10px;
    }

    &Body {
      display: flex;
      flex-direction: column;
      align-items: start;
      margin-top: 13px;
    }

    &ListItem {
      margin-bottom: 0;

      &Text {
        margin-bottom: 0; 
        padding-right: 15px;
      }
    }

    &Line {
      width: 100%;
      height: 1px;
      margin-top: 15px;
      margin-bottom: 15px;
    }

    ${mediaUpTo(
      360,
      css`
        ${mediaUpToHeight(
          800,
          css`
            top: 0 !important;
          `
        )}
      `
    )}


    ${mediaUpToHeight(
      670,
      css`
        top: 0 !important;
      `
    )}
  }

  .password {

    ${mediaUpToHeight(
      750,
      css`
        .ant-drawer-content-wrapper {
          height: 100% !important;
        }
        & .ant-drawer-body {
          padding-top: 20px !important;
        }
        & .custom-title-text {
          font-size: 20px;
        }
        & .custom-text-inner {
          font-size: 12px;
        }
        & .ant-form .ant-form-item {
          margin-bottom: 20px;
        }
        & .ant-form label {
          font-size: 12px;
        }
      `
    )}

    ${mediaUpToHeight(
      680,
      css`
        & .ant-form .ant-form-item {
          margin-bottom: 12px;
        }
      `
    )}
  }

`;

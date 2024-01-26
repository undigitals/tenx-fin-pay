import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import styled from 'styled-components';
import { MEDIA_SIZE, getColor } from 'utils/helpers/styleHelpers';
import { chevronDown, cash, goal, stash, comment, circleQuestion, dollarSign } from 'assets/icons';

export const SInternalTransferPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  font-family: 'Poppins';
  line-height: 1.5;

  .warning-container {
    display: flex;
    align-items: center;
    padding-top: 4px;

    & small {
      margin-top: 0;
    }
  }

  .select-account {
    display: none;
    width: 100%;
    max-width: 516px;

    &__control {
      position: relative;
      cursor: pointer;
      padding: 12px;
      border: 2px solid transparent;
      border-radius: 16px;

      // TODO a11y: hovered and focused states should be visually distinguishable,
      // and chevron color change is not really sufficient for that
      &--is-focused,
      &:hover {
        box-shadow: none;
        border-color: ${getColor('blue')};
      }

      &--is-focused .select-account__indicator {
        background-color: ${getColor('blue')};
      }
    }

    &__placeholder {
      flex-grow: 1;
      display: flex;
      align-items: center;
      margin: 0;
      color: ${getColor('charcoal70')};
    }

    &__indicator-separator {
      display: none;
    }

    &__value-container {
      display: flex;
      align-items: center;
      margin-right: 12px;
      padding: 0;
      font-family: 'DM Sans';
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      color: ${getColor('charcoal')};
    }

    &__value-container .account-value {
      display: flex;
      align-items: center;
      flex-grow: 1;
    }

    &__value-container .account-value > div {
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
    }

    &__value-container .account-value::before,
    &__placeholder::before {
      content: '';
      display: block;
      width: 48px;
      aspect-ratio: 1;
      margin-right: 12px;
      border-radius: 50%;
      background-color: ${getColor('charcoal5')};
    }

    &__value-container .account-value::after,
    &__placeholder::after {
      content: '';
      position: absolute;
      top: 12px;
      left: 12px;
      width: 24px;
      aspect-ratio: 1;
      mask: url(${circleQuestion}) no-repeat center/contain;
      background-color: ${getColor('charcoal70')};
    }

    &__value-container .account-value[data-type]::before {
      background-color: ${getColor('green10')};
    }

    &__value-container .account-value[data-type]::after {
      mask-image: url(${cash});
      background-color: ${getColor('green')};
    }

    &__value-container .account-value[data-type='Save']::after {
      mask-image: url(${goal});
    }

    &__value-container .account-value[data-type='Stuff']::after {
      mask-image: url(${stash});
    }

    &__value-container .account-value .amount {
      font-weight: 500;
    }

    &__indicator {
      width: 24px;
      aspect-ratio: 1;
      padding: 0;
      mask: url(${chevronDown}) no-repeat center;
      background-color: ${getColor('charcoal')};
    }

    &__indicator > svg {
      display: none;
    }

    &__menu {
      z-index: 2;
      margin-block: 4px 0;
      border-radius: 20px;
      border: 1px solid ${getColor('charcoal5')};
      box-shadow: 0px 16px 24px 0px rgba(0, 0, 0, 0.04);
    }

    &__menu-list {
      border-radius: inherit;
      padding: 0;
    }

    &__menu-list .account-option {
      position: relative;
      display: flex;
      align-items: center;
      padding: 20px;
      background-color: ${getColor('white')};
      font-family: 'DM Sans';
      font-size: 14px;
      cursor: pointer;
    }

    &__menu-list .account-option:hover {
      background-color: ${getColor('charcoal5')};
    }

    &__menu-list .account-option:not(:last-child) {
      border-bottom: 2px solid ${getColor('charcoal5')};
    }

    &__menu-list .account-option[data-type]::before {
      content: '';
      width: 24px;
      aspect-ratio: 1;
      margin-right: 12px;
      mask: url(${cash}) no-repeat center/contain;
      background-color: ${getColor('orange')};
    }

    &__menu-list .account-option[data-type='Save']::before {
      mask-image: url(${goal});
    }

    &__menu-list .account-option[data-type='Stuff']::before {
      mask-image: url(${stash});
    }

    &__menu-list .account-option .name {
      font-weight: 700;
      color: ${getColor('charcoal')};
    }

    &__menu-list .account-option .id {
      color: ${getColor('charcoal70')};
    }

    &__menu-list .account-option .badge {
      position: absolute;
      top: 0;
      right: 0;
      padding: 8px 16px;
      border-bottom-left-radius: 20px;
      background-color: ${getColor('blue10')};
      font-size: 12px;
      font-weight: 700;
      color: ${getColor('blue')};
    }
  }

  button.account {
    appearance: none;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
    border: 2px solid transparent;
    border-radius: 16px;
    background-color: ${getColor('white')};
    font-family: 'DM Sans';
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: ${getColor('charcoal')};
    text-align: left;
    cursor: pointer;
    transition: border-color 100ms;

    // TODO a11y: hovered and focused states should be visually distinguishable,
    // and chevron color change is not really sufficient for that
    &:is(:focus, :hover) {
      border-color: ${getColor('blue')};
    }

    &:focus::after {
      background-color: ${getColor('blue')};
    }

    &::before,
    &::after {
      content: '';
      width: 24px;
      aspect-ratio: 1;
    }

    &::before {
      display: none;
    }

    &[data-selected]::before {
      display: inline-block;
      margin-right: 10px;
      mask: url(${cash}) no-repeat center/contain;
      background-color: ${getColor('orange')};
    }

    &[data-selected]:disabled::before {
      background-color: ${getColor('charcoal30')};
    }

    &[data-selected][data-type='Save']::before {
      mask-image: url(${goal});
    }

    &[data-selected][data-type='Stuff']::before {
      mask-image: url(${stash});
    }

    &::after {
      display: inline-block;
      margin-left: 10px;
      mask: url(${chevronDown}) no-repeat center;
      background-color: currentColor;
    }

    &:disabled::after {
      display: none;
    }

    &:disabled {
      color: #c2c1c1;
      cursor: not-allowed;
      border-color: transparent;
    }

    & > div {
      flex-grow: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
    }

    .action {
      color: ${getColor('charcoal40')};
    }

    &[data-selected] .action {
      display: none;
    }
  }

  .ant-form-item-explain-error {
    font-family: DM Sans;
    font-size: 12px;
    line-height: 1.5;
    font-weight: 400;
  }

  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: ${getColor('charcoal')};
  }

  form {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }

  form > header {
    display: none;
    margin-bottom: 44px;
    font-size: 24px;
    font-weight: 600;
  }

  form > div {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    row-gap: 32px;
  }

  label > span,
  .account-label {
    font-size: 16px;
    font-weight: 600;
    color: ${getColor('charcoal')};
  }

  .account-label {
    margin-bottom: 8px;
  }

  button.note {
    appearance: none;
    cursor: pointer;
    float: right;
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    font-size: 14px;
    font-weight: 500;
    color: ${getColor('blue')};
  }

  button.note > span {
    margin-right: 8px;
  }

  button.note::after {
    content: '';
    vertical-align: -8px;
    display: inline-block;
    width: 24px;
    aspect-ratio: 1;
    mask: url(${comment}) no-repeat;
    background-color: currentColor;
  }

  .amount-form-item {
    width: 100%;
    margin-top: 18px;
  }

  small {
    display: block;
    margin-top: 12px;
    font-family: 'DM Sans';
    font-size: 12px;
    font-weight: 400;
    color: ${getColor('charcoal70')};
  }

  form footer {
    margin-block: 48px 24px;
  }

  form footer button {
    width: 100%;
    padding: 14px 32px;
    font-size: 18px;
  }

  form footer .buttons {
    margin-bottom: 24px;
  }

  form footer .buttons + * {
    justify-content: center;
  }

  @media screen and (min-width: ${MEDIA_SIZE.tablet + 1}px) {
    form {
      align-self: center;
      max-width: 696px;
      margin-top: 48px;
    }

    form > header {
      display: block;
      margin-left: 90px;
    }

    form > div {
      row-gap: 40px;
    }

    form > div > :is(.sender, .recipient),
    label {
      display: flex;
    }

    .ant-form-item {
      margin-top: 0;
    }

    .select-account {
      display: block;
    }

    button.account {
      display: none;
    }

    label > span,
    .account-label {
      width: 66px;
      margin-right: 24px;
      margin-bottom: 0;
      text-align: right;
      font-family: 'DM Sans';
      font-size: 14px;
      font-weight: 700;
    }

    label > span + div {
      max-width: 516px;
    }

    form small {
      margin-top: 0;
      margin-left: 90px;
    }

    input[inputmode='decimal'] {
      padding: 16px 56px 16px 72px;
    }

    .amount {
      position: relative;
    }

    .amount-input {
      position: relative;
    }

    .amount-input::before {
      content: '';
      position: absolute;
      top: 12px;
      left: 12px;
      display: block;
      width: 48px;
      aspect-ratio: 1;
      border-radius: 50%;
      background-color: ${getColor('blue')};
    }

    .amount-input::after {
      content: '';
      position: absolute;
      top: 24px;
      left: 24px;
      display: block;
      width: 24px;
      aspect-ratio: 1;
      mask: url(${dollarSign}) no-repeat center/contain;
      background-color: ${getColor('white')};
    }

    .amount-input.touched::before {
      background-color: ${getColor('green')};
    }

    .amount-input.touched::after {
      background-color: ${getColor('white')};
    }

    .amount-input.error.touched::before {
      background-color: ${getColor('red5')};
    }

    .amount-input.error.touched::after {
      background-color: ${getColor('red')};
    }

    button.note {
      position: absolute;
      top: 24px;
      left: 562px;
      z-index: 1;
    }

    button.note > span {
      display: none;
    }

    form footer {
      margin-block: 120px;
    }

    form footer .buttons {
      margin-bottom: 32px;
      padding: 24px 32px;
      border-radius: 20px;
      background-color: ${getColor('white')};
      box-shadow: 0px 16px 24px 0px rgba(0, 0, 0, 0.04);
      text-align: right;
    }

    form footer button {
      width: max-content;
      padding: 14px 24px;
    }

    form footer button:first-of-type {
      margin-right: 8px;
    }
  }
`;

export const SAccountIconContainer = styled.div`
  width: 40px;
  height: 40px;
  background: ${getColor('orange5')};
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
  order: 0;
  flex-grow: 0;
  border-radius: 24px;
`;

export const SAccountBadge = styled.div`
  background: ${getColor('blue')};
  color: ${getColor('white')};
  position: absolute;
  top: 0;
  left: -2px;
  border-radius: 16px 0;
  padding: 4px 16px;
  font-size: 13px;
`;

export const SNoteContainer = styled(CustomCard)`
  min-height: 74px;
  border: 2px solid ${getColor('charcoal5')};
  border-radius: 20px;
  padding: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

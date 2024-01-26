import styled from 'styled-components';

export const SCustomAmount = styled.div`
  white-space: nowrap;

  margin: var(--margin);
  color: var(--color);
  cursor: var(--pointer);
  font-family: var(--font);
  text-align: var(--align);
  line-height: var(--line-height);

  &.parts :is(.decimal, .fraction) {
    font-weight: var(--fraction-weight);
  }

  &.largest,
  &.parts.fraction-largest :is(.decimal, .fraction) {
    font-size: 40px;
  }

  &.largest {
    font-weight: 600;
  }

  &.larger,
  &.parts.fraction-larger :is(.decimal, .fraction) {
    font-size: 32px;
  }

  &.larger {
    font-weight: 600;
  }

  &.large,
  &.parts.fraction-large :is(.decimal, .fraction) {
    font-size: 28px;
  }

  &.large {
    font-weight: 600;
  }

  &.thin,
  &.parts.fraction-thin :is(.decimal, .fraction) {
    font-size: 32px;
    font-weight: 500;
  }

  &.xl,
  &.parts.fraction-xl :is(.decimal, .fraction) {
    font-size: 24px;
  }

  &.xl {
    font-weight: 600;
  }

  &.normal,
  &.parts.fraction-normal :is(.decimal, .fraction) {
    font-size: 18px;
  }

  &.normal {
    font-weight: 700;
  }

  &.xs,
  &.parts.fraction-xs :is(.decimal, .fraction) {
    font-size: 16px;
  }

  &.xs {
    font-weight: 700;
  }

  &.small,
  &.parts.fraction-small :is(.decimal, .fraction) {
    font-size: 18px;
  }

  &.small {
    font-weight: 500;
  }

  &.smaller,
  &.parts.fraction-smaller :is(.decimal, .fraction) {
    font-size: 14px;
  }

  &.smaller {
    font-weight: 400;
  }

  &.smallerStrong,
  &.parts.fraction-smallerStrong :is(.decimal, .fraction) {
    font-size: 14px;
  }

  &.smallerStrong {
    font-weight: 700;
  }

  &.smallest,
  &.parts.fraction-smallest :is(.decimal, .fraction) {
    font-size: 12px;
  }

  &.smallest {
    font-weight: 700;
  }
`;

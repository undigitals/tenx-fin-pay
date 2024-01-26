import React, { useMemo } from 'react';
import clsx from 'clsx';
import { CurrencyFormatters } from 'utils/helpers/CurrencyFormatters';
import { useLanguage } from 'utils/hooks/useLanguage';
import { useTheme } from 'styled-components';
import { SCustomAmount } from './CustomAmount.styles';
import { ICustomAmountProps } from './CustomAmount.types';

/*
 * **IMPORTANT**: please **DO NOT** add any more presentational (i.e. styling-related) props to this component.
 * It makes absolutely no sense to pass things like margins, paddings etc. to elements at runtime through JS, and it makes
 * even less sense to decorate every single component with these kinds of props, when all that's needed is to add margin-left: 10px;
 * to the appropriate stylesheet or a parent styled component.
 *
 * If you **ABSOLUTELY HAVE TO** add another styling prop (which you **SHOULD NOT BE DOING**), then **PLEASE** at least pass it to
 * `SCustomAmount` as a CSS variable (use existing code for other props as a guideline), **PLEASE DO NOT** pass it to `SCustomAmount`
 * as a prop.
 */
export const CustomAmount = ({
  className,
  size,
  remainingSize,
  remainingWeight,
  amount,
  lineHeight = 1.5,
  color = 'black',
  sign = false,
  multiSizable = false,
  cursorPointer = false,
  isPoppins = false,
  align = 'center',
}: ICustomAmountProps) => {
  const theme = useTheme();
  const { locale } = useLanguage();
  const centPrecisionFormatter = sign ? CurrencyFormatters.getCentPrecisionSignedFormatter(locale) : CurrencyFormatters.getCentPrecisionFormatter(locale);
  const amountParts = useMemo(() => {
    const parts = centPrecisionFormatter.formatToParts(amount);
    const currencyIdx = parts.findIndex((part) => part.type === 'currency');
    if (currencyIdx >= 0 && currencyIdx < parts.length - 1) {
      parts.splice(currencyIdx + 1, 0, { type: 'literal', value: '' });
    }
    return parts;
  }, [centPrecisionFormatter, amount]);

  if (multiSizable) {
    return (
      <SCustomAmount
        className={clsx(className, 'parts', size, `fraction-${remainingSize}`)}
        style={
          {
            '--fraction-weight': remainingWeight,
            '--color': theme[color],
            '--pointer': cursorPointer ? 'pointer' : 'default',
            '--font': isPoppins ? 'Poppins' : 'DM Sans',
            '--align': align,
            '--line-height': lineHeight,
          } as React.CSSProperties
        }
      >
        {amountParts.map((part, idx) => {
          return (
            // index *should* be used as a key here since there are no sensible stable identifiers for these items
            // eslint-disable-next-line react/no-array-index-key
            <span key={idx} className={part.type}>
              {part.value}
            </span>
          );
        })}
      </SCustomAmount>
    );
  }

  return (
    <SCustomAmount
      className={size}
      style={
        {
          '--color': theme[color],
          '--pointer': cursorPointer ? 'pointer' : 'default',
          '--font': isPoppins ? 'Poppins' : 'DM Sans',
          '--align': align,
          '--line-height': lineHeight,
        } as React.CSSProperties
      }
    >
      {centPrecisionFormatter.format(amount)}
    </SCustomAmount>
  );
};

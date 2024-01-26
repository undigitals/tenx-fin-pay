import { useCallback, useMemo } from 'react';
import { CurrencyFormatters } from 'utils/helpers/CurrencyFormatters';
import { useLanguage } from './useLanguage';

export const useCurrencyFormat = () => {
  const { locale } = useLanguage();
  const centPrecisionFormatter = useMemo(() => CurrencyFormatters.getCentPrecisionFormatter(locale), [locale]);
  const centPrecisionSignedFormatter = useMemo(() => CurrencyFormatters.getCentPrecisionSignedFormatter(locale), [locale]);

  const formatAutoSign = useCallback((val?: number) => (val || val === 0 ? centPrecisionFormatter.format(val) : ''), [centPrecisionFormatter]);

  const formatAlwaysSign = useCallback((val?: number) => (val || val === 0 ? centPrecisionSignedFormatter.format(val) : ''), [centPrecisionSignedFormatter]);

  return {
    formatAutoSign,
    formatAlwaysSign,
  };
};

enum ECurrencyFormatterType {
  CENT_PRECISION_AUTO_SIGN = 'CENT_PRECISION_AUTO_SIGN',
  CENT_PRECISION_ALWAYS_SIGN = 'CENT_PRECISION_ALWAYS_SIGN',
}

type TCurrencyFormatters = Map<ECurrencyFormatterType, Intl.NumberFormat>;

export class CurrencyFormatters {
  private static localeCurrencyFormatters: Map<string, TCurrencyFormatters> = new Map();

  private static getFormattersForLocale(locale: string): TCurrencyFormatters {
    let formatters = CurrencyFormatters.localeCurrencyFormatters.get(locale);
    if (formatters === undefined) {
      formatters = new Map();
      CurrencyFormatters.localeCurrencyFormatters.set(locale, formatters);
    }
    return formatters;
  }

  static getCentPrecisionFormatter(locale: string): Intl.NumberFormat {
    const formatters = CurrencyFormatters.getFormattersForLocale(locale);
    let formatter = formatters.get(ECurrencyFormatterType.CENT_PRECISION_AUTO_SIGN);
    if (formatter === undefined) {
      formatter = new Intl.NumberFormat(locale, {
        currency: 'USD',
        currencyDisplay: 'symbol',
        signDisplay: 'auto',
        style: 'currency',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      formatters.set(ECurrencyFormatterType.CENT_PRECISION_AUTO_SIGN, formatter);
    }
    return formatter;
  }

  static getCentPrecisionSignedFormatter(locale: string): Intl.NumberFormat {
    const formatters = CurrencyFormatters.getFormattersForLocale(locale);
    let formatter = formatters.get(ECurrencyFormatterType.CENT_PRECISION_ALWAYS_SIGN);
    if (formatter === undefined) {
      formatter = new Intl.NumberFormat(locale, {
        currency: 'USD',
        currencyDisplay: 'symbol',
        signDisplay: 'exceptZero',
        style: 'currency',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      formatters.set(ECurrencyFormatterType.CENT_PRECISION_ALWAYS_SIGN, formatter);
    }
    return formatter;
  }
}

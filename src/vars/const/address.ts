export const USPS_FOOTNOTES_ERROR_MAP: Record<string, string> = {
  C: 'invalidCityStateZip',
  F: 'addressNotFound',
  H: 'missingApartment',
  I: 'insufficientInformation',
  J: 'dualAddress',
  S: 'incorrectApartment',
};

export const ADDRESS_FOOTNOTES = {
  INVALID: ['C', 'D', 'F', 'H', 'I', 'J', 'S'],
  WITH_SUGGESTIONS: ['A', 'B', 'G', 'K', 'L', 'Q', 'M', 'N', 'P', 'T', 'U', 'V', 'X'],
  NORMALIZED_PREFFERED: ['E', 'P', 'R', 'W', 'Y', 'Z'],
  NORMALIZED: 'N',
};

export const ADDRESS_CHECK_STATUS = {
  OK: 'OK',
  INVALID: 'INVALID',
  DPVCMRA: 'DPVCMRA',
  WITH_SUGGESTIONS: 'WITH_SUGGESTIONS',
};

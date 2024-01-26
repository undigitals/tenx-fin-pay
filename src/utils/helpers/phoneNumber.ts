export const getUnmaskedMobileNumber = (mobileNumber: string) => `+${mobileNumber.replace(/[()]|\s|-|\*/g, '')}`;

export const validatePhoneLength = (maskedPhone: string, length = 12) => getUnmaskedMobileNumber(maskedPhone).length === length;

export const getLastNNumbers = (mobileNumber: string, lastN: number) => mobileNumber.replace(/[()]|\s|-|\*/g, '').slice(lastN * -1);

export const getFormattedMobileNumber = (mobileNumber: string) => mobileNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2 $3');

export const getLastFourDigits = (mobileNumber: string | null | undefined, useWhitespaceDivide?: boolean) => `${useWhitespaceDivide ? `*** **** ` : `***-****-`}${mobileNumber?.slice(8)}`; //

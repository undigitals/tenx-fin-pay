export const getRawMobileNumber = (mobileNumber: string) => `+1${mobileNumber.replace(/[()]|\s|-/g, '')}`;

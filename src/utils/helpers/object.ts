export const filterEmptyStrings = (obj: any) => Object.fromEntries(Object.entries(obj).filter(([, val]) => val !== ''));

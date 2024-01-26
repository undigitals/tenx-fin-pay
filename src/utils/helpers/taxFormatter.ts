export const taxFormatter = (taxId?: string) => (taxId ? `${taxId.slice(0, 3)}-${taxId.slice(3, 5)}-${taxId.slice(5)}` : '');
export const getUnmaskedTax = (taxId: string) => taxId.replaceAll('-', '');

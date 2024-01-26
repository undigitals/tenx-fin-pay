export const formatPhone = (rawPhone = '') => `+1${rawPhone?.replace(/\D/g, '')}`;

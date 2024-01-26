export const lsGetItem = (key: string) => {
  const storedData = localStorage.getItem(key);

  if (!storedData) return undefined;

  try {
    return JSON.parse(storedData);
  } catch {
    return storedData;
  }
};

export const lsSetItem = (key: string, item: any) => {
  if (!item) return;

  const storageData = typeof item === 'object' ? JSON.stringify(item) : item || '';
  localStorage.setItem(key, storageData);
};

export const lsRemoveItem = (key: string) => localStorage.removeItem(key);

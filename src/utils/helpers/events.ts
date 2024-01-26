export const subscribeToEvent = (eventName: string, listener: () => void) => {
  document.addEventListener(eventName, listener);
};

export const unsubscribeFromEvent = (eventName: string, listener: () => void) => {
  document.removeEventListener(eventName, listener);
};

export const triggerEvent = (eventName: string) => {
  const event = new CustomEvent(eventName);
  document.dispatchEvent(event);
};

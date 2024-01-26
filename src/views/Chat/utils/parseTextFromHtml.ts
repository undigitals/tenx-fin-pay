export const parseTextFromHtml = (html: string) => {
  const temporalDivElement = document.createElement('div');
  temporalDivElement.innerHTML = html;
  const text = temporalDivElement.textContent || temporalDivElement.innerText || '';

  return text.replace(/\s+/g, ' ').trim();
};

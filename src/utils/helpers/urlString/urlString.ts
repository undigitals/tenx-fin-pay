import { IUrlString } from './urlString.types';

const MAX_TEXT_SIZE = 40;

export const urlString = ({ url, params }: IUrlString) => `${url}${params ? `?${new URLSearchParams(params).toString()}` : ''}`;

export const shortenLinks = (htmlText: string, maxSize = MAX_TEXT_SIZE) => {
  const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>(.*?)<\/a>/g;
  const shortenedHtml = htmlText.replace(regex, (match, p1, p2, p3) => {
    const hrefText = p2.trim();
    const linkText = p3.trim();
    if (linkText.length > maxSize && linkText.includes(hrefText)) {
      const shortenedText = `${hrefText.substr(0, maxSize)}...`;
      const updatedLink = linkText.replace(hrefText, shortenedText);
      return `<a href=${p1}${p2}${p1}>${updatedLink}</a>`;
    }
    return match;
  });
  return shortenedHtml;
};

export const convertLinksToExternal = (htmlText: string) => htmlText.replace('<a href=', '<a target="_blank" href=');

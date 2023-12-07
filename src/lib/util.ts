import { gsapEaseList } from './constants';

export const parseGsapEaseStrWithUndefined = (str: string | undefined | null) => {
  if (!str) return undefined;
  return gsapEaseList.findIndex((v) => v === str) === -1 ? undefined : str;
};

export const parseFloatWithUndefined = (str: string | undefined | null) => {
  if (!str) return undefined;
  const parsed = Number.parseFloat(str);
  return Number.isNaN(parsed) ? undefined : parsed;
};

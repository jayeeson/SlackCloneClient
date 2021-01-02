import { localStorageKey } from '../types';

export const getLocalStorageActiveServer = () => {
  return parseInt(localStorage.getItem(localStorageKey.ChatUiSettings.activeServer) ?? '0', 10);
};

export const getLocalStorageActiveChannel = (server: number) => {
  return parseInt(localStorage.getItem(`server#${server}`) ?? '0', 10);
};

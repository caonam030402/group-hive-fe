import { isClient } from "./common";

export const setLocalStorage = ({
  key,
  value,
}: {
  key: string;
  value: unknown;
}) => {
  return value && isClient && localStorage.setItem(key, JSON.stringify(value));
};
export const getLocalStorage = ({ key }: { key: string }) => {
  const value = isClient && localStorage.getItem(key);
  return value && JSON.parse(value);
};

export const clearLocalStorage = ({ key }: { key: string }) => {
  isClient && localStorage.removeItem(key);
};

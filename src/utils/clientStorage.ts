export const setLocalStorage = ({
  key,
  value,
}: {
  key: string;
  value: unknown;
}) => {
  return value && localStorage.setItem(key, JSON.stringify(value));
};
export const getLocalStorage = ({ key }: { key: string }) => {
  const value = localStorage.getItem(key);
  return value && JSON.parse(value);
};

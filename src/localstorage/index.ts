export const KEYTYPE_KEY = "key_type";
export type KeyType = "A" | "B";
type Keys = typeof KEYTYPE_KEY;
const getStoreValue = (key: Keys) => {
  try {
    const items = localStorage.getItem(key);
    if (items) {
      return JSON.parse(items);
    }
    return null;
  } catch {
    return null;
  }
};

const setStoreValue = (key: Keys, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(key));
};

export const getStoreKeyType = (): string => getStoreValue(KEYTYPE_KEY);

export const setStoreKeyType = (value: "A" | "B") => {
  setStoreValue(KEYTYPE_KEY, value);
};

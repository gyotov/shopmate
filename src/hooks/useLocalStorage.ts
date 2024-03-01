import { useState, useCallback } from "react";
import { ListItemProps } from "@components/ListItem";
import { LOCAL_STORAGE_ITEM_KEY } from "@utils/constants";

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : []

    } catch {
      return []
    }
  });

  const createEntry = useCallback(
    (entry: object) => {
      localStorage.setItem(key, JSON.stringify([entry, ...value]));
      setValue([entry, ...value]);
      window.dispatchEvent(new StorageEvent('storage', {
        key: LOCAL_STORAGE_ITEM_KEY,
        newValue: JSON.stringify([entry, ...value])
      }));
    },
    [value, setValue, key]
  );
  const updateEntry = useCallback(
    (id: string, updatedEntry: ListItemProps) => {
      const newData = value.map((entry: ListItemProps) => {
        if (entry.id === id) return updatedEntry;
        return entry;
      });
      localStorage.setItem(key, JSON.stringify(newData));
      setValue(newData);
      window.dispatchEvent(new StorageEvent('storage', {
        key: LOCAL_STORAGE_ITEM_KEY,
        newValue: JSON.stringify(newData)
      }));
    },
    [value, setValue, key]
  );

  return [value, createEntry, updateEntry]
}

export default useLocalStorage;

import { ListItemProps } from "@components/ListItem";
import { LOCAL_STORAGE_ITEM_KEY } from "@utils/constants";

export const getItems = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM_KEY) || "[]");
  } catch {
    return [];
  }
};

export const storeAndDispatchItems = (payload: ListItemProps[]) => {
  localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, JSON.stringify(payload));
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: LOCAL_STORAGE_ITEM_KEY,
      newValue: JSON.stringify(payload),
    })
  );
};

export const addItem = (payload: ListItemProps) => {
  const storedValue = getItems();
  const exist = storedValue.find(
    (entry: ListItemProps) => entry.title === payload.title
  );

  if (exist) {
    throw new Error(`Item '${payload.title}' already exist`);
  }

  try {
    const newValue = [payload, ...storedValue];

    storeAndDispatchItems(newValue);
  } catch {
    alert("An error occurred while adding item");
  }
};

export const updateItem = (payload: ListItemProps) => {
  const storedValue = getItems();

  try {
    const newValue = storedValue.map((entry: ListItemProps) => {
      if (entry.id === payload.id) return payload;
      return entry;
    });

    storeAndDispatchItems(newValue);
  } catch {
    alert("An error occurred while updating item");
  }
};

export const deleteItem = (id: string) => {
  const storedValue = getItems();

  try {
    const newValue = storedValue.filter((entry: ListItemProps) => {
      return entry.id !== id;
    });

    storeAndDispatchItems(newValue);
  } catch {
    alert("An error occurred while deleting item");
  }
};

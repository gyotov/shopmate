import { useState, useEffect, useCallback } from "react";

import ListItem, { ListItemProps } from "@components/ListItem";
import {
  LOCAL_STORAGE_ITEM_EVENT,
  LOCAL_STORAGE_ITEM_KEY,
} from "@utils/constants";

export default function ListItems() {
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState<ListItemProps[]>([]);
  const retrieveLocalStorageItems = useCallback(() => {
    const localStorageItems = localStorage.getItem(LOCAL_STORAGE_ITEM_KEY);

    setItems(localStorageItems ? JSON.parse(localStorageItems) : []);
  }, []);

  useEffect(() => {
    retrieveLocalStorageItems();
    setLoaded(true);
    window.addEventListener(LOCAL_STORAGE_ITEM_EVENT, () => {
      retrieveLocalStorageItems();
    });
  }, [retrieveLocalStorageItems]);

  if (!loaded) return <p>Loading...</p>;
  if (items.length === 0) return <p>No shopping items added yet.</p>;

  return (
    <div>
      {items.map((item: ListItemProps) => (
        <ListItem
          id={item.id}
          title={item.title}
          notes={item.notes}
          key={item.id}
        />
      ))}
    </div>
  );
}

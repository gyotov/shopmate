import { useEffect, useState } from "react";

import ListItem, { ListItemProps } from "@components/ListItem";
import useLocalStorage from "@hooks/useLocalStorage";
import { LOCAL_STORAGE_ITEM_KEY } from "@utils/constants";

export default function ListItems() {
  const [localStorageValue] = useLocalStorage(LOCAL_STORAGE_ITEM_KEY);
  const [items, setItems] = useState(localStorageValue);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      const payload = event.newValue || "[]";
      setItems(JSON.parse(payload));
    };

    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (items.length === 0) return <p>No shopping items added yet.</p>;

  return (
    <div>
      {items.map((item: ListItemProps) => (
        <ListItem
          id={item.id}
          title={item.title}
          notes={item.notes}
          added={item.added}
          key={item.id}
        />
      ))}
    </div>
  );
}

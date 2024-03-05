import { useEffect, useState } from "react";

import ListItem, { ListItemProps } from "@components/ListItem";
import { LOCAL_STORAGE_ITEM_KEY } from "@utils/constants";
import { getItems } from "@utils/localStorageAPI";

export default function ListItems() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== LOCAL_STORAGE_ITEM_KEY) return;

      const payload = event.newValue || "[]";
      setItems(JSON.parse(payload));
    };

    setItems(getItems());
    setLoaded(true);

    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!loaded) return null;

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

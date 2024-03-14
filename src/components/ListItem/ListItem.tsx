import { useCallback, useEffect, useState } from "react";

import { useAppContext } from "@hooks/useAppContext";
import { deleteItem, updateItem } from "@utils/localStorageAPI";
import styles from "./ListItem.module.css";

export type Props = {
  id: string;
  title: string;
  notes?: string;
  added?: boolean;
};

export default function ListItem({ id, title, notes, added }: Props) {
  const { state, setState } = useAppContext();
  const [isAdded, setIsAdded] = useState(added);
  const onEdit = useCallback(() => {
    setState({
      ...state,
      form: {
        item: { id, title, notes, added },
        active: true,
      },
    });
  }, [id, title, notes, added, state, setState]);
  const onDelete = useCallback(() => {
    if (confirm(`Do you want to remove ${title} from your list?`)) {
      deleteItem(id);
    }
  }, [id, title]);
  const onAddedChange = useCallback(() => {
    setIsAdded(!isAdded);
  }, [isAdded]);

  useEffect(() => {
    updateItem({ id, title, notes, added: isAdded });
  }, [isAdded, id, title, notes]);

  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <div className={styles.checkmark}>
          <input
            type="checkbox"
            name={`List-Item-${id}`}
            checked={isAdded}
            onChange={onAddedChange}
          />
        </div>

        <div className={styles.contentMain}>
          <h3>{title}</h3>
          {notes && <p>{notes}</p>}
          {added && <small>Added to cart</small>}
        </div>
      </div>

      <div className={styles.actions}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Remove</button>
      </div>
    </div>
  );
}

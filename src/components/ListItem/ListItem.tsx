import styles from "./ListItem.module.css";

export type Props = {
  id: string;
  title: string;
  notes?: string;
  added?: boolean;
};

export default function ListItems({ title, notes, added }: Props) {
  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <h3>{title}</h3>
        {notes && <p>{notes}</p>}
        {added && <small>Added to cart</small>}
      </div>

      <div className={styles.actions}>
        <button>Edit</button>
        <button>Remove</button>
      </div>
    </div>
  );
}

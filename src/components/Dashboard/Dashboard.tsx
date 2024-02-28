import ListItems from "@components/ListItems";
import Button from "@components/Button";
import ListItemForm from "@components/ListItemForm";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.head}>
        <h1 className={styles.title}>Products list</h1>

        <h2 className={styles.subtitle}>Your shopping buddy</h2>
      </header>

      <div className={styles.body}>
        <ListItems />
      </div>

      <div className={styles.actions}>
        <Button onClick={() => alert("Add item")}>Add shopping item</Button>
        <ListItemForm />
      </div>
    </div>
  );
}

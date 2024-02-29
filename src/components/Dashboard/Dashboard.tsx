import { useState, useCallback } from "react";

import ListItems from "@components/ListItems";
import Button from "@components/Button";
import ListItemForm from "@components/ListItemForm";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [formStatus, setFormStatus] = useState({
    item: null,
    active: false,
  });
  const toggleForm = useCallback(() => {
    setFormStatus({ ...formStatus, active: !formStatus.active });
  }, [formStatus]);

  return (
    <div className={styles.dashboard}>
      <header className={styles.head}>
        <h1 className={styles.title}>Products list</h1>

        <h2 className={styles.subtitle}>Your shopping buddy</h2>
      </header>

      <div className={styles.body}>
        <ListItems />
      </div>

      {!formStatus.active && (
        <div className={styles.actions}>
          <Button onClick={toggleForm}>Add shopping item</Button>
        </div>
      )}
      {formStatus.active && (
        <>
          <div className={styles.form}>
            <ListItemForm />
          </div>

          <div className={styles.actions}>
            <Button secondary onClick={toggleForm}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

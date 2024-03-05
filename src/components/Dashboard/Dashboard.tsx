import { useCallback } from "react";

import { useAppContext } from "@hooks/useAppContext";
import ListItems from "@components/ListItems";
import Button from "@components/Button";
import ListItemForm from "@components/ListItemForm";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { state, setState } = useAppContext();
  const toggleForm = useCallback(() => {
    const formActive = !state.form.active;

    setState({
      ...state,
      form: {
        item: formActive && state.form.item ? state.form.item : null,
        active: formActive,
      },
    });
  }, [state, setState]);

  return (
    <div className={styles.dashboard}>
      <header className={styles.head}>
        <h1 className={styles.title}>Products list</h1>

        <h2 className={styles.subtitle}>Your shopping buddy</h2>
      </header>

      <div className={styles.body}>
        <ListItems />
      </div>

      {!state.form.active && (
        <div className={styles.actions}>
          <Button onClick={toggleForm}>Add shopping item</Button>
        </div>
      )}
      {state.form.active && (
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

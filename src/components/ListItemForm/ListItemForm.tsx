import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "@components/Button";
import { INITIAL_ITEM_STATE, INITIAL_CONTEXT_VALUE } from "@utils/constants";
import { useAppContext } from "@hooks/useAppContext";
import { addItem, updateItem } from "@utils/localStorageAPI";
import styles from "./ListItemForm.module.css";

export default function ListItemForm() {
  const { state, setState } = useAppContext();
  const [formState, setFormState] = useState(
    state.form.item || INITIAL_ITEM_STATE
  );
  const shouldSubmit = formState.title !== "";
  const resetForm = useCallback(() => {
    setState({ ...state, form: INITIAL_CONTEXT_VALUE.form });
  }, [state, setState]);
  const onChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;

    setFormState({ ...formState, [name]: value });
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!shouldSubmit) return;

    const itemValue = {
      id: state?.form?.item?.id || uuidv4(),
      ...formState,
    };

    if (state.form.item) {
      updateItem(itemValue);
      resetForm();
      return;
    }

    try {
      addItem(itemValue);
      resetForm();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    setFormState(state.form.item || INITIAL_ITEM_STATE);
  }, [state.form.item]);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        type="text"
        name="title"
        value={formState.title}
        onChange={onChange}
        placeholder="Title"
        required
      />
      <textarea
        name="notes"
        value={formState.notes}
        onChange={onChange}
        placeholder="Notes"
      ></textarea>
      <Button type="submit" disabled={!shouldSubmit}>
        Save
      </Button>
    </form>
  );
}

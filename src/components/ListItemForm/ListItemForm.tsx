import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "@components/Button";
import styles from "./ListItemForm.module.css";

import { INITIAL_ITEM_STATE, LOCAL_STORAGE_ITEM_KEY } from "@utils/constants";
import useLocalStorageAPI from "@hooks/useLocalStorage";

export default function ListItemForm() {
  const [, setLocalStorageStateValue] = useLocalStorageAPI(
    LOCAL_STORAGE_ITEM_KEY
  );
  const [formState, setFormState] = useState(INITIAL_ITEM_STATE);
  const shouldSubmit = formState.title !== "";
  const onChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;

    if (name === "added") {
      return setFormState({ ...formState, added: !formState.added });
    }

    setFormState({ ...formState, [name]: value });
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!shouldSubmit) return;

    const itemValue = {
      id: uuidv4(),
      ...formState,
    };

    setLocalStorageStateValue(itemValue);
    setFormState(INITIAL_ITEM_STATE);
  };

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
      <div>
        <input
          type="checkbox"
          name="added"
          checked={formState.added}
          onChange={onChange}
          id="Added"
        />
        <label htmlFor="Added">Added to cart</label>
      </div>
      <Button type="submit" disabled={!shouldSubmit}>
        Save
      </Button>
    </form>
  );
}

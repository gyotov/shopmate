import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "@components/Button";
import styles from "./ListItemForm.module.css";

import {
  INITIAL_ITEM_STATE,
  LOCAL_STORAGE_ITEM_KEY,
  LOCAL_STORAGE_ITEM_EVENT,
} from "@utils/constants";

export default function ListItemForm() {
  const [state, setState] = useState(INITIAL_ITEM_STATE);
  const shouldSubmit = state.title !== "";
  const onChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;

    if (name === "added") {
      return setState({ ...state, added: !state.added });
    }

    setState({ ...state, [name]: value });
  };
  const saveItemToLocalStorage = () => {
    const itemValue = {
      id: uuidv4(),
      ...state,
    };
    const localeStorageItem = localStorage.getItem(LOCAL_STORAGE_ITEM_KEY);

    localStorage.setItem(
      LOCAL_STORAGE_ITEM_KEY,
      localeStorageItem
        ? JSON.stringify([itemValue, ...JSON.parse(localeStorageItem)])
        : JSON.stringify([itemValue])
    );
    window.dispatchEvent(new Event(LOCAL_STORAGE_ITEM_EVENT));
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!shouldSubmit) return;

    saveItemToLocalStorage();
    setState(INITIAL_ITEM_STATE);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        type="text"
        name="title"
        value={state.title}
        onChange={onChange}
        placeholder="Title"
        required
      />
      <textarea
        name="notes"
        value={state.notes}
        onChange={onChange}
        placeholder="Notes"
      ></textarea>
      <div>
        <input
          type="checkbox"
          name="added"
          checked={state.added}
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

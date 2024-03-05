import {
  createContext,
  useState,
  PropsWithChildren,
  SetStateAction,
  Dispatch,
} from "react";
import { INITIAL_CONTEXT_VALUE } from "@utils/constants";
import { ListItemProps } from "@components/ListItem";

type State = {
  form: {
    active: boolean;
    item: ListItemProps | null;
  };
};
type ContextType = {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
};

export const AppContext = createContext<ContextType | null>(null);
export const AppContextProvider = ({ children }: PropsWithChildren<State>) => {
  const [state, setState] = useState<ContextType["state"]>(
    INITIAL_CONTEXT_VALUE
  );

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

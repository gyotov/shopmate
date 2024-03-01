import {
  createContext,
  useState,
  PropsWithChildren,
  SetStateAction,
  Dispatch,
} from "react";
import { INITIAL_CONTEXT_VALUE } from "@utils/constants";

type ContextType = {
  state: object | undefined;
  setState: Dispatch<SetStateAction<object | undefined>>;
};

export const AppContext = createContext<ContextType | null>(null);

export const AppContextProvider = ({ children }: PropsWithChildren<object>) => {
  const [state, setState] = useState<ContextType["state"]>(
    INITIAL_CONTEXT_VALUE
  );

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

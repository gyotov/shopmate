import { useContext } from "react";
import { AppContext } from "@context/context";

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside the AppContextProvider");
  }

  return context;
};

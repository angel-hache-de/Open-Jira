import { createContext } from "react";
import { Entry } from "../../interfaces";

// Lo que el contexto expone
interface ContextProps {
  entries: Entry[];
  // Methods
  addNewEntry: (description: string) => Promise<void>;
  updateEntry: (entry: Entry, showSnackbar?: boolean) => Promise<void>;
  deleteEntry: (entry: Entry) => Promise<void>;
}

export const EntriesContext = createContext({} as ContextProps);

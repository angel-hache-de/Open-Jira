import { FC, useCallback, useEffect, useReducer } from "react";
import { useSnackbar, VariantType } from "notistack";

import { entriesApi } from "../../api";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";

// Estado
export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface EntriesProviderProps {
  children: JSX.Element;
}

export const EntriesProvider: FC<EntriesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();
  const showSnackbar = useCallback(
    (message: string, variant: VariantType = "success") => {
      enqueueSnackbar(message, {
        variant,
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    refreshEntries();
  }, []);

  const refreshEntries = async () => {
    try {
      const { data } = await entriesApi.get<Entry[]>("/entries");
      dispatch({ type: "Entries - Refresh-Data", payload: data });
    } catch (error: any) {
      showSnackbar(error.message, "error");
    }
  };

  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>("/entries", {
        description,
      });

      dispatch({ type: "Entries - Add-Entry", payload: data });
    } catch (error: any) {
      showSnackbar(error.message, "error");
    }
  };

  const deleteEntry = async ({ _id }: Entry) => {
    try {
      const { data } = await entriesApi.delete<Entry>(`/entries/${_id}`);
      dispatch({ type: "Entries - Entry-Deleted", payload: data });
      showSnackbar("Entry deleted");
    } catch (error: any) {
      showSnackbar(error.message, "error");
      throw new Error("");
    }
  };

  const updateEntry = async (
    { description, status, _id }: Entry,
    displaySnackbar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description: description,
        status: status,
      });
      dispatch({ type: "Entries - Entry-Updated", payload: data });

      if (displaySnackbar) showSnackbar("Entry updated");
    } catch (error: any) {
      showSnackbar(error.message, "error");
    }
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        // Methods
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};

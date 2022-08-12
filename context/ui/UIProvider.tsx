import { FC, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sideMenuOpen: boolean;
  addingEntry: boolean;
  isDragging: boolean;
  deleteConfirmationOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  addingEntry: false,
  isDragging: false,
  deleteConfirmationOpen: false,
};

interface UIProviderProps {
  children: JSX.Element;
}

export const UIProvider: FC<UIProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: "UI - Open Sidebar" });
  };

  const closeSideMenu = () => {
    dispatch({ type: "UI - Close Sidebar" });
  };

  const openAddEntryForm = () => {
    dispatch({ type: "UI - Open Entry Form" });
  };

  const closeAddEntryForm = () => {
    dispatch({ type: "UI - Close Entry Form" });
  };

  const startDragging = () => {
    dispatch({ type: "UI - Start Dragging" });
  };

  const endDragging = () => {
    dispatch({ type: "UI - End Dragging" });
  };

  const openDeleteConfirmation = () => {
    dispatch({ type: "UI - Open Delete Confirmation" });
  };

  const closeDeleteConfirmation = () => {
    dispatch({ type: "UI - Close Delete Confirmation" });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,

        openAddEntryForm,
        closeAddEntryForm,

        openDeleteConfirmation,
        closeDeleteConfirmation,

        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

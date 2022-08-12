import { createContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;
  addingEntry: boolean;
  isDragging: boolean;
  deleteConfirmationOpen: boolean;

  // Methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
  openAddEntryForm: () => void;
  closeAddEntryForm: () => void;
  openDeleteConfirmation: () => void;
  closeDeleteConfirmation: () => void;
  startDragging: () => void;
  endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);

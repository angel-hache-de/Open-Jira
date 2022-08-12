import { UIState } from "./UIProvider";

type UIActionType =
  | {
      type: "UI - Open Sidebar";
    }
  | {
      type: "UI - Close Sidebar";
    }
  | {
      type: "UI - Open Entry Form";
    }
  | {
      type: "UI - Close Entry Form";
    }
  | {
      type: "UI - Open Delete Confirmation";
    }
  | {
      type: "UI - Close Delete Confirmation";
    }
  | {
      type: "UI - Start Dragging";
    }
  | {
      type: "UI - End Dragging";
    };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Open Sidebar":
      return {
        ...state,
        sideMenuOpen: true,
      };
    case "UI - Close Sidebar":
      return {
        ...state,
        sideMenuOpen: false,
      };
    case "UI - Open Entry Form":
      return {
        ...state,
        addingEntry: true,
      };
    case "UI - Close Entry Form":
      return {
        ...state,
        addingEntry: false,
      };
    case "UI - Open Delete Confirmation":
      return {
        ...state,
        deleteConfirmationOpen: true,
      };
    case "UI - Close Delete Confirmation":
      return {
        ...state,
        deleteConfirmationOpen: false,
      };
    case "UI - Start Dragging":
      return {
        ...state,
        isDragging: true,
      };
    case "UI - End Dragging":
      return {
        ...state,
        isDragging: false,
      };
    default:
      return state;
  }
};

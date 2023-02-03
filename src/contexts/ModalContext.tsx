import React from "react";
import PropTypes, { InferProps } from "prop-types";

type MODAL_VIEWS =
  | "AUTH_BOARDING"
  | "IMAGE_VIEWER" // notAvailable
  | "DELETE_TWEET" // notAvailable
  | "TWEET" //notAvailable
  | "QUOTE_TWEET" //notAvailable 
  | "REPLY_TWEET";// notAvailable

interface State {
  view?: MODAL_VIEWS;
  data?: any;
  isOpen: boolean;
  loading: boolean;
  postFunction?: () => void;
}
type Action =
  | { type: "open"; view?: MODAL_VIEWS; payload?: any; postFunction?: () => void }
  | { type: "close" }
  | { type: "loading"; loading: boolean };

const initialState: State = {
  view: undefined,
  isOpen: false,
  loading: false,
  data: null,
  postFunction: undefined,
};

function modalReducer(state: State, action: Action): State {
  switch (action.type) {
    case "open":
      return {
        ...state,
        view: action.view,
        data: action.payload,
        isOpen: true,
        postFunction: action.postFunction,
      };
    case "close":
      return {
        ...state,
        view: undefined,
        data: null,
        isOpen: false,
        loading: false,
      };
    case "loading":
      return { ...state, loading: action.loading };
    default:
      throw new Error("Unknown Modal Action!");
  }
}

const ModalStateContext = React.createContext<State>(initialState);
ModalStateContext.displayName = "ModalStateContext";
const ModalActionContext = React.createContext<
  React.Dispatch<Action> | undefined
>(undefined);
ModalActionContext.displayName = "ModalActionContext";

const ModlPropsType = {
  children: PropTypes.node.isRequired,
};
type ModlProps = InferProps<typeof ModlPropsType>;

export const ModalProvider: React.FC<ModlProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(modalReducer, initialState);
  return (
    <ModalStateContext.Provider value={state}>
      <ModalActionContext.Provider value={dispatch}>
        {children}
      </ModalActionContext.Provider>
    </ModalStateContext.Provider>
  );
};

export function useModalState() {
  const context = React.useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error(`useModalState must be used within a ModalProvider`);
  }
  return context;
}

export function useModalAction() {
  const dispatch = React.useContext(ModalActionContext);
  if (dispatch === undefined) {
    throw new Error(`useModalAction must be used within a ModalProvider`);
  }
  return {
    /**
     * 
     * @param view displying modal view
     * @param payload data for modal
     * @param postFunction function calls after completion on proceed
     */
    openModal(view?: MODAL_VIEWS, payload?: unknown, postFunction?: () => void) {
      dispatch({ type: "open", view, payload, postFunction });
    },
    closeModal() {
      dispatch({ type: "close" });
    },
    setLoading(loading) {
      dispatch({ type: "loading", loading });
    },
  };
}

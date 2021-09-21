import React, { useReducer, createContext } from 'react';
export const DrawerContext = createContext<{
  state?: any;
  dispatch?: React.Dispatch<any>;
}>({});

type VIEW = 'login' | 'user' | 'product' | 'cart' | 'checkout'

const INITIAL_STATE = {
  view: null,
  menu: false,
  product: null,
};

type ActionType =
  | { type: 'OPEN_VIEW'; payload: {view: VIEW, product?: any}}
  | { type: 'OPEN_MENU'; payload: any };

type StateType = typeof INITIAL_STATE;

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'OPEN_VIEW':
      return {
        ...state,
        view: action.payload.view,
        product: action.payload.product
      };
    case 'OPEN_MENU':
      return {
        ...state,
        menu: action.payload.menu,
      };
    default:
      return state;
  }
}

export const DrawerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <DrawerContext.Provider value={{ state, dispatch }}>
      {children}
    </DrawerContext.Provider>
  );
};

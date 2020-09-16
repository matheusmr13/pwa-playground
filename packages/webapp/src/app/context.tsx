import React, { useReducer, ReactNode, useCallback, useContext } from 'react';

interface StateType {
  application?: any;
  setTitle?: Function;
  setNotifications?: Function;
}

const ctx = React.createContext<StateType>({});

export function useAppTitle() {
  const { application, setTitle } = useContext(ctx);
  return [application.title, setTitle];
}

export function useNotifications() {
  const { application, setNotifications } = useContext(ctx);
  return [application.notifications, setNotifications];
}

function reducer(state: any, action: any) {
  const { type, payload } = action;
  return ({
    setTitle: () => ({ ...state, title: payload }),
    setNotifications: () => ({ ...state, notifications: payload }),
  } as any)[type]();
}

export default function Provider(props: { children: ReactNode }) {
  const { children } = props;
  const [application, dispatch] = useReducer(reducer, {});
  const setTitle = useCallback((title: string) => {
    dispatch({ type: 'setTitle', payload: title });
  }, []);
  const setNotifications = useCallback((notifications: any[]) => {
    dispatch({ type: 'setNotifications', payload: notifications });
  }, []);

  return <ctx.Provider value={{ application, setTitle, setNotifications }}>{children}</ctx.Provider>;
}

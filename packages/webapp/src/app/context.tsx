import React, { useState, ReactChildren, ReactChild, useContext, useReducer } from 'react';

interface StateType {
  application?: any;
  setTitle?: Function;
}

const ctx = React.createContext<StateType>({});

export function useAppTitle() {
  const {
    application: { title },
    setTitle,
  } = useContext(ctx);
  return [title, setTitle];
}

function reducer(state: any, action: any) {
  const { type, payload } = action;
  return ({
    setTitle: () => ({ ...state, title: payload }),
  } as any)[type]();
}

export default function Provider(props: { children: ReactChildren | ReactChild }) {
  const { children } = props;
  const [application, dispatch] = useReducer(reducer, []);

  const setTitle = (title: string) => dispatch({ type: 'setTitle', payload: title });

  return <ctx.Provider value={{ application, setTitle }}>{children}</ctx.Provider>;
}

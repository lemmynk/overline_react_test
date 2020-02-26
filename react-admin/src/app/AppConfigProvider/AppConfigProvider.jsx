// @flow
import React, { type Node } from 'react';
import { reducer, initialState, SET_ALL } from './reducer';

type Props = {
  children: Node,
};

const AppConfigContext = React.createContext<any>();

export const AppConfigProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // eslint-disable-next-line no-console
  console.log('AppConfigProvider render');

  const context = { state, dispatch };

  return (
    <AppConfigContext.Provider value={context}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  const context = React.useContext(AppConfigContext);

  if (context === undefined) {
    throw new Error('useAppConfig must be used within AppConfigProvider');
  }

  const { state, dispatch } = context;
  const { data: config, version, isReady } = state;

  const setConfig = (payload: Object) => dispatch({ type: SET_ALL, payload });

  return {
    isReady,
    config,
    version,
    setConfig,
  };
};

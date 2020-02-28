// @flow
import React, { type Node, useState } from 'react';

type ProviderProps = {
  children: Node,
};

const ArtPdvContext = React.createContext<any>();

export const ArtPdvProvider = ({ children }: ProviderProps) => {
  const [pdvs, setPdvs] = useState([]);

  const context = { pdvs, setPdvs };

  // eslint-disable-next-line no-console
  console.log('### ArtPdvProvider render');

  return (
    <ArtPdvContext.Provider value={context}>{children}</ArtPdvContext.Provider>
  );
};

export const useArtPdv = () => {
  const context = React.useContext(ArtPdvContext);

  if (context === undefined) {
    throw new Error('useArtPdv must be used within ArtPdvProvider');
  }

  return context;
};

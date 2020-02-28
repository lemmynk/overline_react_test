// @flow
import React, { type Node, useState } from 'react';

type ProviderProps = {
  children: Node,
};

const ArtGroupsContext = React.createContext<any>();

export const ArtGroupsProvider = ({ children }: ProviderProps) => {
  const [groups, setGroups] = useState([]);

  const context = { groups, setGroups };

  // eslint-disable-next-line no-console
  console.log('### ArtGroupsProvider render');

  return (
    <ArtGroupsContext.Provider value={context}>
      {children}
    </ArtGroupsContext.Provider>
  );
};

export const useArtGroups = () => {
  const context = React.useContext(ArtGroupsContext);

  if (context === undefined) {
    throw new Error('useArtGroups must be used within ArtGroupsProvider');
  }

  return context;
};

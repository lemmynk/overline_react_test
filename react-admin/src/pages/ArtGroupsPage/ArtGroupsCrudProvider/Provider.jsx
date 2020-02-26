// @flow
import React, { type Node } from 'react';

type Props = {
  children: Node,
};

const ArtGroupsCrudContext = React.createContext<any>();

export const ArtGroupsCrudProvider = ({ children }: Props) => {
  const [isProcessing, setIsProcessing] = React.useState(false);

  // eslint-disable-next-line no-console
  console.log('ArtGroupsCrudProvider render');

  const context = { isProcessing, setIsProcessing };

  return (
    <ArtGroupsCrudContext.Provider value={context}>
      {children}
    </ArtGroupsCrudContext.Provider>
  );
};

export const useArtGroupsCrud = () => {
  const context = React.useContext(ArtGroupsCrudContext);

  if (context === undefined) {
    throw new Error(
      'useArtGroupsCrud must be used within ArtGroupsCrudProvider',
    );
  }

  return {
    ...context,
  };
};

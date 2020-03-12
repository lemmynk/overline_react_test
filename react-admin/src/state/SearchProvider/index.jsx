// @flow
import React, { useState } from 'react';

const SearchContext = React.createContext<any>();

export const SearchProvider = ({ children }: ProviderProps) => {
  const [search, setSearch] = useState('');

  const context = { search, setSearch };

  return (
    <SearchContext.Provider value={context}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = React.useContext(SearchContext);

  if (context === undefined) {
    throw new Error('useSearch must be used within SearchProvider');
  }

  const { search, setSearch } = context;

  const clearSearch = () => setSearch('');

  return {
    search,
    setSearch,
    clearSearch,
  };
};

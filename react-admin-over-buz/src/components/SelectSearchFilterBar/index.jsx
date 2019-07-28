// @flow
import React from 'react';
import { Grid, Tile, Select, SearchBox } from '@newtash/react-app-core';

const SelectSearchFilterBar = (props: SelectSearchFilterBarProps) => {
  const {
    labelSelect,
    labelText,
    selectOptions,
    filterSelect,
    filterText,
    setSelectFilter,
    setFilterText,
    clearFilterText,
  } = props;
  const options = [...selectOptions];
  return (
    <Grid cols={2}>
      <Tile>
        <Select
          placeholder={labelSelect}
          options={options}
          value={filterSelect}
          onChange={setSelectFilter}
        />
      </Tile>
      <Tile>
        <SearchBox
          placeholder={labelText}
          value={filterText}
          onChange={setFilterText}
          onClear={clearFilterText}
        />
      </Tile>
    </Grid>
  );
};

export default SelectSearchFilterBar;

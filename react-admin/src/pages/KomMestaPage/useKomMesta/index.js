// @flow
import { useReducer, useState, useEffect, useMemo, useCallback } from 'react';
import { useApi, useAppData, useAppErrors } from '@newtash/core';
import { sortByKey } from '@newtash/core/utils';
import { reducer, initialState, SET_ALL } from './reducer';
import { useEnv } from '../../../utils';

export default (url: string, deleteErrorMsg: string = '') => {
  const { api } = useApi();
  const { isReady: isAppReady } = useAppData();
  // const { config, isReady: isAppReady } = useAppData();
  const { addAppError } = useAppErrors();
  const { error422 } = useEnv();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [doFetchData, setDoFetch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [sortedKey, setSortedKey] = useState<string>('grpNaziv');
  const [sortedAsc, setSortAscending] = useState<boolean>(true);
  const [formId, setFormId] = useState<number>(0);

  // const data = useMemo(() => state ? state.data || [], [state]);
  // const dataVersion = useMemo(() => state ? state.version : 0, [state]);
  const { data, version: dataVersion, isReady: isDataReady } =
    state || initialState;

  const isReady = isAppReady && isDataReady;

  const filteredMesta: Array<any> = useMemo(
    () =>
      data
        .filter(item => item.deletedAt === null)
        .filter(item => item.naziv.toUpperCase().includes(search.toUpperCase()))
        .sort(sortByKey(sortedKey, sortedAsc)),
    [data, search, sortedKey, sortedAsc],
  );

  /**
   * Do fetch versioned data from api
   * @todo: Handle deleted objects
   */
  const fetchData = useCallback(async () => {
    try {
      const response = await api.get(`${url}?v=${dataVersion}`);
      const payload = await response.data;
      // console.log(response);
      await dispatch({ type: SET_ALL, payload });
      return true;
    } catch (err) {
      addAppError(err);
      return false;
    }
  }, [api, dataVersion, url, dispatch, addAppError]);

  /**
   * Delete group
   */
  const deleteItem = useCallback(
    async (id: number) => {
      try {
        const response = await api.delete(`${url}/${id}`);
        const status = await response.status;
        const isDeleted = status !== error422;
        if (!isDeleted) {
          await addAppError(deleteErrorMsg);
        }
        return isDeleted;
      } catch (err) {
        addAppError(err);
        return false;
      }
    },
    [api, url, addAppError, error422, deleteErrorMsg],
  );

  useEffect(() => {
    if (doFetchData) {
      setDoFetch(false);
      fetchData();
    }
  }, [doFetchData, setDoFetch, fetchData]);

  const doFetch = useCallback(() => {
    setDoFetch(true);
  }, [setDoFetch]);

  return {
    isReady,
    search,
    sortedKey,
    sortedAsc,
    formId,
    data,
    filteredMesta,

    setSearch,
    setSortedKey,
    setSortAscending,
    setFormId,

    doFetch,
    fetchData,
    deleteItem,
  };
};

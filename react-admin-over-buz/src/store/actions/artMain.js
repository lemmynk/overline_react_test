export const FETCH_ART_MAIN_DASH_DATA =
  '@newtash/react-app/FETCH_ART_MAIN_DASH_DATA';
export const SET_ART_MAIN_V_ARTIKL = '@newtash/react-app/SET_ART_MAIN_V_ARTIKL';
export const CLEAR_ART_MAIN_DASH_DATA =
  '@newtash/react-app/CLEAR_ART_MAIN_DASH_DATA';
export const SET_ART_MAIN_DASH_DATA =
  '@newtash/react-app/SET_ART_MAIN_DASH_DATA';
export const SET_ART_MAIN_DASH_FETCHING =
  '@newtash/react-app/SET_ART_MAIN_DASH_FETCHING';
export const SET_ART_MAIN_DASH_PAGING =
  '@newtash/react-app/SET_ART_MAIN_DASH_PAGING';
export const SET_ART_MAIN_DASH_FILTER_TEXT =
  '@newtash/react-app/SET_ART_MAIN_DASH_FILTER_TEXT';
export const SET_ART_MAIN_DASH_FILTER_SELECT =
  '@newtash/react-app/SET_ART_MAIN_DASH_FILTER_SELECT';

export const FETCH_ART_MAIN_FORM_DATA =
  '@newtash/react-app/FETCH_ART_MAIN_FORM_DATA';
export const SAVE_ART_MAIN_FORM_DATA =
  '@newtash/react-app/SAVE_ART_MAIN_FORM_DATA';
export const DELETE_ART_MAIN_FORM_DATA =
  '@newtash/react-app/DELETE_ART_MAIN_FORM_DATA';
export const CLEAR_ART_MAIN_FORM_DATA =
  '@newtash/react-app/CLEAR_ART_MAIN_FORM_DATA';
export const SET_ART_MAIN_FORM_DATA =
  '@newtash/react-app/SET_ART_MAIN_FORM_DATA';
export const SET_ART_MAIN_FORM_FETCHING =
  '@newtash/react-app/SET_ART_MAIN_FORM_FETCHING';

export const fetchArtMainDashData = page => ({
  type: FETCH_ART_MAIN_DASH_DATA,
  payload: page,
});

export const setArtMainDashVArtikl = vArtikl => ({
  type: SET_ART_MAIN_V_ARTIKL,
  payload: vArtikl,
});

export const clearArtMainDashData = () => ({
  type: CLEAR_ART_MAIN_DASH_DATA,
});

export const setArtMainDashData = data => ({
  type: SET_ART_MAIN_DASH_DATA,
  payload: data,
});

export const setArtMainDashPaging = paging => ({
  type: SET_ART_MAIN_DASH_PAGING,
  payload: paging,
});

export const setArtMainDashFetching = fetching => ({
  type: SET_ART_MAIN_DASH_FETCHING,
  payload: fetching,
});

export const setArtMainDashFilterText = filterText => ({
  type: SET_ART_MAIN_DASH_FILTER_TEXT,
  payload: filterText,
});

export const setArtMainDashFilterSelect = selectedKey => ({
  type: SET_ART_MAIN_DASH_FILTER_SELECT,
  payload: selectedKey,
});

export const fetchArtMainFormData = artId => ({
  type: FETCH_ART_MAIN_FORM_DATA,
  payload: artId,
});

export const saveArtMainFormData = formData => ({
  type: SAVE_ART_MAIN_FORM_DATA,
  payload: formData,
});

export const deleteArtMainFormData = artId => ({
  type: DELETE_ART_MAIN_FORM_DATA,
  payload: artId,
});

export const clearArtMainFormData = () => ({
  type: CLEAR_ART_MAIN_FORM_DATA,
});

export const setArtMainFormData = data => ({
  type: SET_ART_MAIN_FORM_DATA,
  payload: data,
});

export const setArtMainFormFetching = fetching => ({
  type: SET_ART_MAIN_FORM_FETCHING,
  payload: fetching,
});

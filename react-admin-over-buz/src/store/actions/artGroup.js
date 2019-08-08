export const FETCH_ART_GROUPS = '@newtash/react-app/FETCH_ART_GROUPS';
export const SET_ART_GROUPS = '@newtash/react-app/SET_ART_GROUPS';
export const SET_ART_GROUPS_VERSION =
  '@newtash/react-app/SET_ART_GROUPS_VERSION';
export const SET_ART_GROUP_DASH_V_ARTIKL =
  '@newtash/react-app/SET_ART_GROUP_DASH_V_ARTIKL';
export const SET_ART_GROUP_DASH_FETCHING =
  '@newtash/react-app/SET_ART_GROUP_DASH_FETCHING';
export const SET_ART_GROUP_DASH_FILTER_TEXT =
  '@newtash/react-app/SET_ART_GROUP_DASH_FILTER_TEXT';

export const fetchArtGroups = () => ({
  type: FETCH_ART_GROUPS,
});

export const setArtGroupsData = groups => ({
  type: SET_ART_GROUPS,
  payload: groups,
});

export const setArtGroupsVersion = version => ({
  type: SET_ART_GROUPS_VERSION,
  payload: parseInt(version, 10),
});

export const setArtGroupDashVArtikl = vArtikl => ({
  type: SET_ART_GROUP_DASH_V_ARTIKL,
  payload: vArtikl,
});

export const setArtGroupDashFetching = fetching => ({
  type: SET_ART_GROUP_DASH_FETCHING,
  payload: fetching,
});

export const setArtGroupDashFilterText = filterText => ({
  type: SET_ART_GROUP_DASH_FILTER_TEXT,
  payload: filterText,
});

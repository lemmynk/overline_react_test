export const FETCH_ART_GROUPS = '@newtash/react-app/FETCH_ART_GROUPS';
export const SET_ART_GROUPS = '@newtash/react-app/SET_ART_GROUPS';
export const SET_ART_GROUPS_VERSION =
  '@newtash/react-app/SET_ART_GROUPS_VERSION';

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

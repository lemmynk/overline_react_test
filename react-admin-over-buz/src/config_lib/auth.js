const authApiUrl = process.env.REACT_APP_AUTH_URL;

export default {
  enabled: true, // AppTemplate
  authApiLoginUrl: `${authApiUrl}/login`,
};

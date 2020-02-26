const { REACT_APP_RESPONSE_STATUS_UNPROCESSABLE_ENTITY } = process.env;

export default () => {
  const error422 = parseInt(
    REACT_APP_RESPONSE_STATUS_UNPROCESSABLE_ENTITY || '422',
    10,
  );
  return {
    error422,
  };
};

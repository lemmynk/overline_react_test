// @flow
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

type Props = {
  doLogout: () => void,
};

const LogoutPage = (props: Props) => {
  const { doLogout } = props;

  useEffect(() => {
    if (doLogout) {
      doLogout();
    }
  }, [doLogout]);

  return <Redirect to="/" />;
};

export default LogoutPage;

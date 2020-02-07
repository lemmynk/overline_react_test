// @flow
import React, { useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

type Props = {
  history: ReactRouterHistory,
  isAuthenticated: boolean,
  redirectUrl: string,
  doAuthentication: string => void,
};

const CallbackComponent = (props: Props) => {
  const { history, isAuthenticated, redirectUrl, doAuthentication } = props;
  const { location } = history || {};

  useEffect(() => {
    const { hash } = location;
    // Strip-out the code
    let code = decodeURIComponent(hash);
    if (code.indexOf('code=') > -1) {
      code = code.substring(code.indexOf('code') + 5);

      if (code.indexOf('?') > -1) {
        code = code.substring(0, code.indexOf('&'));
      }
    }

    doAuthentication(code);
  }, [location, doAuthentication]);

  if (!isAuthenticated) {
    return <div>...loading...</div>;
    // return <Loader size="48px" />;
  }
  return <Redirect to={redirectUrl || '/'} />;
};

export default withRouter(CallbackComponent);

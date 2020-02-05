// @flow
// https://codepen.io/robinselmer/pen/vJjbOZ
import React, { useCallback } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './WhoopsPage.module.scss';

type Props = {
  errorCode: number,
  description: string,
  history: ReactRouterHistory,
};

const WhoopsComponent = (props: Props) => {
  const { errorCode, description, history } = props;

  const [t] = useTranslation('core');

  const handleGoBack = useCallback(
    (e: SyntheticMouseEvent<HTMLElement>) => {
      e.preventDefault();
      history.goBack();
    },
    [history],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} />
      <div className={styles.terminal}>
        <h1>
          <span>{`${t('whoops.Error')} `}</span>
          <span className={styles.errorCode}>{errorCode}</span>
        </h1>
        <p className={styles.output}>{description}</p>
        <p className={styles.output}>
          {t('whoops.line2')}
          <Link to="/" className={styles.link} onClick={handleGoBack}>
            {t('whoops.backTitle')}
          </Link>
          {` ${t('whoops.or')} `}
          <Link to="/" className={styles.link}>
            {t('whoops.homeTitle')}
          </Link>
        </p>
        <p className={styles.output}>{t('whoops.line3')}</p>
      </div>
    </div>
  );
};

export default withRouter(WhoopsComponent);

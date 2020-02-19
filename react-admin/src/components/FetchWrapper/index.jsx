// @flow
import React, { type Node } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import { FETCH_STATUS_FETCHING, FETCH_STATUS_FAILED } from '../../config';
import styles from './FetchWrapper.module.scss';

type Props = {
  fetching: string,
  children: Node,
  renderOnFailed?: () => Node,
};

const FetchWrapper = (props: Props) => {
  const { fetching, children, renderOnFailed } = props;

  if (!fetching || fetching === FETCH_STATUS_FETCHING) {
    return (
      <div className={styles.spinnerWrapper}>
        <LoadingSpinner />
      </div>
    );
  }

  if (fetching === FETCH_STATUS_FAILED && renderOnFailed) {
    return <div className={styles.failedWrapper}>{renderOnFailed()}</div>;
  }

  return <div className={styles.fetchWrapper}>{children}</div>;
};

FetchWrapper.defaultProps = {
  renderOnFailed: undefined,
};

export default FetchWrapper;

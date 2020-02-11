// @flow
import React from 'react';
import classNames from 'classnames';
import Button from '@newtash/core/Button';
import { rand } from '@newtash/core/utils';
import styles from './FormErrorsBox.module.scss';

type Props = {
  errors: Object,
  onClear: () => void,
};

export default (props: Props) => {
  const { errors, onClear } = props;
  const hasErrors = errors && Object.keys(errors).length > 0;

  return (
    <div
      className={classNames({
        [styles.errorsBox]: true,
        [styles.hasErrors]: hasErrors,
      })}
    >
      <div className={styles.closeButtonArea}>
        <Button compact icon="times" onClick={onClear} />
      </div>
      {hasErrors &&
        Object.keys(errors).map(key => (
          <dl key={rand()}>
            <dt>{key}</dt>
            <dd>
              {errors[key].map(error => (
                <div className={styles.errorLine} key={rand()}>
                  {typeof error === 'object'
                    ? JSON.stringify(error, null, 2)
                    : error}
                </div>
              ))}
            </dd>
          </dl>
        ))}
    </div>
  );
};

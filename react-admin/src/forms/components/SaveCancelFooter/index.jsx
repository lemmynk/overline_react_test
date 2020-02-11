// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@newtash/core/Button';
import SpinningIcon from '@newtash/core/SpinningIcon';
import styles from '../FormComponents.module.scss';

type Props = {
  fetching: boolean,
  onCancel: () => void,
  onSave: () => void,
};

export default (props: Props) => {
  const { fetching, onCancel, onSave } = props;

  const [t] = useTranslation('forms');

  return (
    <div className={styles.saveCancelFooter}>
      {fetching && (
        <Button primary compact disabled onClick={() => {}}>
          <SpinningIcon />
        </Button>
      )}
      {!fetching && (
        <Button primary compact text={t('Save')} onClick={onSave} />
      )}
      <Button danger compact text={t('Cancel')} onClick={onCancel} />
    </div>
  );
};

// @flow
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Button from '@newtash/core/Button';
import SpinningIcon from '@newtash/core/SpinningIcon';
import Confirm from '@newtash/core/Confirm';
import { rand } from '@newtash/core/utils';
import styles from './CrudActionsRow.module.scss';

type Props = {
  titleConfirm: string,
  textConfirmBody: string,
  textDelete: string,
  textSave: string,
  textCancel: string,
  textConfirm: string,
  textDismiss: string,
  withDelete?: boolean,
  compact?: boolean,
  borderless?: boolean,
  isSaved?: boolean,
  fetching?: boolean,
  onDelete: any => void,
  onSave: () => void,
  onCancel: () => void,
};

const Row = (props: Props) => {
  const {
    titleConfirm,
    textConfirmBody,
    textDelete,
    textSave,
    textCancel,
    textConfirm,
    textDismiss,
    withDelete,
    compact,
    borderless,
    isSaved,
    fetching,
    onDelete,
    onSave,
    onCancel,
  } = props;

  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const handleDeleteButtonClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmButtonClick = () => {
    setConfirmOpen(false);
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <>
      <div
        className={classNames({
          [styles.row]: true,
          [styles.borderless]: !!borderless,
        })}
      >
        <div className={styles.deleteArea}>
          {!!withDelete && (
            <Button
              compact={compact}
              disabled={fetching}
              danger
              text={textDelete}
              onClick={handleDeleteButtonClick}
            />
          )}
        </div>
        <div className={styles.crudArea}>
          {isSaved && (
            <div className={styles.savedArea}>
              <FontAwesomeIcon icon="check" />
            </div>
          )}
          {fetching && (
            <Button compact={compact} primary disabled onClick={() => {}}>
              <SpinningIcon />
            </Button>
          )}
          {!fetching && (
            <Button
              compact={compact}
              primary
              text={textSave}
              onClick={onSave}
            />
          )}
          <Button
            compact={compact}
            disabled={fetching}
            secondary
            text={textCancel}
            onClick={onCancel}
          />
        </div>
      </div>
      {!!withDelete && (
        <Confirm
          isOpen={isConfirmOpen}
          title={titleConfirm}
          textConfirm={textConfirm}
          textCancel={textDismiss}
          onConfirm={handleConfirmButtonClick}
          onDismiss={() => setConfirmOpen(false)}
        >
          <div className={styles.confirmBody}>
            {textConfirmBody &&
              textConfirmBody.split('|').map(str => <p key={rand()}>{str}</p>)}
          </div>
        </Confirm>
      )}
    </>
  );
};

Row.defaultProps = {
  withDelete: false,
  borderless: false,
  compact: false,
  isSaved: false,
  fetching: false,
};

export default Row;

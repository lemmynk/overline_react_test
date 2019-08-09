// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FlexRow, Button } from '@newtash/react-app-core';

type Props = {
  onSave: () => void,
  onCancel: () => void,
};

const StyledButton = styled(Button)`
  margin-left: ${({ theme }) => theme.size.spacer25};
`;

const FormSaveCancelRow = (props: Props) => {
  const { onSave, onCancel } = props;

  const [t] = useTranslation('common');

  return (
    <FlexRow align="flex-end">
      <StyledButton primary text={t('Save')} onClick={onSave} />
      <StyledButton text={t('Cancel')} onClick={onCancel} />
    </FlexRow>
  );
};

export default FormSaveCancelRow;

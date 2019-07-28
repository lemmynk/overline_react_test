// @flow
import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@newtash/react-app-core';

type Props = {
  onEditClick: () => void,
  onDeleteClick: () => void,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledButton = styled(IconButton)`
  margin-right: ${({ theme }) => theme.size.spacer25};
`;

const TableRowEditDeleteActions = (props: Props) => {
  const { onEditClick, onDeleteClick } = props;
  return (
    <Wrapper>
      <StyledButton primary icon="edit" onClick={onEditClick} />
      <StyledButton danger icon="trash" onClick={onDeleteClick} />
    </Wrapper>
  );
};

export default TableRowEditDeleteActions;

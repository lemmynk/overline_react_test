// @flow
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Form from '../Form';

type Props = {
  match: ReactRouterMatch,
  history: ReactRouterHistory,
  fetchArtMainFormData: number => void,
};

const EditForm = (props: Props) => {
  const { match, history, fetchArtMainFormData } = props;
  const { artId } = match.params;

  useEffect(() => {
    if (artId && fetchArtMainFormData) {
      fetchArtMainFormData(parseInt(artId, 10));
    }
  }, []);

  return <Form title="artForm.editTitle" onCancel={() => history.goBack()} />;
};

export default withRouter(EditForm);

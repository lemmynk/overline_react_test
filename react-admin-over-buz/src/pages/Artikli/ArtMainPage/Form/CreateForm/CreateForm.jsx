// @flow
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Form from '../Form';

type Props = {
  match: ReactRouterMatch,
  history: ReactRouterHistory,
  defaultPdv: ArtPdvProps,
  getConfigValue: string => any,
  setArtMainFormData: any => void,
};

const CreateForm = (props: Props) => {
  const {
    match,
    history,
    defaultPdv,
    getConfigValue,
    setArtMainFormData,
  } = props;

  useEffect(() => {
    const mera = getConfigValue('ART_FORM_DEFAULT_MERA');
    const pdvId = defaultPdv.id;

    const formData = { ...match.params, mera, pdvId };
    if (setArtMainFormData) {
      setArtMainFormData(formData);
    }
  }, []);

  return <Form title="artForm.createTitle" onCancel={() => history.goBack()} />;
};

export default withRouter(CreateForm);

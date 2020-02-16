// @flow
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@newtash/core/Button';
import { ART_MAIN_CRUD_URL } from '../../config';

type Props = {
  data: Data,
  fetchFormData: Object => void,
};

const Form = (props: Props) => {
  const { data, fetchFormData } = props;

  const history = useHistory();
  const { action, id } = useParams();

  useEffect(() => {
    if (id && fetchFormData) {
      fetchFormData({
        url: [ART_MAIN_CRUD_URL, id].join('/'),
      });
    }
  }, [id, fetchFormData]);

  const handleBackButtonClick = () => {
    history.goBack();
  };

  return (
    <div>
      <Button primary text="Back" onClick={handleBackButtonClick} />
      <div>...art form..</div>
      <pre>{JSON.stringify({ history, action, data }, null, 2)}</pre>
    </div>
  );
};

export default Form;

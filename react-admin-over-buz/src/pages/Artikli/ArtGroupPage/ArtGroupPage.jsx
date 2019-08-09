// @flow
import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Page,
  PageHeader,
  PageContent,
  PrimaryButton,
  Modal,
} from '@newtash/react-app-core';
import Dashboard from './Dashboard';
import Form from './Form';

type Props = {
  vArtikl: string,
  setVArtikl: string => void,
  doSave: ArtGroupFormDataProps => void,
  doDelete: number => void,
};

const ArtGroupPage = (props: Props) => {
  const { vArtikl, setVArtikl, doSave, doDelete } = props;
  const { t } = useTranslation('art');

  const initialState: ArtGroupFormDataProps = {
    id: 0,
    vArtikl,
    grpNaziv: '',
    grpSifra: '',
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<ArtGroupFormDataProps>(initialState);

  const handleCreateButtonClick = useCallback(() => {
    setFormData(initialState);
    setIsFormOpen(true);
  }, []);

  const handleEditButtonClick = useCallback((item: ArtGroupListItemProps) => {
    setFormData(item);
    setIsFormOpen(true);
  }, []);

  const handleDeleteButtonClick = useCallback((id: number) => {
    if (doDelete) {
      doDelete(id);
    }
  }, []);

  const handleSaveArtGroup = (newFormData: ArtGroupFormDataProps) => {
    setIsFormOpen(false);
    if (doSave) {
      doSave(newFormData);
    }
  };

  const renderHeaderButtons = useCallback(() => (
    <PrimaryButton
      text={t('artGroup.createButtonTitle')}
      onClick={handleCreateButtonClick}
    />
  ));

  return (
    <Page>
      <PageHeader
        title={t('artGroup.dahboardTitle')}
        renderButtons={renderHeaderButtons}
      />
      <PageContent>
        <Dashboard
          vArtikl={vArtikl}
          setVArtikl={setVArtikl}
          onEdit={handleEditButtonClick}
          onDelete={handleDeleteButtonClick}
        />
      </PageContent>
      <Modal isOpen={isFormOpen} onDismiss={() => setIsFormOpen(false)}>
        <Form
          data={formData}
          onSave={handleSaveArtGroup}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>
    </Page>
  );
};

export default ArtGroupPage;

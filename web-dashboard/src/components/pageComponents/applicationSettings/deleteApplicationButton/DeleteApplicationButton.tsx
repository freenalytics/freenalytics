import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import ButtonWithConfirmation from '../../../common/buttonWithConfirmation';
import useLocale from '../../../../hooks/locale';
import useApi from '../../../../hooks/api';
import { PROTECTED_ROUTES } from '../../../../constants/routes';

interface Props {
  domain: string
}

const DeleteApplicationButton: React.FC<Props> = ({ domain }) => {
  const { t } = useLocale();
  const navigate = useNavigate();
  const { client, queryClient } = useApi();
  const request = client.application.deleteApplicationByDomain(domain);
  const deleteMutation = useMutation(request.key, request.fn);

  const handleConfirm = async () => {
    await deleteMutation.mutateAsync();
    await queryClient.invalidateQueries(client.application.getApplications().key);
    navigate(PROTECTED_ROUTES.applications);
  };

  return (
    <ButtonWithConfirmation
      buttonLabel={t('pages.application.settings.danger.delete.button.label')}
      buttonColor="danger"
      modalHeader={t('pages.application.settings.danger.delete.modal.header.text')}
      modalDescription={t('pages.application.settings.danger.delete.modal.description.text')}
      confirmLabel={t('pages.application.settings.danger.delete.modal.buttons.confirm.label')}
      cancelLabel={t('pages.application.settings.danger.delete.modal.buttons.cancel.label')}
      onConfirm={handleConfirm}
      loading={deleteMutation.isLoading}
    />
  );
};

export default DeleteApplicationButton;

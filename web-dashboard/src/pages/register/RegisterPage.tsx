import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Content } from 'react-bulma-components';
import Loading from '../../components/common/loading';
import RequestErrorMessageFullPage from '../../components/common/requestErrorMessageFullPage';
import RegistrationDisabled from '../../components/pageComponents/register/registrationDisabled';
import RegisterForm from '../../components/forms/registerForm';
import useAuth from '../../hooks/auth';
import useApi from '../../hooks/api';
import { PROTECTED_ROUTES } from '../../constants/routes';

const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const { client } = useApi();
  const request = client.auth.getRegistrationOpen();
  const { isLoading, error, data } = useQuery(request.key, request.fn);

  if (loggedIn) {
    return (
      <Navigate to={PROTECTED_ROUTES.applications} replace />
    );
  }

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <RequestErrorMessageFullPage error={error as Error} />
    );
  }

  return (
    <Content className="register-page">
      {
        !data?.open ?
          <RegistrationDisabled /> :
          <RegisterForm />
      }
    </Content>
  );
};

export default RegisterPage;

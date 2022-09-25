import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Content } from 'react-bulma-components';
import Loading from '../../components/common/loading';
import RequestErrorMessageFullPage from '../../components/common/requestErrorMessageFullPage';
import PostRegistration from '../../components/pageComponents/register/postRegistration';
import RegistrationDisabled from '../../components/pageComponents/register/registrationDisabled';
import RegisterForm from '../../components/forms/registerForm';
import useTitle from '../../hooks/title';
import useAuth from '../../hooks/auth';
import useApi from '../../hooks/api';
import { PROTECTED_ROUTES } from '../../constants/routes';

const RegisterPage: React.FC = () => {
  useTitle('pages.register.title');
  const { loggedIn } = useAuth();
  const { client } = useApi();
  const request = client.auth.getRegistrationOpen();
  const { isLoading, error, data } = useQuery(request.key, request.fn);
  const [registrationComplete, setRegistrationComplete] = useState<boolean>(false);

  const handleRegistrationComplete = () => {
    setRegistrationComplete(true);
  };

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
        !registrationComplete ?
          !data?.open ?
            <RegistrationDisabled /> :
            <RegisterForm onRegistrationComplete={handleRegistrationComplete} /> :
          <PostRegistration />
      }
    </Content>
  );
};

export default RegisterPage;

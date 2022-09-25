import React from 'react';
import { Navigate } from 'react-router-dom';
import { Content } from 'react-bulma-components';
import LoginForm from '../../components/forms/loginForm';
import useAuth from '../../hooks/auth';
import { PROTECTED_ROUTES } from '../../constants/routes';

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return (
      <Navigate to={PROTECTED_ROUTES.applications} replace />
    );
  }

  return (
    <Content className="login-page">
      <LoginForm />
    </Content>
  );
};

export default LoginPage;

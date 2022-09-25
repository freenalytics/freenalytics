import React from 'react';
import { Navigate } from 'react-router-dom';
import { Content } from 'react-bulma-components';
import LoginForm from '../../components/forms/loginForm';
import useTitle from '../../hooks/title';
import useAuth from '../../hooks/auth';
import { PROTECTED_ROUTES } from '../../constants/routes';

const LoginPage: React.FC = () => {
  useTitle('pages.login.title');
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

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Content } from 'react-bulma-components';
import LoginForm from '../../components/forms/loginForm';
import useAuth from '../../hooks/auth';
import { PROTECTED_ROUTES } from '../../constants/routes';

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  if (loggedIn) {
    navigate(PROTECTED_ROUTES.applications, { replace: true });
  }

  return (
    <Content className="login-page">
      <LoginForm />
    </Content>
  );
};

export default LoginPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Content } from 'react-bulma-components';
import RegisterForm from '../../components/forms/registerForm';
import useAuth from '../../hooks/auth';
import { PROTECTED_ROUTES } from '../../constants/routes';

const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  if (loggedIn) {
    navigate(PROTECTED_ROUTES.applications, { replace: true });
  }

  return (
    <Content className="register-page">
      <RegisterForm />
    </Content>
  );
};

export default RegisterPage;

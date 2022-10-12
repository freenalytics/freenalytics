import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAuth from '../hooks/auth';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import ApplicationsPage from '../pages/applications';
import ApplicationDashboardPage from '../pages/applicationDashboard';
import NotFoundPage from '../pages/notFound';
import { PUBLIC_ROUTES, PROTECTED_ROUTES, DYNAMIC_PROTECTED_ROUTES } from '../constants/routes';

const Router: React.FC = () => {
  const { loggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={PUBLIC_ROUTES.login} element={<LoginPage />} />
        <Route path={PUBLIC_ROUTES.register} element={<RegisterPage />} />

        <Route element={<ProtectedRoute allowed={loggedIn} redirectPath={PUBLIC_ROUTES.login} />}>
          <Route path={PROTECTED_ROUTES.applications} element={<ApplicationsPage />} />
          <Route path={DYNAMIC_PROTECTED_ROUTES.applicationDashboard(':domain')} element={<ApplicationDashboardPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import React, { ReactElement } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

interface Props {
  allowed: boolean
  redirectPath: string
  children?: ReactElement
}

const ProtectedRoute: React.FC<Props> = ({ allowed, redirectPath, children }) => {
  if (!allowed) {
    return (
      <Navigate to={redirectPath} replace />
    );
  }

  if (children) {
    return children;
  }

  return (
    <Outlet />
  );
};

export default ProtectedRoute;

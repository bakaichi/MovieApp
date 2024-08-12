import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/authContext';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;

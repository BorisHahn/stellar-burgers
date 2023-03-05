import { React } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute({ loggedIn, navigateTo }) {
  return loggedIn ? <Outlet /> : <Navigate to={navigateTo} />;
}

export default ProtectedRoute;

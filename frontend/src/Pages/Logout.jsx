import React, { useEffect } from 'react';
import { useAuth } from '../Store/auth';

function Logout() {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    LogoutUser();
    window.location.href = '/login';
  }, [LogoutUser]);

  return <div>Logging out...</div>;
}

export default Logout;

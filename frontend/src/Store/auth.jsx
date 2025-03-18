import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState('');
  const authorization = `Bearer ${token}`;
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState();

  const storeToken = (token) => {
    setToken(token);
    return localStorage.setItem('token', token);
  };

  const isLoggedIN = !!token;

  // Logout User
  const LogoutUser = () => {
    setToken('');
    return localStorage.removeItem('token');
  };

  // currently logged in user

  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:4001/api/auth/user', {
        method: 'GET',
        headers: {
          Authorization: authorization
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setAdmin(data.isAdmin);
        setIsLoading(false);
      } else {
        console.log('load');
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error fetching user data');
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIN,
        storeToken,
        LogoutUser,
        user,
        authorization,
        isLoading,
        admin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error('UseAuth used outside of the provider');
  }
  return authContextValue;
};

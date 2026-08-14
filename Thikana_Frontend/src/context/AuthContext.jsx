import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('thikana_token'));
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('thikana_user') || 'null'),
  );

  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Unable to sign in');
    localStorage.setItem('thikana_token', data.token);
    setToken(data.token);
  };

  const register = async (form) => {
    const response = await fetch(`${API_URL}/auth/register-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Unable to create your account');
    return data;
  };

  const updateUser = (nextUser) => {
    localStorage.setItem('thikana_user', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem('thikana_token');
    localStorage.removeItem('thikana_user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ token, user, login, register, logout, updateUser, apiUrl: API_URL }),
    [token, user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

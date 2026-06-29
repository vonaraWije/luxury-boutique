import { createContext, useContext, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('luxuryUser') || 'null'));

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('luxuryUser', JSON.stringify(data));
    setUser(data);
    toast.success(`Welcome back, ${data.name}`);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('luxuryUser', JSON.stringify(data));
    setUser(data);
    toast.success(`Welcome to LUMIÈRE, ${data.name}`);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('luxuryUser');
    setUser(null);
    toast.success('You have been signed out');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState } from 'react';
import { DEMO_OFFICER } from '../services/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [officer, setOfficer] = useState(() => {
    const saved = localStorage.getItem('drugtest_officer');
    return saved ? JSON.parse(saved) : null; // Defaults to null so user starts at /login screen
  });

  const login = (officerId, unit, pin) => {
    const user = {
      officerId: officerId || DEMO_OFFICER.officerId,
      name: officerId === DEMO_OFFICER.officerId ? DEMO_OFFICER.name : `Officer (${officerId})`,
      unit: unit || DEMO_OFFICER.unit,
      pin: pin || "1234",
      role: "Field Testing Officer",
      department: "Narcotics Control Bureau",
      loggedInAt: new Date().toISOString()
    };
    setOfficer(user);
    localStorage.setItem('drugtest_officer', JSON.stringify(user));
    return true;
  };

  const logout = () => {
    setOfficer(null);
    localStorage.removeItem('drugtest_officer');
  };

  return (
    <AuthContext.Provider value={{ officer, login, logout, isAuthenticated: !!officer }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

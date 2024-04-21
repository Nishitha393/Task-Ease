import React, { createContext, useState, ReactNode } from 'react';

type AuthContextType = {
  user: any;
  signIn: () => void;
  signUp: () => void;
  signOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {}
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const signIn = () => {
    // Implement your sign-in logic here
    setUser({ name: 'User' });
  };

  const signUp = () => {
    // Implement your sign-up logic here
    setUser({ name: 'User' });
  };

  const signOut = () => {
    // Implement your sign-out logic here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

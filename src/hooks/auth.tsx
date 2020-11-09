import React, { useState, createContext, useEffect } from 'react'
import firebase from '../services/firebase'

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: firebase.User | null;
  authenticated: boolean;
  setUser: any;
  loadingAuthState: boolean;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }: any) => {

  const [user, setUser] = useState(null as firebase.User | null)

  const [loadingAuthState, setLoadingAuthState] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      setUser(user);
      setLoadingAuthState(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, authenticated: user !== null, setUser, loadingAuthState }}>
      {children}
    </AuthContext.Provider>
  )
}

// export function useAuth(): AuthContextData {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }

//   return context
// }

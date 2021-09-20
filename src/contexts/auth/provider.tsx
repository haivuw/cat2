
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth';
import init from "services/firebase";

type AuthValue = {
  user: User,
  login: (email: string, password: string) => void;
  logout: () => void
}

const Context = createContext<AuthValue>(null)

export const useAuth = () => useContext(Context)

init();

const auth = getAuth();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user))
  }, [])

  const login: AuthValue['login'] = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user)
  }

  const logout: AuthValue['logout'] = async () => {
    await signOut(auth)
    setUser(null)
  }

  return <Context.Provider value={{user, login, logout}}>{children}</Context.Provider>
}

export default AuthProvider
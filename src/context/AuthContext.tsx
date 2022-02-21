import { createContext, ReactNode, useEffect, useState } from "react";

import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithEmail: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, email } = user;
        setUser({
          id: uid,
          email: `${email}`,
        });
      }
    });
    return () => {
      unsub();
    };
  }, []);

  async function signInWithEmail() {
    const provider = new firebase.auth.EmailAuthProvider();
    const result = await auth.signInWithPopup(provider);
    if (result.user) {
      const { email, uid } = result.user;
      setUser({
        id: uid,
        email: `${email}`,
      });
    }
  }
  return (
    <AuthContext.Provider value={{ user, signInWithEmail }}>
      {props.children}
    </AuthContext.Provider>
  );
}

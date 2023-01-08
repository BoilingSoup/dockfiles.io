import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

const AuthContext = createContext<{ user: User; setUser: Dispatch<SetStateAction<User>> } | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

type Props = {
  children: JSX.Element;
  user: User;
};

export type User = null | {
  id: number;
  name: string;
  avatar: string | null;
  is_admin: boolean;
  /** Empty string if not verified, ISO string if verified. */
  email_verified_at: string;
};

export const AuthProvider = ({ children, user: ssrUser }: Props) => {
  const [user, setUser] = useState<User>(ssrUser);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

// AppContextProvider.tsx
import React, { createContext, useEffect, useState, ReactNode } from "react";
import { specialtiesData } from "../assets/assets";

type User = { id?: string; name?: string; email?: string } | null;
export type Specialty = { id: string; name: string };

type AppContextType = {
  user: User;
  setUser: (u: User) => void;
  doctor: boolean;
  setDoctor: (v: boolean) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
  healthSpecialties: Specialty[];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);
  const [doctor, setDoctor] = useState<boolean>(true);
  const [healthSpecialties, setHealthSpecialties] = useState<Specialty[]>([]);

  useEffect(() => {
    setHealthSpecialties(specialtiesData as Specialty[]);
  }, []);

  const value: AppContextType = {
    user,
    setUser,
    doctor,
    setDoctor,
    loading,
    setLoading,
    healthSpecialties,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppContextProvider");
  return ctx;
}

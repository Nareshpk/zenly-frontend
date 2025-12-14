import React, { createContext, useContext, useEffect, useState } from 'react'
import { specialtiesData } from '../assets/assets';
type User = { id?: string; name?: string; email?: string } | null;
export type Specialty = { id: string; name: string };

type DataContextType = {
  user: User;
  setUser: (u: User) => void;
  doctor: boolean;
  setDoctor: (v: boolean) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
  docId: any; setDocId: (v: any) => void;
  healthSpecialties: Specialty[];
}
const DataContext = createContext<DataContextType | null>(null)
interface props {
  children: any
}

const DataProvider = ({ children }: props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);
  const [docId, setDocId] = useState<any>(null);
  const [doctor, setDoctor] = useState<boolean>(true);
  const [healthSpecialties, setHealthSpecialties] = useState<Specialty[]>([]);
  useEffect(() => {
    setHealthSpecialties(specialtiesData as Specialty[]);
  }, []);
  return (
    <div>
      <DataContext.Provider
        value={{
          user,
          setUser,
          doctor,
          setDoctor,
          loading,
          setLoading,
          docId, setDocId,
          healthSpecialties,

        }}
      >
        {children}
      </DataContext.Provider>
    </div>
  )
}
export default DataProvider
export const useData = () => useContext(DataContext)
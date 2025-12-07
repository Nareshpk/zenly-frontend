import React, { createContext, useContext, useState } from 'react'
type DataContextType = {
  data: any
  setData: React.Dispatch<any>
}
const DataContext = createContext<DataContextType | null>(null)
interface props {
  children: any
}

const DataProvider = ({ children }: props) => {
     const [data, setData] = useState<any>(null)
       return (
    <div>
      <DataContext.Provider
        value={{
          data,
          setData,

        }}
      >
        {children}
      </DataContext.Provider>
    </div>
  )
}
export default DataProvider
export const useData = () => useContext(DataContext)
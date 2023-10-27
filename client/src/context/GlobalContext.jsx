import { createContext, useReducer, useEffect, useContext, useState } from 'react'

export const GlobalContext = createContext()


export const GlobalContextProvider = ({ children }) => {
    const [filter,setFilter] = useState({"priority":"","completed":null});
    const [sidebar,setSidebar] = useState(false);
    const [layout,setLayout] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState()


    return (
        <GlobalContext.Provider value={{filter,setFilter,sidebar,setSidebar,tasks, setTasks,layout,setLayout,users, setUsers}}>
            {children}
        </GlobalContext.Provider>
    )

}
export const useGlobalContext = () => {
    const context = useContext(GlobalContext)
  
    if(!context) {
      throw Error('useAuthContext must be used inside an AuthContextProvider')
    }
  
    return context
}
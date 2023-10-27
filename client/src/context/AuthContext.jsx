import { createContext, useReducer, useEffect, useContext, useState } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    const [isValid,setIsValid] = useState(false)


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
        else{
            dispatch({type:'LOGOUT'})
        }

    }, [])


    return (
        <AuthContext.Provider value={{ ...state, dispatch,isValid,setIsValid }}>
            {children}
        </AuthContext.Provider>
    )

}
export const useAuthContext = () => {
    const context = useContext(AuthContext)
  
    if(!context) {
      throw Error('useAuthContext must be used inside an AuthContextProvider')
    }
  
    return context
}
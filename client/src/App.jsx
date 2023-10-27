import { useAuthContext } from "./context/AuthContext"
import { useEffect, useState } from "react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import axios from "axios"
import Register from "./pages/Register"
import { useSocket } from "./context/SocketContext"
function App() {

    const {user,dispatch,isValid,setIsValid} = useAuthContext()
    const socket = useSocket();

    async function verifyUser(){
        try {

            const response = await axios.post('http://localhost:4000/auth/verify', {token: user?.token});
            
            if (response.data.value) {
              setIsValid(true)
              socket.emit("joinRoom",user?.token)
            } else {
                setIsValid(false)
            }
          } catch (error) {
            console.error('Error verifying user:', error);
            dispatch({type:"LOGOUT"})
          }
    }
    useEffect(()=>{
        if(user){
            verifyUser()
        }
    },[user])
    return (
        <div className="App ">

            <Routes>
                <Route path={"/"} element={
                    !user?
                    <Navigate to="/login" replace/>
                    :
                    <Home/>
                } />
                <Route path={"/login"} element={
                    user?
                    <Navigate to="/" replace/>
                    :<Login/>
                } />
                <Route path={"/register"} element={
                     user?
                     <Navigate to="/" replace/>
                     :<Register/>
                }/>
            </Routes>

        </div>
    )
}

export default App

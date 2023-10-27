import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { AuthContextProvider, useAuthContext } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import { GlobalContextProvider } from './context/GlobalContext.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalContextProvider>
                    <SocketProvider>
                        <Navbar />
                        <App />
                    </SocketProvider>
                </GlobalContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
)

import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

export default function Navbar() {
    const { user, dispatch, setIsValid } = useAuthContext();
    const {sidebar, setSidebar } = useGlobalContext();
    function handleLogout() {
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
        setIsValid(false)
    }
    return (
        <div className='border-b-zinc-100 border-b-2 h-16 flex items-center '>
            <div className="menu-label md:hidden my-4 ml-3 p-1 rounded-md bg-zinc-100 " onClick={()=>{setSidebar(!sidebar)}}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                </svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
            {/* <div className="vr h-10 mx-1 w-px bg-zinc-300"></div> */}
            <div className="logo flex items-center ml-1 sm:ml-4 ">
                <svg viewBox="0 0 169 144" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-10 md:h-12 lg:h-16 inline '>
                    <path d="M148.329 38.4176L102.594 104.131L68.2703 39.1489L148.329 38.4176Z" fill="#A8FF92" />
                    <path d="M20.0204 106.191L65.7547 40.4777L100.079 105.46L20.0204 106.191Z" fill="#93DD81" />
                </svg>

                <span className='font-light text-zinc-800 text-lg md:text-xl lg:text-2xl tracking-widest'>
                    TaskNest
                </span>
            </div>
            <div className="auth flex items-center ml-auto">
                {
                    user ? (
                        <div className="flex relative">
                            {<div className="avatar rounded-full h-8 w-8 text-md m-2 lg:h-10 lg:w-10 lg:m-4 lg:text-xl flex justify-center items-center bg-blue-200 text-white  ">
                                {user?.name[0]}

                            </div>}
                            <input type="checkbox" name="" id="dropdown" className='peer/dropdown hidden ' />
                            <label htmlFor='dropdown' className=" flex items-center mr-4 rounded hover:bg-zinc-300 h-5 self-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </label>
                            <div className="list absolute z-10 overflow-hidden whitespace-nowrap right-4 -bottom-14 rounded opacity-0 pointer-events-none -translate-y-10 peer-checked/dropdown:opacity-100 peer-checked/dropdown:pointer-events-auto peer-checked/dropdown:translate-y-2 transition-all bg-zinc-100 shadow-lg   ">
                                {user?.name && <div className="name p-1">{user?.name}</div>}
                                <div className="logout cursor-pointer p-1 hover:bg-zinc-300" onClick={handleLogout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-0.5 mb-1 inline">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                    </svg>
                                    <span>logout</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex">
                            <Link to={"/login"} className='border-2 border-zinc-100 flex items-center py-0.5 px-3 rounded-md m-2 hover:bg-zinc-100 text-zinc-600 text-sm font-bold'>Login</Link>
                            <Link to={"/register"} className='border-2 py-0.5 px-3 border-transparent rounded-md m-2 text-sm font-bold text-white bg-green-400 mr-4'>Register</Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

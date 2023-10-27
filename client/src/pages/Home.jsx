import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import Sidebar from '../components/Sidebar';
import TaskList from './TaskList';

export default function Home() {
    const { user }= useAuthContext();

    return (
        <div className='flex'>
            <Sidebar/>
            <TaskList/>
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import EditModal from './EditModal';
import { useGlobalContext } from '../context/GlobalContext';
import { useSocket } from '../context/SocketContext';

export default function Task({ data }) {
    const [deleteQuestion, setDeleteQuestion] = useState(false);
    const { user } = useAuthContext();
    const rocket = useSocket();
    const { tasks, setTasks ,layout,users} = useGlobalContext();
    const [modal, setModal] = useState(false);
    const handleDelete = async () => {
        await axios.delete(`http://localhost:4000/tasks/delete/${data._id}`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        })
            .then((data) => {
                setTasks(tasks.filter((task) => task._id !== data.data._id))
                rocket.emit("deleteTask", data.data)
            })
    }
    useEffect(() => {
        rocket.on('taskDeleted', (data) => {
            setTasks(tasks.filter((task) => task._id !== data._id))
        })
    }, [rocket, tasks])
    const priorityColor = {
        "urgent": "bg-red-500",
        "high": "bg-yellow-500",
        "medium": "bg-blue-500",
        "low": "bg-green-500",
    }
    return (
        <div className="task-wrapper py-2 border-b-zinc-200 mx-4" style={{ borderBottomWidth:!layout? 1:0 }}>
            <EditModal data={data} modal={modal} setModal={setModal} />
            <div className={`flex  bg-zinc-100 h-12 items-center rounded-md overflow-hidden ${layout?" w-64":""}`}>
                <div><div className={`circle h-2 w-2 ml-2 rounded-full ${data.completed?" saturate-0 ":" "}  ${priorityColor[data?.priority]} `} ></div></div>
                <div className={`title bg-transparent px-4 truncate mr-auto ${data.completed?"text-zinc-600 line-through":""}`}>{data.title}</div>
                {data.completed && <div className="completed mx-2 text-zinc-400 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>}
                {users&&<div className="for text-xs">
                    {/* <span >from:&nbsp;</span>{users.reduce(a=>{if (a._id===data.user) return a.name })} */}
                    <span >from:&nbsp;</span>{users.map(a=>{
                        if (a._id===data.user) {
                            return a.name.split(" ")[0]
                        }
                    })}
                </div>}

                <div className="edit p-px rounded-md hover:shadow-lg border-transparent border-2 " onClick={() => { setModal(true) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </div>
                <div className="delete mr-4 ml-1 p-1 rounded-md hover:shadow-lg" >
                    {deleteQuestion ?
                        (<div className="flex items-center">
                            <div className="text-xs mr-2">Delete?</div>
                            <div className="flex items-center relative w-16 rounded h-8 text-sm bg-zinc-300 overflow-hidden ">
                                <div className="h-full font-semibold text-center select-none pt-1 pl-1 w-8 hover:bg-red-500 bg-red-400 text-white" onClick={handleDelete}>yes</div>
                                <div className="h-full font-semibold text-center select-none pt-1 pr-1 w-8 hover:bg-zinc-400 " onClick={() => { setDeleteQuestion(false) }}>no</div>
                            </div>
                        </div>)
                        :
                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-red-500" onClick={() => { setDeleteQuestion(true) }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>)
                    }
                </div>
            </div>
        </div>

    )
}

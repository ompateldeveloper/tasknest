import React, { useEffect, useState } from 'react'
import Task from '../components/Task'
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';
import AddTask from '../components/AddTask';
import { useGlobalContext } from '../context/GlobalContext';
import { useSocket } from '../context/SocketContext';

export default function TaskList() {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext()
    const { filter, tasks,setTasks,layout } = useGlobalContext()
    const socket = useSocket();
    const getTasks = async () => {
        setIsLoading(true)

        await axios.get("/tasks/all", {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        })
            .then((data) => {
                setTasks(data?.data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.warn(error);
                setIsLoading(false)
            })
    }
    useEffect(() => {
        getTasks()
        
    }, [user])

    // useEffect(() => {
    //     console.log(tasks);
    // }, [filter])

    return (
        <div className=' w-full'>
            
            <AddTask/>
            <div className="task-list h-[calc(100vh-192px)] mt-2 overflow-auto justify-center " style={{display:layout?"grid":"block",gridTemplateColumns:"repeat(auto-fit,270px)",gridTemplateRows:"repeat(auto-fill,64px)"}}>
                {
                        (tasks && tasks.length)
                        ?
                        tasks 
                        .filter((task) => {
                            const { priority, completed } = filter;
                            if (priority && completed !== null) {
                              return task.priority === priority && task.completed.toString() === completed;
                            } else if (priority) {
                              return task.priority === priority;
                            } else if (completed !== null) {
                              return task.completed.toString() === completed;
                            } else {
                              return true;
                            }
                        })
                        .map((data) => (
                            <Task data={data} key={data._id} />
                        )).reverse()
                        :
                        (
                            <div className="div flex items-center justify-center h-full w-full ">
                                <span>No Articles</span>
                            </div>
                        )

                }
            </div>
        </div>
    )
}

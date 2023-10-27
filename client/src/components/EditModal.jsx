import axios from "axios";
import { useEffect, useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import { useGlobalContext } from "../context/GlobalContext";
import { useSocket } from "../context/SocketContext";

export default function EditModal({ data, modal, setModal }) {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();
    const { tasks, setTasks } = useGlobalContext();
    const socket = useSocket();
    const [formData, setFormData] = useState({
        title: '',
        priority: 'low',
        completed: false,
    });
    useEffect(() => {
        setFormData({title:data.title,priority:data.priority,completed:data.completed})
    }, [tasks])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await axios.put(`/tasks/update/${data._id}`, formData, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        })
            .then((data) => {
                setModal(false)
                setIsLoading(false)
                const newTasks = tasks.map((task) => (
                    task._id === data.data._id
                        ?
                        data.data
                        :
                        task
                ))
                setTasks(newTasks)
                socket.emit("updateTask",data.data)
            })
            .catch((error) => {
                setIsLoading(false)
            });
        setFormData({
            title: '',
            priority: 'low',
            completed: false,
        });

    }

    useEffect(()=>{

        socket.on('taskUpdated',(data)=>{
            const newTasks = tasks.map((task) => (
                task._id === data._id
                    ?
                    data
                    :
                    task
            ))
            setTasks(newTasks)

        })
    },[socket,tasks])
    return (
        <div className={`modal absolute h-full w-full left-0 top-0 bg-zinc-200 bg-opacity-30 flex items-center justify-center  ${modal ? "opacity-100 pointer-events-auto" : " opacity-0 pointer-events-none"}`}>
            <form action="" className=' my-4 bg-white shadow-md shadow-zinc-300 rounded-md' onSubmit={handleSubmit}>
                <div className="flex items-center justify-between px-4 mt-2">
                    <div className="">Edit Task</div>
                    <div className="close w-min p-1 text-zinc-700 " onClick={() => { setModal(false) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center h-10 m-4 ">

                    <input type="text" className='bg-zinc-100 h-full rounded-s-md w-56 pl-2' placeholder='Add New Task' value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    <button disabled={isLoading} className='bg-green-400 hover:bg-green-500 rounded-e-md h-full pr-4 pl-2 text-white inline-flex items-center font-bold'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span>Update</span>
                    </button>
                </div>

                <select name="" id="" className=' h-10 mx-4 mb-2 rounded-md  px-2 bg-zinc-100 border-l-2' value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low" >Low</option>
                </select>
                <select name="" id="" className='h-10 mx-4 mb-2 rounded-md  px-2 bg-zinc-100 border-l-2' value={formData.completed} onChange={(e) => setFormData({ ...formData, completed: e.target.value })}>
                    <option value={false}> Not completed</option>
                    <option value={true}> Completed</option>
                </select>
            </form>
        </div>
    )
}

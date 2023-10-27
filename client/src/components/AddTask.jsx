import axios from "axios";
import { useEffect, useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import { useGlobalContext } from "../context/GlobalContext";
import { useSocket } from "../context/SocketContext";

export default function AddTask() {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();
    const socket = useSocket();

    const { filter, tasks, setTasks,users, setUsers } = useGlobalContext()
    const [taskFor,setTaskFor] = useState();
    const [formData, setFormData] = useState({
        title: '',
        priority: 'low',
        completed: false,
    });


    const fetchUsers = async () => {
        if (!user) return
        try {
            await axios.get("http://localhost:4000/users", {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            })
                .then((data) => {
                    setUsers(data.data)
                })
                .catch(() => {
                    console.log("error fetching users ");
                })
        }
        catch {

        }
    }
    useEffect(() => {
        fetchUsers();
    }, [user])
    useEffect(() => {
        console.log(taskFor);
    }, [taskFor])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        let body = users?{...formData,user:taskFor}:formData

        await axios.post("http://localhost:4000/tasks/add", body, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        })
            .then((data) => {
                socket.emit('addTask', data.data)
                setTasks([...tasks, data.data])
                setIsLoading(false)
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
    useEffect(() => {
        socket.on("taskAdded", (task) => {
            setTasks([...tasks, task])
        })
    }, [socket, tasks])
    return (
        <div className="nav  shadow-md " >
            <form action="" className=' ' onSubmit={handleSubmit}>
                <div className="flex items-center h-10 m-4">

                    <input type="text" className='bg-zinc-100 h-full rounded-s-md w-full pl-2' placeholder='Add New Task' value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    <button disabled={isLoading} className='bg-green-400 hover:bg-green-500 rounded-e-md h-full pr-4 pl-2 text-white inline-flex items-center font-bold'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span>Add</span>
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

                {users && <select name="" id="" className='h-10 mx-4 mb-2 rounded-md  px-2 bg-zinc-100 border-l-2' onChange={(e) => {setTaskFor(e.target.value)}}>
                    {/* <option value="admin" >{ "Admin"}</option> */}
                    {
                        users.map((data) => {
                            if (user?.email == data.email) {
                                return (
                                    <option value={data._id} key={data._id}>{data.name + " (You)"}</option>
                                )
                            }
                            return (
                                <option value={data._id} key={data._id} >{data.name}</option>
                            )
                        })

                    }
                </select>}
            </form>

        </div>
    )
}

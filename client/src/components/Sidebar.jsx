import React from 'react'
import { useGlobalContext } from '../context/GlobalContext'

export default function Sidebar() {
    const { filter, setFilter ,sidebar,layout,setLayout} = useGlobalContext();
    return (
        <div className={`sidebar h-[calc(100vh-65px)] z-20  w-64 border-r-zinc-100 border-r-2 bg-white fixed  shadow-lg md:static md:shadow-none duration-200 transform-gpu ${sidebar?"left-0":"-left-full"}`}>
            <div >
                <input type="radio" name="priority" id="all" className='hidden peer' checked={filter.priority === "" && filter.completed == null} onChange={(e) => setFilter({ "completed":null, "priority":"" })} />
                <label htmlFor="all" className='flex items-center m-2 rounded-md peer-checked:bg-zinc-200 p-2 select-none'>All</label>
            </div>
            <div className="text-lg mx-2 py-2 text-zinc-600 border-b-zinc-100 border-b-2 ">Priority</div>
            <div className="priority-list">
                <div >
                    <input type="radio" name="priority" id="urgent" className='hidden peer' checked={filter.priority === "urgent"} value={"urgent"} onChange={(e) => setFilter({ ...filter, "priority": e.target.value })} />
                    <label htmlFor="urgent" className='flex items-center m-2 rounded-md peer-checked:bg-zinc-200 p-2 select-none'>Urgent</label>
                </div>
                <div >
                    <input type="radio" name="priority" id="high" className='hidden peer' checked={filter.priority === "high"} value={"high"} onChange={(e) => setFilter({ ...filter, "priority": e.target.value })} />
                    <label htmlFor="high" className='flex items-center m-2 rounded-md peer-checked:bg-zinc-200 p-2 select-none'>High</label>
                </div>
                <div >
                    <input type="radio" name="priority" id="medium" className='hidden peer' checked={filter.priority === "medium"} value={"medium"} onChange={(e) => setFilter({ ...filter, "priority": e.target.value })} />
                    <label htmlFor="medium" className='flex items-center m-2 rounded-md peer-checked:bg-zinc-200 p-2 select-none'>Medium</label>
                </div>
                <div >
                    <input type="radio" name="priority" id="low" className='hidden peer' checked={filter.priority === "low"} value={"low"} onChange={(e) => setFilter({ ...filter, "priority": e.target.value })} />
                    <label htmlFor="low" className='flex items-center m-2 rounded-md peer-checked:bg-zinc-200 p-2 select-none'>Low</label>
                </div>
            </div>
            <div className="text-lg mx-2 py-2 text-zinc-600 border-b-zinc-100 border-b-2 ">Status</div>
            <div className="is-completed">
                <div>
                    <input type="radio" name="status" id="completed" className='hidden peer' checked={filter.completed === "true"} value={true} onChange={(e) => setFilter({ ...filter, "completed": e.target.value })} />
                    <label htmlFor="completed" className='flex items-center m-2 rounded-md peer-checked:bg-zinc-200 p-2 select-none'>Completed</label>
                </div>
                <div>
                    <input type="radio" name="status" id="notCompleted" className='hidden peer' checked={filter.completed === "false"} value={false} onChange={(e) => setFilter({ ...filter, "completed": e.target.value })} />
                    <label htmlFor="notCompleted" className='flex items-center m-2 rounded-md peer-checked:bg-zinc-200 p-2 select-none'>Not Completed</label>
                </div>
            </div>
            <div className="layout-button mx-4  inline-flex">
                <input type="checkbox" name="" id="layout" className="hidden peer/layout" onChange={()=>{setLayout(!layout)}} />
                <label htmlFor="layout" className="flex items-center relative w-16 h-8 rounded-md bg-zinc-100 overflow-hidden peer-checked/layout:pl-8 duration-200" >
                    <div className="list absolute left-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </div>
                    <div className="grid absolute right-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                        </svg>

                    </div>
                    <div className="toggle h-full rounded-md w-8 bg-green-400 mix-blend-multiply "></div>
                </label>
            </div>
        </div>
    )
}

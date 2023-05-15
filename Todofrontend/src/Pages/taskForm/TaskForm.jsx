
import "./TaskForm.scss"
import { ToastContainer } from 'react-toastify';

import { taskFromHook } from "../../Hook/taskFromHook";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";


export const TaskForm = () => {

    const loading = useSelector(state => state.tasks.loading)
    // logic from hook page /Hook/taskFromHook
    const [filter, isComplete, deleteTodoItem, todoItemsDB, createTask, setTask, task, updateTask, btnUpdate, btnUpdateFunction, res, isLoading] = taskFromHook()



    return (
        <>
            <Navbar />

            <div className="taskform">
                {isLoading ? <h2>Loading...Just a Free Host that's why request slow</h2> : null}
                <div className="input-task">
                    <input type="text" value={task} onChange={(e) => setTask(e.target.value)} ></input>
                    {btnUpdate ? <button className="btn-taskForm" onClick={(e) => updateTask(e)} >Update</button> : <button className="btn-taskForm" onClick={(e) => createTask(e)} > Add Todo</button>}
                </div>



                {/* buttons status */}
                <div className="btns-status">
                    <button onClick={() => filter('ALL')} >All</button>
                    <button onClick={() => filter(false)}>Active</button>
                    <button onClick={() => filter(true)}>InActive</button>
                </div>



                {/* list of tasks  */}

                <div className="tasks">
                    {loading === false ? todoItemsDB?.length >= 1 ? todoItemsDB?.map((item, index) => {

                        return (
                            <div key={index} index={index} className="task">

                                <div id="colm" onClick={() => isComplete(item?._id, item?.task)} className={`colm1 ${item?.complete ? "checkboxActive" : "checkboxInActive"}`} >
                                    <div className="checkbox" ></div>
                                    <h4>{item.task}</h4>
                                </div>

                                <button className="btn-remove" onClick={() => deleteTodoItem(item._id)}> <i className="fa-solid fa-trash-can"></i></button>
                                <button className="btn-edit" onClick={() => btnUpdateFunction(item._id, item.task)} >edit</button>
                            </div>
                        )
                    }) : <h4>Ther is no tasks</h4> : <h1 style={{ color: "red" }}>Loading</h1>}



                </div>



            </div >
            <ToastContainer />
        </>
    )
}
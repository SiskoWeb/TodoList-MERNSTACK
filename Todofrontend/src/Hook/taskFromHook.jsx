import { useEffect, useState, useCallback } from "react"
import good from '../sounds/good.mp3'
import chick from '../sounds/chick.mp3'

import { editStatus, getTasks, deleteTask, createNewTaks, updateTaskRedux } from '../redux/actions/taskAction'
import { useDispatch, useSelector } from "react-redux";
import notify from "../Hooks/useNotifaction";


export const taskFromHook = () => {

    const [task, setTask] = useState('')

    const [idUpdate, setidUpdate] = useState('')


    const [btnUpdate, setBtnUpdate] = useState(false)
    const [update, setUpdate] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const [todoItemsDB, setTodoItemsDB] = useState([])

    const dispatch = useDispatch()

    const playSound = () => {
        new Audio(chick).play()
    }






    // //get data  using redux

    useEffect(() => {


        dispatch(getTasks())


    }, [update])

    const res = useSelector(state => state.tasks.taskList)
    const lodaing = useSelector(state => state.tasks.loading)


    useEffect(() => {
        // return setTodoItemsDB(res.data.reverse())
        if (res.data) {
            return setTodoItemsDB(res?.data?.reverse())
        }
        else {
            return setTodoItemsDB(todoItemsDB)
        }


    }, [res])

    // filter
    const filter = (name) => {
        if (name === 'ALL') {
            return setTodoItemsDB(res?.data)
        }
        else {
            const newAr = res?.data?.filter((item) => item.complete === name)
            return setTodoItemsDB(newAr)
        }

    }




    const deleteTodoItem = async (id) => {
        setIsLoading(true)
        setUpdate(true)
        await dispatch(deleteTask(id))
        setUpdate(false)
        setIsLoading(false)


    }


    const isComplete = async (id, todo) => {
        const tasko = res.data?.filter((item) => item._id === id)

        if (tasko[0].complete === false) {
            notify(`Good You Complte : ${todo}`, 'success')
            playSound()
        }
        setIsLoading(true)

        setUpdate(true)
        await dispatch(editStatus(id))

        setUpdate(false)
        setIsLoading(false)


    }



    const btnUpdateFunction = async (id, todo) => {
        setBtnUpdate(true)
        setTask(todo)
        setidUpdate(id)


    }
    const updateTask = async () => {



        if (task === '') {
            notify('can create empty task', 'error')

        }
        else {
            setUpdate(true)
            await dispatch(updateTaskRedux(idUpdate, {
                task: task
            }))
            setUpdate(false)
        setIsLoading(true)

            setTask('')
            setBtnUpdate(false)
            notify('Updated', 'success')
        setIsLoading(false)

        }




    }



    const createTask = async (e) => {
        e.preventDefault()

        if (task === '' || task.length <= 2) {
            notify('can create empty task and make short its more then 2 letters', 'error')
            return
        }
        else {
            setUpdate(true)
            setIsLoading(true)

            await dispatch(createNewTaks({
                task: task
            }))
            notify(`${task} is Created`, 'success')
            setUpdate(false)
            setTask('')
            setIsLoading(false)

        }




    }






    return [filter, isComplete, deleteTodoItem, todoItemsDB, createTask, setTask, task, updateTask, btnUpdate, btnUpdateFunction, res, isLoading]
}
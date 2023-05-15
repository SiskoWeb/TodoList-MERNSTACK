import { useEffect, useState } from "react"
import notify from "../Hooks/useNotifaction"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/actions/authAction'
export const LoginHook = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [email, setEmail] = useState()
    const [password, sePassword] = useState()
    const [loading, setLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassowrd = (e) => {
        sePassword(e.target.value)
    }

    const validationValues = () => {

        if (email === '') {
            notify('email required ', 'error')
            return
        }
        if (password === '') {
            notify('passowrd required ', 'error')
            return
        }
        if (password.length <= 4) {
            notify('passowrd Short ', 'error')
            return
        }
    }

    const res = useSelector(state => state.auth.createUser)
    //save data
    const onSubmit = async (e) => {
        e.preventDefault()
        validationValues()
        setIsLoading(true)
        setLoading(true)
        console.log('true lodaing')
        await dispatch(loginUser({
            email: email,
            password: password
        }))
        console.log('false lodaing')
        setIsLoading(false)
        setLoading(false)
 

    }

    useEffect(() => {

        if (loading === false) {
            if (res) {

                console.log('inside res')
                if (res.data.token) {
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("user", JSON.stringify(res.data.data))
                    notify("Accoun Created Successfuly", "success")
                    setTimeout(() => {
                        navigate('/')
                    }, 1200);
                }
                else {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                }


                if (res.data.message === "email or passowrd uncourrect") {
                    notify("email or passowrd uncourrect", "error")
                }
                setLoading(true)
            }
        }
    }, [loading])


    return [email, password, onChangeEmail, onChangePassowrd, onSubmit,isLoading]
}
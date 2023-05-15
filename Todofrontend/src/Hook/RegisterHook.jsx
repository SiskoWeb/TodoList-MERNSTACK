import { useState, useEffect } from "react"
import { createNewUser } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'
import notify from "../Hooks/useNotifaction"
import { useNavigate } from 'react-router-dom'

export const RegisterHook = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState('yassine')
    const [email, setEmail] = useState()
    const [password, sePassword] = useState()
    const [comfirmPass, setComfirmPass] = useState()
    const [loading, setLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePass = (e) => {
        sePassword(e.target.value)
    }
    const onChangeConfirmPass = (e) => {
        setComfirmPass(e.target.value)
    }

    const validationValues = () => {
        if (name === "") {
            notify("Please Add Informations", "error")
            return;
        }

        if (password != comfirmPass) {
            notify("Please confirm passowrd", "error")
            return;
        }

    }

    const res = useSelector(state => state.auth.createUser)
    //save data
    const OnSubmit = async (e) => {
        e.preventDefault()
        validationValues();
        setLoading(true)
        setIsLoading(true)
        await dispatch(createNewUser({
            name,
            email,
            password,
            passwordConfirm: comfirmPass,

        }))
        setLoading(false)
        setIsLoading(false)

    }

    useEffect(() => {



        if (loading === false) {
            if (res) {
                console.log(res)
                console.log('im in res')
                if (res.data.token) {
                    localStorage.setItem("token", res.data.token)
                    notify("Accoun Created Successfuly", "success")
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000);
                }

                if (res.data.errors) {
                    if (res.data.errors[0].msg === "E-mail already in use")
                        notify("E-mail already in use", "error")
                }

                if (res.data.errors) {
                    if (res.data.errors[0].msg === "must be at least 6 chars")
                        notify("must be at least 6 chars", "error")
                }


            }
        }
    }, [loading])


    return [name, email, password, comfirmPass, onChangeName, onChangeEmail, onChangePass, onChangeConfirmPass, OnSubmit,isLoading]
}
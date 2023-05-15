
import './Signup.scss'
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { RegisterHook } from '../../Hook/RegisterHook'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';


export const Signup = () => {


    //logic in RegisterHook Page
    const [name, email, password, comfirmPass, onChangeName, onChangeEmail, onChangePass, onChangeConfirmPass, OnSubmit, isLoading] = RegisterHook();

    console.log(name)


    return (
        <>
            <Navbar />

            <div className="signup">
                {isLoading ? <h2>Loading... </h2> : null}
                <h2>Register</h2>

                <form>
                    <div className='col'>
                        <label htmlFor="name"> Name
                            <input id='name' value={name} onChange={(e) => onChangeName(e)} type='text' placeholder="your name"></input></label>
                        <label htmlFor="name"> Email
                            <input type='email' value={email} onChange={(e) => onChangeEmail(e)} placeholder="test@exampl.com"></input></label>
                    </div>

                    <div className='col'>
                        <label htmlFor="name"> Passowrd
                            <input type='password' value={password} onChange={(e) => onChangePass(e)}></input></label>
                        <label htmlFor="name"> Confirm Passowrd
                            <input type='password' value={comfirmPass} onChange={(e) => onChangeConfirmPass(e)} ></input></label>
                    </div>

                    <button className='btn-signup' onClick={(e) => OnSubmit(e)} >Create Account</button>

                </form>
                <div className='line'>OR</div>
                {<p className='login-btn'> Already have an Account? <span><Link to="/login">login</Link></span></p>}

                <ToastContainer />
            </div>
        </>
    )
}
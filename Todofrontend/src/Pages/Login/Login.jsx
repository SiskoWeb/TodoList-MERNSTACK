
import './Login.scss'
import { ToastContainer } from 'react-toastify';
import { LoginHook } from '../../Hook/LoginHook';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';

export const Login = () => {

    const [email, password, onChangeEmail, onChangePassowrd, onSubmit,isLoading] = LoginHook()
    return (

        <>
            <Navbar />

            <div className="login">
            {isLoading?<h2>Loading...</h2>:null}
                <h2>Login</h2>
                <form onSubmit={(e) => onSubmit(e)}>

                    <input type="email" onChange={(e) => onChangeEmail(e)} value={email} placeholder="test@example.com"></input>

                    <input type="password" onChange={(e) => onChangePassowrd(e)} value={password} placeholder="*******"></input>
                    <input className='btn-login' type="submit"></input>


                </form>
                <div className='line'>OR</div>
                {<p className='register'> Dont Have an Account ? <span><Link to="/signup">Register</Link></span></p>}
                <ToastContainer />
            </div>
        </>
    )

}


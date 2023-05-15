
import { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export const Navbar = () => {
  const navigate = useNavigate();



  const [user, setUser] = useState('')

  const res = useSelector(state => state.auth.createUser)

  useEffect(() => {
    if (localStorage.getItem("user") != null)
      setUser(JSON.parse(localStorage.getItem("user")))
  }, [res])


  const logOut = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")

    setUser('')

    navigate('/login')


  }


  return (
    <>
      <nav>

        <div className="links">
          <Link to="/">Home</Link>
          {user.name != '' ? <h>{user.name}</h> : null}

          {user != '' ? <a onClick={() => logOut()}><i class="fa-solid fa-right-from-bracket"></i></a> : <Link to="/login">login</Link>}

        </div>

      </nav>
    </>
  );


};

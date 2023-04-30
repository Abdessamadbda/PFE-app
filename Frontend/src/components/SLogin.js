import React, { useState } from "react";
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./SLogin.css";

function SLogin() {

  const [values, setValues] = useState({
    email:'',
    password:''
  })
  const navigate = useNavigate();
  function validateForm() {
    return values.email.length > 0 && values.password.length > 0;
  }
axios.defaults.withCredentials = true;
  const handleSubmit =  async (e) =>  {

    e.preventDefault();
    const data = { email: values.email, password: values.password };
    axios.post('http://localhost:8081/Student/Login',data)
    .then(res => {
        if(res.data.Login){

          navigate('/Student/Profile')
        } else{
          alert("No record")
        }
        console.log(res);
    })
    .catch(err => console.log(err));

  }
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value]}))
  }
  return (
    <div className="Login">
      <p className="Title">Login</p>
      <form onSubmit={handleSubmit}>
        <div size="lg" controlId="email">
          <label>Email</label>
          <input  autoFocus type="email" value={values.email} onChange={handleInput} name="email"/>
        </div>

        <div size="lg" controlId="password">
           <label>Password</label>
          <input type="password" value={values.password} onChange={handleInput} name="password"/>
        </div>
        <button block size="lg" type="submit" disabled={!validateForm()} onClick={handleSubmit}>
          Login
        </button>
        <p style={{ fontSize: '24px', textAlign: 'center', verticalAlign: 'middle' }}>Vous n'êtes pas encore inscrit</p>
        
        <button style={{ backgroundColor:'green'}} block size="lg" type="submit" disabled={!validateForm()} >
        <Link to='/Student/SignUp'>
          S'inscrire
          </Link>
        </button>
        
      </form>

    </div>
  );
}
export default SLogin;

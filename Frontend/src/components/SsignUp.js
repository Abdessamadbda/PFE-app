import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import "./SLogin.css";

 function SsignUp() {
  
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('');
    const [email, setEmail] = useState();  
    const [password, setPassword] = useState();  
    const [values, setValues] = useState({
      nom:'',
      filiere:'',
      niveau:'',
      email:'',
      password:''
    })
    const navigate = useNavigate();

  const handleSubmit =  async (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/Student/SignUp', values)
    .then(res => 
    {
      console.log(res);
      alert("inscription réussie")
      navigate('/Student/Login')
    })
    .catch(err => console.log(err));
    
  }
  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: [e.target.value]}))
  }


  const handleOptionChange1 = (ev) => {
    setSelectedFiliere(ev.target.value);
    setValues(prev => ({ ...prev, filiere: ev.target.value }))

  };  

  const handleOptionChange = (e) => {
    setSelectedNiveau(e.target.value);
    setValues(prev => ({ ...prev, niveau: e.target.value }))
  };
  
  return (
    <div >
      <p className="Title">Inscription</p>
      <form onSubmit={handleSubmit}>
      <div size="lg" >
          <label>Nom & Prénom</label>
          <input style={{width:'30em',height:'3em'}} name="nom" onChange={handleInput}/>
      </div>
      <br />
      <div size="lg" >
          <label>Filière</label>
          <select value={selectedFiliere} onChange={handleOptionChange1} style={{width:'30em',height:'3em'}} name="filiere" >
          <option value=""></option>
              <option value="ASEDS">ASEDS</option>
              <option value="AMOA">AMOA</option>
              <option value="DATA">DATA</option>
              <option value="Sysnum">Sysnum</option>
              <option value="Cloud">Cloud</option>
              <option value="Smart">Smart</option>
              <option value="ICCN">ICCN</option>
          </select>
      </div>
      <br />
      <div >
        <label>Niveau</label>
        <select value={selectedNiveau} onChange={handleOptionChange} style={{width:'30em',height:'3em'}} name="niveau">
        <option value=""></option>
          <option value="INE1">INE1</option>
          <option value="INE2">INE2</option>
          <option value="INE3">INE3</option>
        </select>
      </div>
      <br />
        <div size="lg" controlId="email">
          <label>Email</label>

          <input autoFocus type="email" value={email} name="email" onChange={handleInput}/>
        </div>
        <br />
        <div size="lg" controlId="password">
          <label>Password</label>
          <input type="password" value={password} onChange={handleInput} name="password"/>
        </div>
        <button style={{ backgroundColor:'green'}} block  type="submit" onClick={handleSubmit} value="SEND" > S'inscrire </button>
     </form>
     <br />
     </div>
  );
}
export default SsignUp;

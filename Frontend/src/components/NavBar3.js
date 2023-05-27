import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import axios from 'axios';

function NavBar3() {
  const [click, setClick] = useState(false);

  const navigate = useNavigate()
    const [name, setName] = useState('')
  
   
    useEffect(() => {
        axios.get('http://localhost:8081')
        .then( res => {
            if(res.data.valid){
                setName(res.data.nom);
            } else {
                navigate('/Coordinateur/PLogin')
            }
        })
        .catch(err => console.log(err))
    },[])
    
    return (
        <>
          <nav className='navbar'>
            <div className='navbar-container'>
              <Link to='/' className='navbar-logo' >
                e-PFE  
                <i class="fa fa-book" aria-hidden="true"></i>
              </Link>
              
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li style={{color:'white'}}>
                
                    {name}
                </li>
                <div >
                <Link to="/" >
    
                <i class="fas fa-sign-out-alt" style={{color: 'white'}}></i></Link></div>
    
              </ul>  
            </div>  
           </nav> 
        </>)   
}
export default NavBar3;
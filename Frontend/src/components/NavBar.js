import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const [click, setClick] = useState(false);  
    const [activeLink, setActiveLink] = useState('link1');
  
    const handleLinkClick = (link) => {
      setActiveLink(link);
    };
  return (
    <>
      <nav className='navbar'  >
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' >
            e-PFE  
            <i class="fa fa-book" aria-hidden="true"></i>
          </Link>
          
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/'  className={activeLink === 'link1' ? 'nav-link' : 'nav-links'} onClick={() => handleLinkClick('link1')}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/Student/Login'
                 className={activeLink === 'link2' ? 'nav-link' : 'nav-links'} onClick={() => handleLinkClick('link2')}
              >
                Espace Etudiant
              </Link>
            </li>
            <li className='nav-item'> 
              <Link
                to='/Coordinateur/PLogin' className={activeLink === 'link4' ? 'nav-link' : 'nav-links'} onClick={() => handleLinkClick('link4')}
                
              >
                Espace Coordinateur 
              </Link>
            </li>
            <li className='nav-item'> 
              <Link
                to='/Entreprise/Form' className={activeLink === 'link3' ? 'nav-link' : 'nav-links'} onClick={() => handleLinkClick('link3')}      
              >
                Espace Entreprise 
              </Link>
            </li>
          </ul>

        </div>
      </nav>
    </>
  );
}

export default NavBar;

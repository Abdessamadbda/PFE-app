import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import {Link} from 'react-router-dom';
function HeroSection() { 
  return (
    
    <div className='hero-container'>
      <img src='/images/home.jpg' />
      <h1>Gérez vos PFEs</h1>
      <p>En toute simplicité</p>
      
      <div className='hero-btns'>
      <Link to="/Student/Infos">
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'  
        >
          Plus d'infos
        </Button></Link>
        
      </div>
    </div>
  );
}

export default HeroSection;
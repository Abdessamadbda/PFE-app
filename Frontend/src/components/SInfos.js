import React, { useState } from "react";

function SInfos(){
  return(
    <div className='hero-container'>
    <img src='/images/home.jpg' style={{opacity:'0.7'}}/>
    <h2 style={{fontSize:'60px', color:'white',marginTop:'-3rem'}}>À propos de nous</h2>
    <br/>
    <br/>
    <p className='footer-subscription-heading' style={{fontFamily:'initial', color:'black'}}>
    Notre plateforme accompagne les étudiants pour faire leurs premiers pas dans le domaine de l'entreprise en simplifiant la gestion de leurs Projets de Fin d'Études (PFEs). Avec des fonctionnalités conviviales et intuitives, notre application permet de gérer les projets, de chercher des opportunités de stages, de gérer les délais et de faciliter la communication . Si vous êtes une entreprise notre application vous offre un espace pour proposer des PFEs et recruter des stagiaires talentueux et passionnés.
    </p></div>
    
  
  );
}

export default SInfos;
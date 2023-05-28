import './SEntreprise.css';
import React, { useState } from "react";
import axios from 'axios';

function SEntreprise() {
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [selectedPart, setSelectedPart] = useState('');

  const handleOptionChange = (e) => {
    setSelectedNiveau(e.target.value);
    setValues(prev => ({ ...prev, niveau: e.target.value }));
  };

  const [values, setValues] = useState({
    nom: '',
    adresse: '',
    email: '',
    sujet: '',
    niveau: '',
    demande_partenariat: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/Entreprise/Form', values)
      .then(res => {
        console.log(res);
        alert("envoyé");
      })
      .catch(err => console.log(err));
  };

  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOptionChange1 = (ev) => {
    setSelectedPart(ev.target.value);
    setValues(prev => ({ ...prev, demande_partenariat: ev.target.value }));
  };

  return (
    <div>
      <p className="Title">Bienvenue dans votre espace entreprise</p>
      <br/>
      <h4 style={{textAlign:'center', color:'blue'}}>Si vous cherchez des stagiaires talentueux et passionnés pour travailler sur diverses problématiques<br/>Veuillez remplir ce formulaire</h4>
<div style={{ display: 'grid', gridTemplateColumns: '8fr 8fr', gap: '2em' }}>
<div>
    <img style={{width:'50%', position:'absolute',height:'93%',marginTop:'5rem',borderRadius:'3rem',marginLeft:'3rem'}} src="/images/entreprise.png" alt="Votre image" />
  </div>
      <form onSubmit={handleSubmit} >
        <br/>
        <div>
          <label>Nom de l'entreprise</label>
          <input onChange={handleInput} style={{ width: '30em', height: '3em' }} name="nom" />
        </div>
        <br/>
        <div size="lg">
          <label>Adresse</label>
          <input onChange={handleInput} style={{ width: '30em', height: '3em' }} name="adresse" />
        </div>
        <br />
        <div size="lg" controlId="email">
          <label>Email</label>
          <input onChange={handleInput} autoFocus type="email" name="email" />
        </div>
        <br />
        <div size="lg">
          <label>Sujet proposé</label>
          <input onChange={handleInput} name="sujet" style={{ width: '30em', height: '3em' }} />
        </div>
        <br />
        <div>
          <label>Niveau</label>
          <select value={selectedNiveau} onChange={handleOptionChange} style={{ width: '30em', height: '3em' }} name="niveau">
            <option value=""></option>
            <option value="INE1">INE1</option>
            <option value="INE2">INE2</option>
            <option value="INE3">INE3</option>
          </select>
        </div>
        <br/>

        <div>
          <label>Interessé par une partenariat</label>
          <select value={selectedPart} onChange={handleOptionChange1} style={{ width: '30em', height: '3em' }} name="demande_partenariat">
            <option value=""></option>
            <option>OUI</option>
            <option>NON</option>
          </select>
        </div>
        <br/>

        <button style={{ backgroundColor: 'green' }} block type="submit" value="SEND">Envoyer</button>
      </form>
      </div>
      <br />
      <br/>

    </div>
  );
}

export default SEntreprise;


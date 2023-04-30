import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SProfile.css'

function SProfile(){
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [fili, setFili] = useState('')
    const [level, setLevel] = useState('')
    const [type, setType] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:8081')
        .then( res => {
            if(res.data.valid){
                setName(res.data.nom);
            } else {
                navigate('/Student/Login')
            }
        })
        .catch(err => console.log(err))
    },[])
    useEffect(() => {
        axios.get('http://localhost:8081')
        .then( res => {
            if(res.data.valid){
                setMail(res.data.email);
            } else {
                navigate('/Student/Login')
            }
        })
        .catch(err => console.log(err))
    },[])
    useEffect(() => {
        axios.get('http://localhost:8081')
        .then( res => {
            if(res.data.valid){
                setFili(res.data.filiere);
            } else {
                navigate('/Student/Login')
            }
        })
        .catch(err => console.log(err))
    },[])
    useEffect(() => {
        axios.get('http://localhost:8081')
        .then( res => {
            if(res.data.valid){
                setLevel(res.data.niveau);
                if(res.data.niveau==='ine1' || res.data.niveau==='ine2'){
                    setType('PFA')
                }
                else{
                    setType('PFE')
                }
            } else {
                navigate('/Student/Login')
            }
        })
        .catch(err => console.log(err))
    },[])
    return (
        <>
          <h1 style={{textAlign:'center', marginTop:'3rem'}}>Bienvenue {name}</h1>
          <div className='infosDiv'><span className='infos'>Informations personnelles:</span> <br></br><br></br>  <span className='item'>Adresse email :</span> {mail}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='item'>Status:</span> Etudiant <br></br><br></br> <span className='item'>Filière:</span> {fili}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   <span className='item'>Niveau:</span>{level}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className='item'>Ville:</span>Rabat</div>
          <div className='topicField'><Link>Consulter la liste de sujets proposés</Link> <br></br><br></br> Déclarer votre sujet de {type}:<br></br><br></br><input placeholder='&nbsp;&nbsp;&nbsp;&nbsp;Titre du projet..' className='input'></input><br></br><button className='button' >Envoyer</button></div>
          <div className='evns'><img className="img" src="/images/dd.png"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Deadlines importants <br></br><br></br><span style={{color:'blueviolet'}}> Mercredi 26 Mai </span><br></br><img className='img' src='/images/biograph.png'></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; remise des rapports de stages<br></br><br></br> <span style={{color:'blueviolet'}}>Mercredi 10 Juin</span> <br></br> <img className='img' src='/images/podium.png'></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;soutenance des projets <br></br><br></br></div>
        </>)
}
export default SProfile;

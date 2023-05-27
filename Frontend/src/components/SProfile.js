import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SProfile.css'

function SProfile(){
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [fili, setFili] = useState('')
    const [level, setLevel] = useState('')
    const [etat, setEtat] = useState('');
    const [encadrant, setEncadrant] = useState('');

    const [sujet, setSujet] = useState('');
    const [type, setType] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:8081')
        .then( res => {
            if(res.data.valid){
                setName(res.data.nom);
                setMail(res.data.email)
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
              setEtat(res.data.etat);
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
            setEncadrant(res.data.encadrant);
        } else {
           
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
              setSujet(res.data.sujet);
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
                if(res.data.niveau==='INE1' || res.data.niveau==='INE2'){
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


    
  
    const [values, setValues] = useState({
        email: '',
        password:'',
        sujet:'',
      })
      useEffect(() => {
        axios.get('http://localhost:8081')
          .then(res => {
            if(res.data.valid) {
              setValues(prevValues => ({
                ...prevValues,
                email: res.data.email,
              }));
            } else {
              navigate('/Student/Profile');
            }
          })
          .catch(err => console.log(err));
      }, []);
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/Student/Profile', values)
          .then(res => {
            console.log(res);
            alert("sujet enregistré")
            navigate('/Student/Profile')
          })
          .catch(err => console.log(err));
      };
      const handleInput = (e) => {
        setValues(prev => ({ ...prev,  sujet: e.target.value }))
        };
        console.log(values);
       

    return (
        <>
          <h1 style={{textAlign:'center', marginTop:'3rem'}}>Bienvenue {name}</h1>
          <div className='infosDiv'><span className='infos'>Informations personnelles:</span> <br></br><br></br>  <span className='item'>Adresse email :</span> {mail}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='item'>Status:</span> Etudiant <br></br><br></br> <span className='item'>Filière:</span> {fili}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   <span className='item'>Niveau:</span>{level}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className='item'>Ville:</span>Rabat</div>
          <div className='container'>
          <div className='topicField'><Link to={'/Student/Topics'}>Consulter la liste de sujets proposés</Link> <br></br><br></br> Déclarer votre sujet de {type}:<br></br><br></br><input placeholder='&nbsp;&nbsp;&nbsp;&nbsp;Titre du projet..' className='input' onChange={handleInput}></input><br></br><button className='button' type="submit" onClick={handleSubmit} >Envoyer</button>      {(() => {
  if (sujet !== null) {
    if (etat !== null) {
      return <div style={{ whiteSpace: 'nowrap', marginTop:'3rem' }}><li style={{ textAlign: 'left', fontSize:'18px', color:'brown',display: 'inline'}}>État de ton sujet "{sujet}" :</li> <p style={{ display: 'inline', marginLeft: '1rem', fontSize: '18px' }}>{etat}</p></div>;
    } else {
      return <div style={{whiteSpace: 'nowrap',marginTop:'3rem'}}><li style={{ textAlign: 'left', fontSize:'18px',color:'brown',display: 'inline'}}>État de ton sujet "{sujet}" :</li><p style={{ display: 'inline', marginLeft: '1rem', fontSize: '18px' }}>En attente</p></div>;
    }
  }
  else {return <p></p>;}
  
})()}
{(() => {
  if (sujet !== null) {
    if (encadrant !== null) {
      return <div style={{ whiteSpace: 'nowrap', marginTop:'1rem' }}><li style={{ textAlign: 'left', fontSize:'18px', color:'brown',display: 'inline'}}>L'encadrant affecté : Mr. </li> <p style={{ display: 'inline', marginLeft: '1rem', fontSize: '18px' }}>{encadrant}</p></div>;
    } else {
      return <p></p>;
    }
  }
  else {return <p></p>;}
  
})()}


</div>
          <div className='evns'><img className="img" src="/images/dd.png"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Deadlines importants <br></br><br></br><span style={{color:'blueviolet'}}> Mercredi 26 Mai </span><br></br><img className='img' src='/images/biograph.png'></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; remise des rapports de stages<br></br><br></br> <span style={{color:'blueviolet'}}>Mercredi 10 Juin</span> <br></br> <img className='img' src='/images/podium.png'></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;soutenance des projets <br></br><br></br></div>
          </div>
          <br></br>
          <br></br>
        </>)
}
export default SProfile;

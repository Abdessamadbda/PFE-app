import React, { useEffect, useState } from 'react';
import axios from 'axios';

function STopics() {
  const [entreprises, setEntreprises] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/Student/Topics', {
      
    })
      .then(response => {
        setEntreprises(response.data);
      })
      .catch((error) => {
        console.error('Error fetching projects data:', error);
      });
  });


  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <h1 style={{textAlign:'center'}}>Liste des sujets proposés</h1>
<br></br>
<br></br>
<br></br>
<br></br>
      <table >
        <thead>
          <tr >
            <th style={{color:'blue'}}>Nom de l'entreprise</th>
            <th style={{color:'blue'}}>Adresse</th>
            <th style={{color:'blue'}}>Email</th>
            <th style={{color:'blue'}}>Sujet proposé</th>
            <th style={{color:'blue'}}>Niveau</th>
          </tr>
        </thead>
        <tbody>
          {entreprises.map((entreprise) => (
            !entreprise.deleted && (
              <>
              <tr style={{ marginTop: '2rem' }}><br/></tr>
            <tr  key={entreprise.id} >
              <td >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{entreprise.nom}</td>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;{entreprise.adresse}</td>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{entreprise.email}</td>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{entreprise.sujet}</td>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{entreprise.niveau}</td>
            </tr>
            </>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default STopics;


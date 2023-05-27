import React, { useState, useEffect } from "react";
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './ClisteTopic.css';
function ClisteTopic(){
    const navigate=useNavigate();
    const [name,setName]=useState('')
    const [fname,setFname]=useState('')
    const [email,setEmail]=useState('')
    const [inputValues, setInputValues] = useState({});

    const [projects, setProjects] = useState([]);

    const [values, setValues]= useState({
      email:'',
      etat:'',
    })

    
    
    useEffect(() => {
      axios.get('http://localhost:8081')
      .then( res => {
          if(res.data.valid){
              setName(res.data.nom);
          } else {
              navigate('/Coordinateur/Login')
          }
      })
      .catch(err => console.log(err))
  },[])
  useEffect(() => {
    axios.get('http://localhost:8081')
    .then( res => {
        if(res.data.valid){
            setFname(res.data.filiere);
        } else {
            navigate('')
        }
    })
    .catch(err => console.log(err))
},[])
  

  const handleSubmit1 = (email) => {
    setProjects((prevProjects) => {
      const updatedProjects = { ...prevProjects };
      Object.keys(updatedProjects).forEach((niveau) => {
        updatedProjects[niveau] = updatedProjects[niveau].map((project) =>
          project.email === email ? { ...project, showInput: true } : project
        );
      });
      return updatedProjects;
    });
    axios
      .post('http://localhost:8081/Coordinateur/ListeTopic', { email, etat: 'validé' })
      .then((res) => {
      
      })
      .catch((err) => console.log(err));
    
  }
  const handleSubmit3 = (email) => {
    const inputValue = inputValues[email] || ''; 
    setProjects((prevProjects) => {
      const updatedProjects = { ...prevProjects };
      Object.keys(updatedProjects).forEach((niveau) => {
        updatedProjects[niveau] = updatedProjects[niveau].map((project) =>
          project.email === email ? { ...project, etat: 'validé', encadrant: inputValue, showInput: false } : project
        );
      });
      return updatedProjects;
    });
    axios
      .post('http://localhost:8081/Coordinateur/ListeTopic', { email, etat: 'validé', encadrant: inputValue }) 
      .then((res) => {
        alert('enregistré');
        setInputValues((prevInputValues) => {
          const updatedInputValues = { ...prevInputValues };
          delete updatedInputValues[email]; 
          return updatedInputValues;
        });
      })
      .catch((err) => console.log(err));
  };
  
  const handleSubmit2 = (email) => {   
    setProjects((prevProjects) => {
      const updatedProjects = { ...prevProjects };
      Object.keys(updatedProjects).forEach((niveau) => {
        updatedProjects[niveau] = updatedProjects[niveau].map((project) =>
          project.email === email ? { ...project, etat: 'non validé' } : project
        );
      });
      return updatedProjects;
    });
    axios
      .post('http://localhost:8081/Coordinateur/ListeTopic', { email, etat: 'non validé' })
      .then((res) => {
        alert('enregistré');
      })
      .catch((err) => console.log(err));
    
  }
  const handleClick1 = (email) => {
    const inputValue = inputValues[email] || ''; 
    setProjects((prevProjects) => {
      const updatedProjects = { ...prevProjects };
      Object.keys(updatedProjects).forEach((niveau) => {
        updatedProjects[niveau] = updatedProjects[niveau].map((project) =>
          project.email === email ? { ...project, showInput: true } : project
        );
      });
      return updatedProjects;
    });
    axios
      .post('http://localhost:8081/Coordinateur/ListeTopic', { email, etat: 'validé', encadrant: inputValue }) 
      .then((res) => {
        alert('enregistré');
      })
      .catch((err) => console.log(err));
  };
  

  const handleClick2 = (email) => {
    setProjects(prevProjects => {
      const updatedProjects = { ...prevProjects };
      Object.keys(updatedProjects).forEach(niveau => {
        updatedProjects[niveau] = updatedProjects[niveau].map(project =>
          project.email === email ? { ...project, etat: 'non validé' } : project
        );
      });
      return updatedProjects;
    });
  };
  
  
      
      
      useEffect(() => {
        
        axios.get('http://localhost:8081/Coordinateur/ListeTopic', {
          params: {
            filiere: fname 
          }
        })
          .then((response) => {
            const organizedData = {};
            response.data.forEach((project) => {
              if (!organizedData.hasOwnProperty(project.niveau)) {
                organizedData[project.niveau] = [];
              }
              organizedData[project.niveau].push(project);
            });
      
            setProjects(organizedData);
            setValues(prev => ({ ...prev, email: email, etat: 'non validé' }));
    setProjects(prevProjects => {
      const updatedProjects = { ...prevProjects };
      Object.keys(updatedProjects).forEach(niveau => {
        updatedProjects[niveau] = updatedProjects[niveau].map(project =>
          project.email === email ? { ...project, deleted: true } : project
        );
      });
      return updatedProjects;
    });
          })
          .catch((error) => {
            console.error('Error fetching projects data:', error);
          });
      }, [fname]);
      
      
    
    
      return (
        <>
          <h1 style={{ textAlign: 'center', marginTop: '3rem', lineHeight: '1.2' }}>
            Bienvenue Mr. {name}<br />
            <p style={{ fontSize: '32px', fontFamily: 'Arial', margin: '0' }}>Coordinateur {fname}</p>
          </h1>
          <h2 style={{ marginTop: '3rem', marginBottom: '3rem', textAlign: 'center', fontSize: '3rem' }}>Projets</h2>
      
          {Object.keys(projects).map(niveau => (
            <React.Fragment key={niveau}>
              <p style={{ marginLeft: '8rem', marginBottom: '3rem', fontSize: '30px', textAlign: 'left' }}>{niveau}</p>
      
              <table style={{ marginLeft: '4rem', marginRight: '4rem' }}>
                <thead >
                  <tr >
                    <th>Nom</th>
                    <th>Sujet</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects[niveau].map(project => (
                    !project.deleted && (
                      <tr key={project.id} >
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{project.nom}</td>
                        <td>{project.sujet}</td>
                        <td style={{ display: 'flex', alignItems: 'center' }}>
                        {project.showInput ? (
              <>
                <input
                  style={{ marginLeft: '20rem', marginTop: '19px', height: '32px', width: '10rem' }}
                  type="text"
                  placeholder="Affecter un encadrant"
                  value={inputValues[project.email] || ''}
  onChange={(e) => {
    const updatedInputValues = { ...inputValues, [project.email]: e.target.value }; 
    setInputValues(updatedInputValues);
  }}
                />
                <button
                  style={{
                    height: '32px',
                    width: '100px',
                    marginLeft: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'green',
                  }}
                  onClickCapture={() => handleSubmit3(project.email)}
                  onClick={() => handleClick1(project.email)}
                >
                  Affecter
                </button>
              </>
            ):(
              <>
                          {!project.etat ? (
                            <>
                            
                              {!project.validated && (
                                <button
                                  style={{
                                    height: '32px',
                                    width: '100px',
                                    marginLeft: '20rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'green'
                                  }}
                                  onClickCapture={() => handleSubmit1(project.email)}
                                  onClick={() => handleClick1(project.email)}
                                >
                                  Validate
                                </button>
                              )}

                              {!project.rejected && (
                                <button
                                  style={{
                                    height: '32px',
                                    width: '100px',
                                    marginLeft: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                  onClickCapture={() => handleSubmit2(project.email)}
                                  onClick={() => handleClick2(project.email)}
                                >
                                  Reject
                                </button>
                              )}
                            </>
                          ) : (
                            <span style={{marginLeft:'26rem'}}>{project.etat}</span>
                          )} </>
                          )}
                        </td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
              <br />
              <br />
            </React.Fragment>
          ))}
        </>
      );
      
}
export default ClisteTopic;
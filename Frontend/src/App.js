import React from 'react';
import {  Route, Routes,useLocation  } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/pages/Home';
import Login from './components/pages/Student/Login';
import SignUp from './components/pages/Student/SignUp';
import Profile from './components/pages/Student/Profile';
import Infos from './components/pages/Student/Infos';


function App() {
  const location = useLocation();

  return (
    <>
   
     {location.pathname !== '/Student/Profile' && <NavBar />}
      <Routes>
        <Route path='/' exact component={Home} element={<Home/>}/>
        <Route path='/Student/Login' exact component={Login} element={<Login/>}/>
        <Route path='/Student/SignUp' exact component={SignUp} element={<SignUp/>}/>
        <Route path='/Student/Profile' exact component={Profile} element={<Profile/>}/>
        <Route path='/Student/Infos' exact component={Infos} element={<Infos/>}/>

      </Routes>
   
    </>
  );
}

export default App;

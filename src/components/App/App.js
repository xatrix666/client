import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Asteroids from '../Asteroids/Asteroids';
import Login from '../Login/Login';
import NavMenu from '../NavMenu/NavMenu';
import UseToken from './UseToken';

function App() {

  const { token, setToken } = UseToken();

  return (
    <div className="total">
      <Header />
      <NavMenu />
      <div className="wrapper">
        {!token && <Login setToken={setToken} />}
        {token && <Asteroids />}
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Asteroids from '../Asteroids/Asteroids';
import Login from '../Login/Login';
import NavMenu from '../NavMenu/NavMenu';
import useToken from './useToken';

function App() {

  const { token, setToken } = useToken();

  return (
    <div>
      <Header />
      <NavMenu />
      <div className="wrapper">
        <Routes>
          {!token && <Route exact path="/" element={<Login setToken={setToken} />} />}
          {token && <Route path="/asteroids" element={<Asteroids />} />}
        </Routes>
      </div>
    </div>
  );
}

export default App;

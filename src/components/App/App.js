import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Asteroids from '../Asteroids/Asteroids';
import Login from '../Login/Login';
import useToken from './useToken';

function App() {

  const { token, setToken } = useToken();

  return (
    <div>
      <Header />
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            {!token && <Route path="/" element={<Login setToken={setToken} />} />}
            <Route path="asteroids" element={<Asteroids />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

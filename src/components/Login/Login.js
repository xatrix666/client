import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Login.css';

async function loginUser(credentials) {
  return axios('https://localhost:44391/api/auth', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    data: credentials
  })
    .then(data => data.data)
    .catch(error => error.response)
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    if (token && token.data && token.data.message) setErrorMessage(token.data.message);
    setToken(token);
  }

  const handleSetUserName = (e) => {
    setErrorMessage();
    setUserName(e.target.value)
  } 

  const handleSetPassword = (e) => {
    setErrorMessage();
    setPassword(e.target.value)
  } 
  
  const handleShowPassword = (e) => {
    setPasswordShown(!passwordShown);
  }

  return (
    <div className="login-wrapper">
      <h1>Log In</h1>
      {errorMessage &&
        <h3 className="error"> {errorMessage} </h3>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="email" onChange={handleSetUserName} required/>
        </label>
        <label>
          <p>Password</p>
          <input type={passwordShown ? "text" : "password"} onChange={handleSetPassword} required/>
        </label>
        <label>
          <p>Show/hide Password</p>
          <input type="checkbox" onClick={handleShowPassword} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
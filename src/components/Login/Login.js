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
    else setToken(token);
  }

  const handleSetUserName = (e) => {
    setErrorMessage();
    setUserName(e.target.value)
  }

  const handleSetPassword = (e) => {
    setErrorMessage();
    setPassword(e.target.value)
  }

  const handleShowPassword = () => {
    setPasswordShown(!passwordShown);
  }

  return (
    <div>
      {errorMessage &&
        <h4 className="error-user"> {errorMessage} </h4>}
      <div className="login-wrapper">
        <h2>Log In</h2>      
        <form onSubmit={handleSubmit}>
          <label className="margin-elements">
            <input type="email" placeholder="Username" onChange={handleSetUserName} required />
          </label>
          <label className="margin-elements">
            <input type={passwordShown ? "text" : "password"} placeholder="Password" onChange={handleSetPassword} required />
          </label>
          <label className="label-in-line margin-elements">
            <p className="text-small">Show/hide Password</p>
            <input type="checkbox" onClick={handleShowPassword} />
          </label>
          <div className="margin-elements">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
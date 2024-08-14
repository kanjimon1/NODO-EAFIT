import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../pics/login-type-amadeus.png';
//import './Login.css';

//esta es una prueba para github
const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      
      const response = await fetch('http://localhost:5173/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Response text:', text);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        alert('Login successful!');
        // Redirect to Employees Grid
        navigate('/employees');
      } else {
        alert('Login failed: ' + data.message);
      }
      
    } catch (error) {
      console.error("There was an error fetching the users data:", error);
    }
  }

  return (    
    <div id="wrapper">
      <h1 className="sr-only">Amadeus Service Hub</h1>
      <div id="login">
        {/*<img alt="Amadeus" src="../../pics/login-type-amadeus.png" />*/}
        <img alt="Amadeus" src={logo} />
        <h2>Amadeus</h2>
        <span>If you are not an employee, <a href="NotEmployee.html">Click here</a></span>
        {/*<form id="loginForm" method="POST" action="/login">*/}
        <form id="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="username">Windows Username:</label>
          <input type="text" 
            id="username" 
            name="username" 
            placeholder="Ex. john.smith or jsmith" 
            title="Enter username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />
          <br />
          <label htmlFor="password">Windows Password:</label>
          <input type="password" 
            id="password" 
            name="password" 
            placeholder="Enter your password" 
            title="Enter password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
          <button type="submit">Sign in</button>
        </form>
        <a href="hotologin">How to login</a>
        <a href="hotologin">Forgot your password</a>
      </div>
    </div>
     );
};

export default Login;

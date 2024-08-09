import React from 'react';
//import './Login.css';

//esta es una prueba para github
const Login = () => {
  return (
    <div id="wrapper">
      <h1 className="sr-only">Amadeus Service Hub</h1>
      <div id="login">
        <img alt="Amadeus" src="path-to-your-image/login-type-amadeus.png" />
        <h2>Amadeus</h2>
        <span>If you are not an employee, <a href="NotEmployee.html">Click here</a></span>
        <form id="loginForm" method="POST" action="/login">
          <label htmlFor="username">Windows Username:</label>
          <input type="text" id="username" name="username" placeholder="Ex. john.smith or jsmith" title="Enter username" required />
          <br />
          <label htmlFor="password">Windows Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" title="Enter password" required />
          <button type="submit">Sign in</button>
        </form>
        <a href="hotologin">How to login</a>
        <a href="hotologin">Forgot your password</a>
      </div>
    </div>
  );
};

export default Login;

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
//import './scss/'
//import './components/Userslogin/login.css'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <React.StrictMode>    
    <App />
  </React.StrictMode>
  </BrowserRouter>,
)

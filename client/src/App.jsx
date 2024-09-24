//import { useState } from "react";
import { Routes, Route } from "react-router-dom";
//import "./css/styles.css";


//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import icon from "../../pics/amadeus-favicon.ico"

//import { EmployeesInfo } from './components/EmployeesInfo/EmployeesInfo';
import { ExtraHours } from './components/ExtraHours/ExtraHours';
//import "./components/ExtraHours/extrahoursStyles.scss";
import { EmployeesGrid } from "./components/EmployeesInfo/EmployeesGrid";

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Userslogin/login";
import Footer from "./components/Footer/Footer";

function App() {
  //return <EmployeesInfo />;
  /*return (
    <div className="App">
      <header></header>
      <main>
        <ExtraHours />
      </main>
      <footer></footer>
    </div>
  );*/
  /*return (
    <div className="App">
      <header className="App-header">
        <h1>Employee List</h1>
      </header>
      <main>
        <EmployeesGrid />
      </main>
      <footer className="App-footer">
        <p>© 2024 Company Name. All rights reserved.</p>
      </footer>
    </div>
  );*/
  return (    
    <div>
      <div className="App">
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            {/**/}
            <Route path="/" element={<Login />} />
            <Route path="/employees" element={<EmployeesGrid />} />
            <Route path="/addExtraHours" element={<ExtraHours />}/>
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default App;

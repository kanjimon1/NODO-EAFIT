import React, { useEffect, useState } from "react";
//import { Table } from "antd";
import logo from "../../pics/login-type-amadeus.png";

export const Employees = () => {
  return (
    <div id="wrapper">
      <h1 className="sr-only">Add Extra Hour</h1>
      <div id="login">
        <img alt="Amadeus" src={logo} />
        <h2>Add Extra Hour</h2>
        {/*<form id="loginForm" onSubmit={handleSubmit}>*/}        
        <form id="loginForm">
          <label htmlFor="ExtraHour">Extra hour:</label>
          <input
            type="text"
            id="extrahour"
            name="extrahour"
            placeholder="extrahour"
            title="Enter Extra Hour"
            required
          />
          <label htmlFor="AddedPercentage">Add Percentage:</label>
          <input
            type="text"
            id="addedpercentage"
            name="addedpercentage"
            placeholder="Add Extra Hour"
            title="Enter Percentage"            
            required
          />
          <label htmlFor="AddPriceHour">Add Price Hour:</label>
          <input
            type="text"
            id="addpricehour"
            name="addpricehour"
            placeholder="Add Price Hour"
            title="Enter Price Hour"
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Employees;
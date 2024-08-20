//import React from 'react';
import React, { useState } from "react";
//import { useNavigate } from 'react-router-dom';
import logo from "../../pics/login-type-amadeus.png";

export const UpdateExtraHours = ({ employee }) => {

  const empId = employee?.id;

  const [EmployeeId, setEmployeeId] = useState(employee?.EmployeeId || "");
  const [EmployeeName, setEmployeeName] = useState(employee?.EmployeeName || "");
  const [JobName, setJobName] = useState(employee?.JobName || "");
  const [ExtraHours, setExtraHours] = useState(employee?.ExtraHours || "");
  const [Date, setDate] = useState(employee?.Date || "");
  const [Manager, setManager] = useState(employee?.Date || "");
  //const navigate = useNavigate();

  console.log(`valor de empleado id`,employee);

  //console.log(`valores antes de enviar ${extrahour} ${addpercentage} ${addpricehour}`);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5173/updateExtraHours", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify({ extrahour, addpercentage, addpricehour}),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Response text:", text);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        alert(
          "Datos actualizados con éxito " +
            data.message +
            ", los siguientes datos: " +
            data.record
        );
        // Redirect to Employees Grid
        //navigate('/employees');
      } else {
        alert("hubo un error al actualizar la información " + data.error);
      }
    } catch (error) {
      console.error("There was an error fetching the users data:", error);
    }
  };

  return (
    <div id="wrapper">
      <h1 className="sr-only">Actualizar Hora Extra</h1>
      {/*<div id="login">*/}
      <img alt="Amadeus" src={logo} />
      <h2>Actualizar Horas Extra</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="EmployeeId">ID:</label>
        <input
          type="text"
          id="EmployeeId"
          name="EmployeeId"
          placeholder="EmployeeId"
          title="Enter ID"
          value={EmployeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          disabled
          required
        />
        <label htmlFor="AddedPercentage">Nombre Empleado:</label>
        <input
          type="text"
          id="EmployeeName"
          name="EmployeeName"
          placeholder="Add EmployeeName"
          title="Enter Employee Name"
          value={EmployeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          required
        />
        <label htmlFor="JobName">Agregar Cargo:</label>
        <input
          type="text"
          id="JobName"
          name="JobName"
          placeholder="Add JobName"
          title="Enter JobName"
          value={JobName}
          onChange={(e) => setJobName(e.target.value)}
          required
        />
        <label htmlFor="ExtraHours">Agregar Horas Extras:</label>
        <input
          type="text"
          id="ExtraHours"
          name="ExtraHours"
          placeholder="Add Extra Hours"
          title="Enter Extra Hours"
          value={ExtraHours}
          onChange={(e) => setExtraHours(e.target.value)}
          required
        />
        <label htmlFor="Date">Agregar Fecha:</label>
        <input
          type="text"
          id="Date"
          name="Date"
          placeholder="Add Date"
          title="Enter Date"
          value={Date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label htmlFor="Manager">Agregar Supervisor:</label>
        <input
          type="text"
          id="Manager"
          name="Manager"
          placeholder="Add Manager"
          title="Enter Manager"
          value={Manager}
          onChange={(e) => setManager(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
      {/*<a href="hotologin">How to login</a>
        <a href="hotologin">Forgot your password</a>
      </div>*/}
    </div>
  );
};

export default UpdateExtraHours;

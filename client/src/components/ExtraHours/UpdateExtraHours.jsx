//import React from 'react';
import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import logo from '../../pics/login-type-amadeus.png';

export const UpdateExtraHours = (EmployeeId) => {

  const [extrahour, setExtrahour] = useState('');
  const [addpercentage, setPercentage] = useState('');
  const [addpricehour, setPricehour] = useState('');
  //const navigate = useNavigate();

  console.log(`valores antes de enviar ${extrahour} ${addpercentage} ${addpricehour}`);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      
      const response = await fetch('http://localhost:5173/updateExtraHours', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ extrahour, addpercentage, addpricehour}),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Response text:', text);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        alert('Datos actualizados con éxito ' + data.message + ", los siguientes datos: " + data.record);
        // Redirect to Employees Grid
        //navigate('/employees');
      } else {
        alert('hubo un error al actualizar la información ' + data.error);
      }
      
    } catch (error) {
      console.error("There was an error fetching the users data:", error);
    }
  }

  return (
    <div id="wrapper">
      <h1 className="sr-only">Actualizar Hora Extra</h1>
      {/*<div id="login">*/}
        <img alt="Amadeus" src={logo} />
        <h2>Add Extra Hour</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="ExtraHour">Extra hour:</label>
          <input type="text" 
            id="extrahour" 
            name="extrahour" 
            placeholder="extrahour" 
            title="Enter Extra Hour" 
            value={extrahour}
            onChange={(e) => setExtrahour(e.target.value)}
            required />          
          <label htmlFor="AddedPercentage">Agregue Porcentaje:</label>
          <input type="text" 
            id="addedpercentage" 
            name="addedpercentage" 
            placeholder="Add Extra Hour"
            title="Enter Percentage" 
            value={addpercentage}
            onChange={(e) => setPercentage(e.target.value)}
            required />
            <label htmlFor="AddPriceHour">Agregar Valor Hora:</label>
          <input type="text" 
            id="addpricehour"
            name="addpricehour"
            placeholder="Add Price Hour"
            title="Enter Price Hour"
            value={addpricehour}
            onChange={(e) => setPricehour(e.target.value)}
            required />
          <button type="submit">Send</button>
        </form>
        {/*<a href="hotologin">How to login</a>
        <a href="hotologin">Forgot your password</a>
      </div>*/}
    </div>
  );
};

export default UpdateExtraHours;
//import React from 'react';
import React, { useState } from "react";
//import { useNavigate } from 'react-router-dom';
import logo from "../../pics/login-type-amadeus.png";
import { Select, DatePicker } from "antd";

import { Input } from "antd";
//import { AudioOutlined } from icons;

//const { AudioOutlined } = icons;
//const { Input, Space, Flex } = antd;
const { Search, TextArea } = Input;

const onChange = (e) => {
  console.log("Change:", e.target.value);
};

{/*const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);*/}

const onSearch = (value, _e, info) => console.log(info?.source, value);

export const ExtraHours = () => {
  const [extrahour, setExtrahour] = useState("");
  const [addpercentage, setPercentage] = useState("");
  const [addpricehour, setPricehour] = useState("");
  //const navigate = useNavigate();

  console.log(
    `valores antes de enviar ${extrahour} ${addpercentage} ${addpricehour}`
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5173/addExtraHours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ extrahour, addpercentage, addpricehour }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Response text:", text);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        alert(
          "Datos guardados con éxito " +
            data.message +
            ", los siguientes datos: " +
            data.record
        );
        // Redirect to Employees Grid
        //navigate('/employees');
      } else {
        alert("hubo un error al insertar la información " + data.error);
      }
    } catch (error) {
      console.error("There was an error fetching the users data:", error);
    }
  };

  return (
    <div id="wrapper">
      <h1 className="sr-only">Añadir Hora Extra</h1>
      {/*<div id="login">*/}
      <img alt="Amadeus" src={logo} />
      <h2>Añadir Hora Extra</h2>
      <form id="horasExtrasForm">
        {/*</form><form id="loginForm" onSubmit={handleSubmit}>*/}
        <article>
          <section class="search">
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
          </section>
          <section class="middle">
            <label htmlFor="DateRange">Rango fecha:</label>
            <DatePicker
              id="date"
              name="date"
              style={{ width: "10%" }}
              placeholder="Añadir Fecha"
              title="Ingrese la fecha"
              required
            />
          </section>
          <section>
            <Select
              id="hora"
              placeholder="Seleccionar tipo hora"
              title="Seleccione tipo hora"
            >
              <Option value="Diurna">Diurna</Option>
              <Option value="DiurnaFestiva">Diurna Festiva</Option>
              <Option value="NocturnaFestiva">Nocturna</Option>
              <Option value="Nocturna">Nocturna Festiva</Option>
            </Select>
            <label htmlFor="ExtraHour">Hora Extra:</label>
            <input
              type="text"
              id="extrahour"
              name="extrahour"
              placeholder="extrahour"
              title="Enter Extra Hour"
              value={extrahour}
              onChange={(e) => setExtrahour(e.target.value)}
              required
            />
          </section>
          <section class="textarea">
            <TextArea
              showCount
              maxLength={100}
              onChange={onChange}
              placeholder="can resize"
            />
          </section>
        </article>
        {/*<label htmlFor="ExtraHour">Extra hour:</label>
          <input type="text" 
            id="extrahour" 
            name="extrahour" 
            placeholder="extrahour" 
            title="Enter Extra Hour" 
            value={extrahour}
            onChange={(e) => setExtrahour(e.target.value)}
            required />          
          <label htmlFor="AddedPercentage">Add Percentage:</label>
          <input type="text" 
            id="addedpercentage" 
            name="addedpercentage" 
            placeholder="Add Extra Hour"
            title="Enter Percentage" 
            value={addpercentage}
            onChange={(e) => setPercentage(e.target.value)}
            required />
            <label htmlFor="AddPriceHour">Add Price Hour:</label>
          <input type="text" 
            id="addpricehour"
            name="addpricehour"
            placeholder="Add Price Hour"
            title="Enter Price Hour"
            value={addpricehour}
            onChange={(e) => setPricehour(e.target.value)}
            required />*/}
        <button type="submit">Send</button>
      </form>
      {/*<a href="hotologin">How to login</a>
        <a href="hotologin">Forgot your password</a>
      </div>*/}
    </div>
  );
};

export default ExtraHours;

//import React from 'react';
import React, { useState } from "react";
//import { useNavigate } from 'react-router-dom';
import logo from "../../pics/login-type-amadeus.png";
import { Select, DatePicker, Input } from "antd";
const { Search, TextArea } = Input;
import moment from "moment";

export const UpdateExtraHours = ({ employee }) => {

  const empId = employee?.id;

  const [EmployeeId, setEmployeeId] = useState(employee?.EmployeeId || "");
  const [EmployeeName, setEmployeeName] = useState(employee?.EmployeeName || "");
  const [JobName, setJobName] = useState(employee?.JobName || "");
  const [ExtraHours, setExtraHours] = useState(employee?.ExtraHours || "");
  const [Fecha, setDate] = useState(employee?.Date ? moment(employee.Date) : null);
  const [Manager, setManager] = useState(employee?.Manager || "");
  const [observaciones, setObservaciones] = useState(employee?.observaciones || "");
  const [TipoHora, setTipoHora] = useState(employee?.observaciones || "");
  
  //const navigate = useNavigate();

  console.log(`valor de empleado id`,employee);

  const handleDateChange = (Fecha) => {
    setDate(Fecha);
  };

  //console.log(`valores antes de enviar ${extrahour} ${addpercentage} ${addpricehour}`);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      EmployeeId,
      EmployeeName,
      JobName,
      ExtraHours,
      Fecha: date ? date.format("YYYY-MM-DD") : null,
      Manager,
      observaciones,
      // Incluye otros campos relevantes
    };

    try {
      const response = await fetch("http://localhost:5173/updateExtraHours", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
        });

      if (!response.ok) {
        const text = await response.text();
        console.error("Response text:", text);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        alert("Datos actualizados con éxito " +data.message +", los siguientes datos: " +data.record);        
      } else {
        alert("Hubo un error al actualizar la información " + data.error);
      }
    } catch (error) {
      console.error("Hubo un error fetching los datos de los usuarios: ", error);
    }
  };

  return (
    <div id="wrapper">
      <h1 className="sr-only">Actualizar Hora Extra</h1>
      {/*<div id="login">*/}
      <img alt="Amadeus" src={logo} />
      <h2>Actualizar Horas Extra</h2>
      <form id="UpdataExtraHoursForm" onSubmit={handleSubmit}>
      <br/>
        <article>
          <section class="search">
            {/*<Search
              placeholder="ingrese el id del empleado"
              onSearch={onSearch}
              enterButton
            />*/}
            <br />
            <h6><p>EmployeeId: {employee.EmployeeId}</p></h6>
            <h6><p>EmployeeName: {employee.EmployeeName}</p></h6>
            <h6><p>JobName: {employee.JobName}</p></h6>
            <h6><p>ExtraHours: {employee.ExtraHours}</p></h6>
            <h6><p>Date: {employee.Date}</p></h6>
            <h6><p>Manager: {employee.Manager}</p></h6>            
          </section>
          {/*<input type="hidden" name="EmployeeId" value={employeeData.EmployeeId} />
          <input type="hidden" name="EmployeeName" value={employeeData.EmployeeName} />
          <input type="hidden" name="JobName" value={employeeData.ExtraHours} />
          <input type="hidden" name="Manager" value={employeeData.Manager} />*/}
          <section class="middle">
            <label htmlFor="DateWorked">Fecha laborada:</label>
            <DatePicker
              id="date"
              name="date"
              style={{ width: "50%" }}
              placeholder="Añadir Fecha"
              title="Ingrese la fecha"
              value={Fecha}              
              onChange={handleDateChange}
              format="YYYY-MM-DD HH:mm"
              showTime={{ format: "HH:mm" }}
              required
            />
          </section>
          <section>
          <label htmlFor="DateWorked">Tipo de hora laborada y porcentaje:</label>
            <Select
              id="TipoHora"
              placeholder="Seleccionar tipo hora"
              title="Seleccione tipo hora"
              value={employee.TipoHora}
              onChange={(value) => setHora(value)}
              style={{ width: '200px' }}
            >
              <Option value="25">Diurna 25%</Option>
              <Option value="75">Diurna Festiva 75%</Option>
              <Option value="100">Nocturna 100%</Option>
              <Option value="150">Nocturna Festiva 150%</Option>
            </Select>
            </section>
            <section>
            <label htmlFor="ExtraHour">Cantidad Horas Extra:</label>
            <input
              type="text"
              id="extraHour"
              name="extraHour"
              placeholder="extrahour"
              title="Enter Extra Hour"
              value={ExtraHours}
              onChange={(e) => setExtraHours(e.target.value)}
              required
            />
          </section>
          <section class="textarea">
            <TextArea
              showCount
              maxLength={100}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Obervaciones"
              value={observaciones}
            />
          </section>
        </article>       
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default UpdateExtraHours;

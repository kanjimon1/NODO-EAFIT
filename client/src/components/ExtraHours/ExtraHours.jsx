import React, { useState } from "react";
import logo from "../../pics/login-type-amadeus.png";
import { Select, DatePicker, Input } from "antd";
const { Search, TextArea } = Input;

export const ExtraHours = () => {

  const [employeeData, setEmployeeData] = useState({
    EmployeeId: 0,
    EmployeeName: '',
    JobName: '',
    extraHours: 0,
    Date: '',
    Manager: '',
    observaciones: '',
    hora: 0,    
  });

  const [date, setDate] = useState(null);
  const [hora, setHora] = useState('');
  const [extraHours, setExtraHours] = useState('');
  const [observaciones, setObservaciones] = useState('');

  //Para buscar el empleado por el ID
  const onSearch = async (employeeId) => {

    console.log('VALIDANDO SI ENTRÓ AL BUSCAR POR EMPLEADO: ',employeeId);

    try {
      // Fetch the employee information based on the employeeId
      const response = await fetch(`http://localhost:5173/employeeId/${employeeId}`);

      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Error fetching employee information');
      }

      // Parse the response data
      const data = await response.json();     

      setEmployeeData({
        EmployeeId: data.EmployeeId,
        EmployeeName: data.EmployeeName,
        JobName: data.JobName,
        extraHours: data.extraHours || '',
        Date: data.Date || '',
        Manager: data.Manager || '',
        observaciones: data.observaciones || '',
        hora: data.hora || '',
      });
      
      // Handle the fetched data (e.g., display it or set it in the state)
      console.log('Employee Data:', data);
      message.success(`Employee data fetched successfully!`);

    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
      message.error(`Failed to fetch employee data: ${error.message}`);
    }
  };


  //Para guardar la hora extra
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5173/addExtraHours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          EmployeeId: employeeData.EmployeeId,
          EmployeeName: employeeData.EmployeeName,
          JobName: employeeData.JobName,
          extraHours,
          Date: date,
          Manager: employeeData.Manager,
          hora,
          observaciones,
        }),
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
      <img alt="Amadeus" src={logo} />
      <h2>Añadir Hora Extra</h2>
      <form id="horasExtrasForm" onSubmit={handleSubmit}>        
        <br/>
        <article>
          <section class="search">
            <Search
              placeholder="ingrese el id del empleado"
              onSearch={onSearch}
              enterButton
            />
            <br />
            <h6><p>EmployeeId: {employeeData.EmployeeId}</p></h6>
            <h6><p>EmployeeName: {employeeData.EmployeeName}</p></h6>
            <h6><p>JobName: {employeeData.JobName}</p></h6>
            <h6><p>ExtraHours: {employeeData.ExtraHours}</p></h6>
            <h6><p>Date: {employeeData.Date}</p></h6>
            <h6><p>Manager: {employeeData.Manager}</p></h6>
          </section>
          <input type="hidden" name="EmployeeId" value={employeeData.EmployeeId} />
          <input type="hidden" name="EmployeeName" value={employeeData.EmployeeName} />
          <input type="hidden" name="JobName" value={employeeData.ExtraHours} />
          <input type="hidden" name="Manager" value={employeeData.Manager} />
          <section class="middle">
            <label htmlFor="DateWorked">Fecha laborada:</label>
            <DatePicker
              id="date"
              name="date"
              style={{ width: "50%" }}
              placeholder="Añadir Fecha"
              title="Ingrese la fecha"
              value={date}
              onChange={(value) => setDate(value)}
              required
            />
          </section>
          <section>
            <Select
              id="hora"
              placeholder="Seleccionar tipo hora"
              title="Seleccione tipo hora"
              value={hora}
              onChange={(value) => setHora(value)}
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
              value={extraHours}
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

export default ExtraHours;

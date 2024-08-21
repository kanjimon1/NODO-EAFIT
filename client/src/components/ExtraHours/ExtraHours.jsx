import React, { useState } from "react";
import logo from "../../pics/login-type-amadeus.png";
import { Select, DatePicker, Input } from "antd";
const { Search, TextArea } = Input;
import moment from "moment";

export const ExtraHours = () => {

  const [employeeData, setEmployeeData] = useState({
    EmployeeId: 0,
    EmployeeName: '',
    JobName: '',
    Salary: 0,
    Manager: '',
    HourPrice: 0
  });

  const [fecha, setDate] = useState(null);
  const [extraHourType, setHora] = useState('');
  const [amountExtraHours, setExtraHours] = useState('');
  const [comments, setObservaciones] = useState('');

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
        Salary: data.Salary || '',
        hourlyRate: data.hourlyRate || '',
        Date: data.Date || '',
        Manager: data.Manager || '',
        observaciones: data.observaciones || '',        
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
    //e.preventDefault();

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
          Salary: employeeData.Salary,
          Manager: employeeData.Manager,
          HourPrice: employeeData.hourlyRate,
          Fecha: fecha,
          ExtraHourType: extraHourType,
          AmountExtraHours: amountExtraHours,
          Comments: comments,
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
            <h6><bold>EmployeeId:</bold> <p style={{ color: 'red' }}> {employeeData.EmployeeId}</p></h6>
            <h6>EmployeeName: <p style={{ color: 'red' }}>{employeeData.EmployeeName}</p></h6>
            <h6>JobName: <p style={{ color: 'red' }}> {employeeData.JobName}</p></h6>
            <h6>Salario: <p style={{ color: 'red' }}>{employeeData.Salary}</p></h6>            
            <h6>Manager: <p style={{ color: 'red' }}>{employeeData.Manager}</p></h6>            
            <h6>Valor hora (salario / 240 hrs por mes): <p style={{ color: 'red' }}> {employeeData.hourlyRate}</p></h6>
          </section>
          <input type="hidden" name="EmployeeId" value={employeeData.EmployeeId} />
          <input type="hidden" name="EmployeeName" value={employeeData.EmployeeName} />          
          <input type="hidden" name="Manager" value={employeeData.Manager} />
          <section class="middle">
            <label htmlFor="DateWorked">Fecha laborada:</label>
            <DatePicker
              id="date"
              name="date"
              style={{ width: "50%" }}
              placeholder="Añadir Fecha"
              title="Ingrese la fecha"
              value={fecha}
              onChange={(value) => setDate(value)}
              format="YYYY-MM-DD HH:MM:II"
              required
            />
          </section>
          <p>
          <section>
          <label htmlFor="DateWorked">Tipo de hora laborada y porcentaje:</label>
            <Select
              id="hora"
              placeholder="Tipo de hora laborada"
              title="Tipo de hora laborada"
              value={extraHourType}
              onChange={(value) => setHora(value)}
              style={{ width: '200px' }}
            >
              <Option value="25">Diurna 25%</Option>
              <Option value="75">Diurna Festiva 75%</Option>
              <Option value="100">Nocturna 100%</Option>
              <Option value="150">Nocturna Festiva 150%</Option>
            </Select>
            </section>
          </p>          
            <section>
            <label htmlFor="ExtraHour">Cantidad Horas Extra:</label>
            <input
              type="text"
              id="extraHour"
              name="extraHour"
              placeholder="extrahour"
              title="Enter Extra Hour"
              value={amountExtraHours}
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
              value={comments}
            />
          </section>
        </article>       
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ExtraHours;

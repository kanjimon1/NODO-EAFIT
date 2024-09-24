import React, { useState } from "react";
import logo from "../../pics/login-type-amadeus.png";
import { Select, DatePicker, Input } from "antd";
const { TextArea } = Input;
import moment from "moment";

export const UpdateExtraHours = ({ employee }) => {

  const empId = employee?.id;  
  const [fecha, setDate] = useState(employee?.Date ? moment(employee.Date) : null);  
  const [extraHourType, setHourType] = useState(employee?.ExtraHourType || "");
  const [amountExtraHours, setAmountExtraHours] = useState(employee?.AmountExtraHours || "");
  const [comments, setComments] = useState(employee?.Comments || "");
    
  console.log(`valor de empleado id`,employee);

  const handleDateChange = (Fecha) => {
    setDate(Fecha);
  };

  const handleSubmit = async (e) => {
    //e.preventDefault();

    const updatedData = {
      id: empId,
      EmployeeId: employee.EmployeeId,
      EmployeeName: employee.EmployeeName,
      JobName: employee.JobName,
      Salary: employee.Salary,
      Manager: employee.Manager,
      HourPrice: employee.HourPrice,
      Fecha: fecha,
      ExtraHourType: extraHourType,
      AmountExtraHours: amountExtraHours,
      Comments: comments,
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
      <h1 className="sr-only">Añadir Hora Extra</h1>      
      <img alt="Amadeus" src={logo} />
      <h2>Añadir Hora Extra</h2>
      <form id="horasExtrasForm" onSubmit={handleSubmit}>        
        <br/>
        <article>
          <section class="search">            
            <br />
            <h6><strong>Id:</strong> <p style={{ color: 'red' }}> {empId}</p></h6>
            <h6><strong>EmployeeId:</strong> <p style={{ color: 'red' }}> {employee.EmployeeId}</p></h6>
            <h6><strong>EmployeeName: <p style={{ color: 'red' }}>{employee.EmployeeName}</p></strong></h6>
            <h6><strong>JobName: <p style={{ color: 'red' }}> {employee.JobName}</p></strong></h6>
            <h6><strong>Salario: <p style={{ color: 'red' }}>{employee.Salary}</p></strong></h6>            
            <h6><strong>Manager: <p style={{ color: 'red' }}>{employee.Manager}</p></strong></h6>   
            <h6><strong>Valor hora (salario / 240 hrs por mes): <p style={{ color: 'red' }}> {employee.HourPrice}</p></strong></h6>
          </section>
          <section class="middle">
            <label htmlFor="DateWorked">Fecha laborada:</label>
            <DatePicker
              id="date"
              name="date"
              style={{ width: "50%" }}
              placeholder="Añadir Fecha"
              title="Ingrese la fecha"
              value={fecha}
              onChange={handleDateChange}              
              format="YYYY-MM-DD HH:MM:II"
              required
            />
          </section>
          <p>
          <section>
          <label htmlFor="extraHourType">Tipo de hora laborada y porcentaje:</label>
            <Select
              id="extraHourType"
              placeholder="Tipo de hora laborada"
              title="Tipo de hora laborada"
              value={extraHourType}              
              onChange={(value) => setHourType(value)}
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
              onChange={(e) => setAmountExtraHours(e.target.value)}
              required
            />
          </section>
          <section class="textarea">
            <TextArea
              showCount
              maxLength={100}              
              onChange={(e) => setComments(e.target.value)}
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

export default UpdateExtraHours;

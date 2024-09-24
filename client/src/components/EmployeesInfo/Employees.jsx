import React, { useEffect, useState } from "react";
import logo from "../../pics/login-type-amadeus.png";
import { Select } from "antd";
import background from '../../pics/mainBackground.png';

export const Employees = () => {

  const [employeeId, setEmployeeId] = useState([]);
  const [employeeName, setEmployeeName] = useState(null);
  const [jobName, setJobName] = useState('');
  const [salary, setSalary] = useState('');
  const [manager, setManager] = useState('');

    //Para guardar la hora extra
    const handleSubmit = async (e) => {

      console.log('ingresando los siguientes empleados: ',employeeId,
        employeeName,
        jobName,
        salary,
        manager);

      //e.preventDefault();
      try {
        const response = await fetch("http://localhost:5173/insertEmployees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ EmployeeId: employeeId,
            EmployeeName: employeeName,
            JobName: jobName,
            Salary: salary,
            Manager: manager,
          }),
        });
        if (!response.ok) {
          const text = await response.text();
          console.error("Response text:", text);
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
  
        if (data.success) {
          alert("Datos guardados con éxito " + data.message + ", los siguientes datos: " +data.record);        
        } else {
          alert("hubo un error al insertar la información " + data.error);
        }
      } catch (error) {
        console.error("There was an error fetching the users data:", error);
      }
  };
  
  return (
    <div id="wrapper" style={{ backgroundColor: "transparent", minHeight: "100%", width: "100%" }}>
      <h1 className="sr-only">Empleados</h1>
      <div id="horas">
        <img alt="Amadeus" src={logo} />
        <h2>Empleados</h2>
        <form id="employessForm" onSubmit={handleSubmit}>
          <article>
            <section>
              <label htmlFor="EmployeeId">Id empleado:</label>
              <input
                type="text"
                id="EmployeeId"
                name="EmployeeId"
                placeholder="Id empleado"
                onChange={(e) => setEmployeeId(e.target.value)}
                value={employeeId}
                required
              />
              </section>
              <section>
              <label htmlFor="EmployeeId">Nombre empleado: </label>
              <input
                type="text"
                id="EmployeeName"
                name="EmployeeName"
                placeholder="Ingrese nombre empleado"
                title="Ingrese nombre empleado"
                onChange={(e) => setEmployeeName(e.target.value)}
                value={employeeName}
                required
              />
              </section>
              <section>
              <label htmlFor="salary">Salario: </label>
              <input
                type="text"
                id="salary"
                name="salary"
                placeholder="Ingrese salario"
                title="Ingrese salario"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}                
                required
              />
              </section>
              <section>
              <label htmlFor="jobName">Cargo:</label>
              <Select
                id="jobName"
                placeholder="Seleccionar cargo"
                title="Seleccione el cargo"
                value={jobName}
                onChange={(value) => setJobName(value)}
                style={{ width: '200px' }}
              >
                <Option value="DevOps">DevOps</Option>
                <Option value="DBA">DBA</Option>
                <Option value="SRE">Site Reliability Engineering</Option>
                <Option value="DEVELOPER">Developer</Option>
                <Option value="SECOPS">Security</Option>
              </Select>
            </section>
            <section>
              <label htmlFor="manager">Id Gerente:</label>            
              <Select
                id="manager"
                placeholder="Seleccionar gerente"
                title="Seleccione gerente"
                value={manager}
                onChange={(value) => setManager(value)}
                style={{ width: '200px' }}
              >
                <Option value="001">001 John Doe</Option>
                <Option value="002">002 Regina Smith</Option>
                <Option value="003">003 Kyle Bennett</Option>
              </Select>
              </section>
              <section>
            </section>
            <section>
              <button type="submit">Send</button>
            </section>
          </article>
        </form>
      </div>
    </div>
  );
};

export default Employees;

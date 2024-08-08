import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import './EmployeeGrid.scss';

//export const EmployeesGrid = () => {
  
  /*const employee = async () => {
    
    const response = await fetch('http://localhost:5173/employees');
    const data = await response.json();
    console.log(data);
  }

  return (
    <h3>{employee.EmployeeName}</h3>
  );*/
  
  export const EmployeesGrid = () => {
    const [employees, setEmployees] = useState([]);
  
    useEffect(() => {
      const fetchEmployees = async () => {
        try {
          const response = await fetch('http://localhost:5173/employees');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          //console.log(response);
          const data = await response.json();
          setEmployees(data);
          console.log(setEmployees(data));
        } catch (error) {
          console.error("There was an error fetching the employees data:", error);
        }
      };
  
      fetchEmployees();
      console.log(fetchEmployees());
    }, []);
  

    return (
      <div className="employees-grid">
        {employees.length > 0 ? (
          employees.map((employee, index) => (
            <div key={index} className="employee-card">
              <h3>{employee.EmployeeId}</h3>
              <p>{employee.EmployeeName}</p>
              {/* Add other employee details as needed */}
            </div>
          ))
        ) : (
          <p>No employees found.</p>
        )}
      </div>
    );
  };
  
  //export default EmployeesGrid;
  
  /*const [employees, setEmployees] = useState([]);

  useEffect(() => {
    //axios.get('../../../../server/apis/Employees')
    //axios.get('http://localhost:3500/employees')
    axios.get('http://localhost:5173/employees')
      .then(response => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setEmployees(response.data);
        }else {
          console.error("Expected an array but got:", response.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the employee data!', error);
      });
  }, []);*/

  /*return (
    <div className="grid-container">
      {employees.length > 0 ? (
      employees.map((employee, index) => (
        <div key={employee.EmployeeId} className="grid-item">
        <h3>{employee.EmployeeName}</h3>
        <p>{employee.JobName}</p>
        <p>{employee.ExtraHours}</p>
        <p>{employee.Date}</p>
        <p>{employee.Manager}</p>
        </div>
      ))) : (
        <p>No employees found.</p>)}
    </div>
  );*/
//};

//export default EmployeesGrid;

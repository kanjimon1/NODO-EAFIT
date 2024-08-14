import React, { useEffect, useState } from "react";
import { Table } from "antd";

export const EmployeesGrid = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5173/employees");
        if (!response.ok) {
          throw new Error("Network response was not ok");
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

  // Define columns for the table
  const columns = [
    {
      title: "Employee ID",
      dataIndex: "EmployeeId",
      key: "EmployeeId",
    },
    {
      title: "Employee Name",
      dataIndex: "EmployeeName",
      key: "EmployeeName",
    },
    // Add more columns as needed
  ];

  return (
    <div className="employees-grid">
      {employees.length > 0 ? (
        <Table
          columns={columns}
          dataSource={employees}
          rowKey="EmployeeId" // Specify the unique key for each row
          pagination={false} // You can enable pagination if needed
        />
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

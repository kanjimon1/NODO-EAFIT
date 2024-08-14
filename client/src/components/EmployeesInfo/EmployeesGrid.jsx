import React, { useEffect, useState } from "react";
//import { Table } from "antd";
import logo from "../../pics/login-type-amadeus.png";
import Employees from "./Employees";
import { Table, Button, Modal } from 'antd';
import ExtraHours from '../ExtraHours/ExtraHours';

export const EmployeesGrid = () => {
  const [employees, setEmployees] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

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

  // Handle modal visibility
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle form submission
  {/*const onFinish = (values) => {
    console.log('Form values:', values);
    // Here you can add the logic to update the employees list or send the data to an API
    setIsModalVisible(false);
  };*/}


  return (
    <div className="employees-grid">
      <Employees />

      {/* Button to trigger the modal */}
      <Button type="primary" onClick={showModal} style={{ marginBottom: '16px' }}>
        Add Extra Hours
      </Button>

      {/* Modal displaying the ExtraHours component */}
      <Modal
        title="Add Extra Hours"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // Optional: Remove default footer if you want custom buttons
      >
        <ExtraHours /> {/* Render the ExtraHours form here */}
      </Modal>

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

export default EmployeesGrid;
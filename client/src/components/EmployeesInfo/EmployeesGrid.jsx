import React, { useEffect, useState } from "react";
//import { Table } from "antd";
import logo from "../../pics/login-type-amadeus.png";
import Employees from "./Employees";
import { Table, Button, Modal } from 'antd';
import ExtraHours from '../ExtraHours/ExtraHours';
import UpdateExtraHours from "../ExtraHours/UpdateExtraHours";

export const EmployeesGrid = () => {
  
  const [employees, setEmployees] = useState([]);
  //const [isModalVisible, setIsModalVisible] = useState(false);
  //const [currentEmployee, setCurrentEmployee] = useState(null); 

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

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
      title: "Cédula",
      dataIndex: "EmployeeId",
      key: "EmployeeId",
    },
    {
      title: "Nombre Empleado",
      dataIndex: "EmployeeName",
      key: "EmployeeName",
    },
    {
      title: "Cargo",
      dataIndex: "JobName",
      key: "JobName",
    },
    {
      title: "Horas Extras",
      dataIndex: "ExtraHours",
      key: "ExtraHours",
    },
    {
      title: "Fecha",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "Supervisor",
      dataIndex: "Manager",
      key: "Manager",
    },
    {
      title: 'Actualizar',
      key: 'Actualizar',
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => handleUpdateClick(record)}
        >
          Actualizar
        </Button>
      ),
    },
    {
      title: 'Eliminar',
      key: 'Eliminar',
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => handleDeleteClick(record)}
        >
          Eliminar
        </Button>
      ),
    },
    // Add more columns as needed
  ];

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  
  const handleAddOk = () => {
    setIsAddModalVisible(false);
  };
  
  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };
  
  const showUpdateModal = (employee) => {
    setCurrentEmployee(employee);
    setIsUpdateModalVisible(true);
  };
  
  const handleUpdateOk = () => {
    setIsUpdateModalVisible(false);
  };
  
  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
  };

  return (
    <div className="employees-grid">
      
      <Employees />

      {/* Button to trigger the modal */}
      <Button type="primary" onClick={showAddModal} style={{ marginBottom: '16px' }}>
        Añadir horas extra
      </Button>

      {/* Modal displaying the ExtraHours component */}
      <Modal
        title="Añadir Hora Extra"
        visible={isAddModalVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        footer={null} // Optional: Remove default footer if you want custom buttons
      >
        <ExtraHours /> {/* Render the ExtraHours form here */}
      </Modal>

      {employees.length > 0 ? (
        <Table
          columns={columns}
          dataSource={employees}
          rowKey="EmployeeId" // Specify the unique key for each row
          pagination={true} // You can enable pagination if needed
          onRow={(record) => ({
            onClick: () => showUpdateModal(record),
          })}
        />
      ) : (
        <p>No employees found.</p>
      )}
      {/* Modal displaying the ExtraHours component */}
      <Modal
        title="Actualizar Hora Extra Empleado"
        visible={isUpdateModalVisible}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
        footer={null} // Optional: Remove default footer if you want custom buttons
      >

        {currentEmployee && (
          <UpdateExtraHours employee={currentEmployee} />
        )}
      </Modal>
    </div>
  );
};

export default EmployeesGrid;
import React, { useEffect, useState } from "react";
import logo from "../../pics/login-type-amadeus.png";
import Employees from "./Employees";
import { Table, Button, Modal } from "antd";
import ExtraHours from "../ExtraHours/ExtraHours";
import UpdateExtraHours from "../ExtraHours/UpdateExtraHours";
import GenerateReport from "../GenerateReport/GenerateReport";

export const EmployeesGrid = () => {
  const [employees, setEmployees] = useState([]);
  const [hours, setHours] = useState([]);
  //const [isModalVisible, setIsModalVisible] = useState(false);
  //const [currentEmployee, setCurrentEmployee] = useState(null);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
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
    console.log(`MODAL: `, employee);
    setCurrentEmployee(employee);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateOk = () => {
    setIsUpdateModalVisible(false);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
  };

  const handleUpdateClick = (record) => {
    setCurrentEmployee(record);
    setIsUpdateModalVisible(true);
  };

  const handleDeleteClick = (record) => {
    setCurrentEmployee(record);
    setIsDeleteModalVisible(true);
  };

  // Función para manejar el clic en "Eliminar"
  const handleDeleteOk = (record) => {
    Modal.confirm({
      title: "¿Estás seguro de que deseas eliminar este registro?",
      content: `ID: ${record.id} - Nombre: ${record.EmployeeName}`,
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await fetch(
            `http://localhost:5173/deleteExtraHours/${record.id}/true`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error("Error al eliminar el registro");
          }

          const data = await response.json();
          if (data.success) {
            alert("Registro eliminado con éxito");
            setEmployees(employees.filter((emp) => emp.id !== record.id));
          } else {
            alert("Error al eliminar: " + data.message);
          }
        } catch (error) {
          console.error("Hubo un error al eliminar el registro: ", error);
        } finally {
          setIsDeleteModalVisible(false);
          setCurrentEmployee(null);
        }
      },
    });
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setCurrentEmployee(null);
  };

  // Define columns for the table
  const columns = [
    {
      title: "Consecutivo",
      dataIndex: "id",
      key: "id",
    },
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
      title: "Salario",
      dataIndex: "Salary",
      key: "Salary",
    },
    {
      title: "Sypervisor",
      dataIndex: "Manager",
      key: "Manager",
    },
    {
      title: "Valor hora",
      dataIndex: "HourPrice",
      key: "HourPrice",
    },
    {
      title: "Fecha",
      dataIndex: "Fecha",
      key: "Fecha",
    },
    {
      title: "Porcentaje Hora Extra",
      dataIndex: "ExtraHourType",
      key: "ExtraHourType",
    },
    {
      title: "Tipo Hora",
      dataIndex: "TipoHora",
      key: "TipoHora",
    },
    {
      title: "Cantidad horas Extras",
      dataIndex: "AmountExtraHours",
      key: "AmountExtraHours",
    },
    {
      title: "Obervaciones",
      dataIndex: "Comments",
      key: "Comments",
    },
    {
      title: "Total de horas extras",
      dataIndex: "TotalExtraHour",
      key: "TotalExtraHour",
    },
    {
      title: "Total a pagar",
      dataIndex: "TotalPayment",
      key: "TotalPayment",
    },
    {
      title: "Actualizar",
      key: "Actualizar",
      render: (text, record) => (
        <Button type="link" onClick={() => handleUpdateClick(record)}>
          Actualizar
        </Button>
      ),
    },
    {
      title: "Eliminar",
      key: "Eliminar",
      render: (text, record) => (
        <Button type="link" onClick={() => handleDeleteClick(record)}>
          Eliminar
        </Button>
      ),
    },
  ];

  return (
    <div className="employees-grid">
      {/*Fomrulario de ingreso de id empleado, id gerente*/}
      <Employees />

      {/* Button to trigger the modal */}
      <Button
        type="primary"
        onClick={showAddModal}
        style={{ marginBottom: "16px" }}
      >
        Añadir horas extra
      </Button>

      {/* Modal displaying the ExtraHours component */}
      <Modal
        title="Añadir Hora Extra"
        open={isAddModalVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        footer={null} // Optional: Remove default footer if you want custom buttons
      >
        <ExtraHours /> {/* Render the ExtraHours form here */}
      </Modal>

      {/*Tabla par listas las horas extras de los empleados*/}
      {employees.length > 0 ? (
        <Table
          columns={columns}
          dataSource={employees}
          rowKey="id" // Specify the unique key for each row
          //rowKey="ExtraHour" Specify the unique key for each row
          pagination={true} // You can enable pagination if needed
          onRow={(record) => ({
            onClick: () => {
              console.log(
                "VALOR DE LA FILA: ",
                JSON.stringify(record, null, 2)
              );
              console.log("VALOR DE LA FILA 1: ", record);
              showUpdateModal(record);
            },
          })}
        />
      ) : (
        <p>No se encontraron horas extras.</p>
      )}
      {/* Modal displaying the ExtraHours component */}
      <Modal
        title="Actualizar Hora Extra Empleado"
        open={isUpdateModalVisible}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
        footer={null} // Optional: Remove default footer if you want custom buttons
      >
        {currentEmployee && (
          <>
            {console.log("CONSOLE LOG DEL MODAL: ", currentEmployee)}
            <UpdateExtraHours employee={currentEmployee} />
          </>
        )}
      </Modal>
      <Modal
        title="Confirmar eliminación"
        open={isDeleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>
          ¿Estás seguro de que deseas eliminar el registro de{" "}
          {currentEmployee?.EmployeeName}?
        </p>
      </Modal>
      <GenerateReport data={employees} />
    </div>
  );
};

export default EmployeesGrid;

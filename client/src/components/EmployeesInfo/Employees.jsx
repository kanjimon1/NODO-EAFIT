import React, { useEffect, useState } from "react";
//import { Table } from "antd";
import logo from "../../pics/login-type-amadeus.png";
import { Select, DatePicker } from "antd";

export const Employees = () => {
  return (
    <div id="wrap">
      <h1 className="sr-only">Horas Extra</h1>
      <div id="horas">
        <img alt="Amadeus" src={logo} />
        <h2>Horas Extra</h2>
        {/*<form id="loginForm" onSubmit={handleSubmit}>*/}
        <form id="horasForm">
          <article>
            <section>
              <label htmlFor="ExtraHour">Id empleado:</label>
              <input
                type="text"
                id="EmployeeId"
                name="EmployeeId"
                placeholder="Ingrese id empleado"
                title="Ingrese id empleado"
                required
              />
              <label htmlFor="jobName">Cargo:</label>
              <Select
                id="jobName"
                placeholder="Seleccionar cargo"
                title="Seleccione el cargo"
              >
                <Option value="Gerente">Gerente</Option>
                <Option value="Supervisor">Supervisor</Option>
                <Option value="Empleado">Empleado</Option>
              </Select>
            </section>
            <section>
              <label htmlFor="AddPriceHour">Id Gerente:</label>
              <input
                type="text"
                id="manager"
                name="manager"
                placeholder="Id Gerente"
                title="Ingrese id gerente"
                required
              />
              <label htmlFor="DateRange">Rango fecha:</label>
              <DatePicker
                id="date"
                name="date"
                style={{ width: "10%" }}
                placeholder="Añadir Fecha"
                title="Ingrese la fecha"
                required
              />
              
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

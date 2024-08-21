require("dotenv").config();
const { readJsonFile } = require("../utils/json-reader");

const getEmployeesInfo = async (req, res) => {
  try {
    let employeesInfoJSON = [];
    //employeesInfoJSON = await (process.env.JSON_DIR_EMPLOYEES_INFO);
    //employeesInfoJSON = await readJsonFile('./data/Employees.json');
    employeesInfoJSON = await readJsonFile("./data/ExtraHours.json");

    console.log(employeesInfoJSON);

    res.status(200).send(employeesInfoJSON);
  } catch (error) {
    res.status(400);
  }
};

const getEmployeesInfoId = async (req, res) => {
  try {
    const { EmployeeId } = req.params;
    let employeesInfoJSON = [];

    console.log("ENTRANDO AL METODO: ", EmployeeId);

    //employeesInfoJSON = await (process.env.JSON_DIR_EMPLOYEES_INFO);
    employeesInfoJSON = await readJsonFile("./data/Employees.json");

    /*const empId = employeesInfoJSON.find((employee) => {
            return employee.EmployeeId === EmployeeId;
        });*/

    const employee = employeesInfoJSON.find(
      (emp) => emp.EmployeeId === EmployeeId
    );

    if (!employee) {
      return res.status(404).send({ message: "Employee not found" });
    }

    // Calcular el valor de la hora laborada (salary / 240)
    const salary = employee.Salary;
    const hourlyRate = salary / 240;

    // Retornar los datos del empleado incluyendo el valor de la hora laborada
    const employeeData = {
      ...employee,
      hourlyRate: hourlyRate, // Agregar el cálculo del valor de la hora
    };

    console.log(employeeData);

    res.status(200).send(employeeData);

    /*if (empId.length === 0) {
            return res.status(404).send({ message: "Employee not found" });
        }*/

    //console.log(empId);

    //res.status(200).send(empId);
  } catch (error) {
    res.status(400);
  }
};

module.exports = {
  getEmployeesInfo,
  getEmployeesInfoId,
};

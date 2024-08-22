require("dotenv").config();
const { readJsonFile } = require("../utils/json-reader");
const { updateJsonFile } = require("../utils/json-reader");

const getEmployeesInfo = async (req, res) => {
  try {
    let employeesInfoJSON = [];    
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
    
  } catch (error) {
    res.status(400);
  }
};

const addEmployees = async (req, res) => {
  try {
    const { EmployeeId, EmployeeName, JobName, Salary, Manager } = req.body;

    console.log('Llegando al método de insertar empleado: ',EmployeeId, EmployeeName, JobName, Salary, Manager);

    let getEmployeesInfoJSON = [];

    // Validar que el cuerpo de la solicitud tiene los datos necesarios
    if (!EmployeeId || !EmployeeName || !JobName || !Salary || !Manager) {
      return res
        .status(400)
        .send({ error: "Por favor ingrese todos los datos" });
    }

    console.log('HAY DATOS: ',EmployeeId, EmployeeName, JobName, Salary, Manager);

    getEmployeesInfoJSON = await readJsonFile("./data/Employees.json");

    console.log('lectura json empleados: ',getEmployeesInfoJSON);

    // Crear un nuevo ID para el nuevo registro
    const newId =
      getEmployeesInfoJSON.length > 0
        ? getEmployeesInfoJSON[getEmployeesInfoJSON.length - 1].id + 1
        : 1;

        console.log('Nuevo ID: ',newId);

    const existingRecord = getEmployeesInfoJSON.find((record) => record.id === newId);

    console.log('Nuevo ID EXISTE?: ',existingRecord);

    if (existingRecord) {
      return res.status(400).send({ error: "Registro ya existente" });
    }

    console.log('DATOS A INGRESAR: ', newId,
      EmployeeId,
      EmployeeName,
      JobName,
      Salary,
      Manager);

    const newRecord = {
      id: newId,
      EmployeeId,
      EmployeeName,
      JobName,
      Salary,
      Manager,
    };

    getEmployeesInfoJSON.push(newRecord);

    console.log('DATOS INGRESADOS: ',newRecord);

    // Escribir los datos actualizados de vuelta en el archivo
    await updateJsonFile("./data/Employees.json", getEmployeesInfoJSON);

    console.log('DATOS ESCRITOS: ',newRecord);

    //res.status(200).send({ message: 'Record added successfully', record: newRecord });
    res.status(200).json({ success: true, message: "OK", record: newRecord });

    console.log('RESPUESTA RETORNADA: ',newRecord);

  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getEmployeesInfo,
  getEmployeesInfoId,
  addEmployees,
};

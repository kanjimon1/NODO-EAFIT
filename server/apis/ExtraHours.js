require("dotenv").config();
const { readJsonFile } = require("../utils/json-reader");
const { updateJsonFile } = require("../utils/json-reader");

const getExtraHoursInfo = async (req, res) => {
  try {
    let getExtraHoursInfoJSON = [];
    //getExtraHoursInfoJSON = await (process.env.JSON_DIR_EMPLOYEES_INFO);
    getExtraHoursInfoJSON = await readJsonFile("./data/ExtraHours.json");

    res.status(200).send(getExtraHoursInfoJSON);
  } catch (error) {
    res.status(400);
  }
};

const updateExtraHours = async (req, res) => {
  try {   

    const {
      id,
      EmployeeId,
      EmployeeName,
      JobName,
      Salary,
      Manager,
      HourPrice,
      Fecha,
      ExtraHourType,
      AmountExtraHours,
      Comments,
    } = req.body;

    let updateExtraHoursJSON = [];

    //Convertir los string en number para calcular las horas
    const idNumber = Number(id);
    const extraHourTypeNumber = Number(ExtraHourType);
    const amountExtraHours = Number(AmountExtraHours);
    const salary = Number(Salary);

    console.log(`estos son los valores del formulario: 
      ${idNumber} ${Salary} ${Fecha} ${ExtraHourType} ${AmountExtraHours} ${Comments} 
        ${extraHourTypeNumber} ${amountExtraHours} ${salary}`);

    // Validar que el cuerpo de la solicitud tiene los datos necesarios
    if (!Salary || !Fecha || !ExtraHourType || !AmountExtraHours || !Comments) {
      return res
        .status(400)
        .send({ error: "Por favor ingrese todos los siguientes datos" });
    }

    updateExtraHoursJSON = await readJsonFile("./data/ExtraHours.json");

    const index = updateExtraHoursJSON.findIndex((updateExtraHours) => {
      return updateExtraHours.id === idNumber;
    });

    if (index === -1) {
      return res.status(404).send({ error: "Record not found" });
    }

    let precioFinal;

    if (extraHourTypeNumber === 25) {
      precioFinal = HourPrice * 0.25;
    } else if (extraHourTypeNumber === 75) {
      precioFinal = HourPrice * 0.75;
    } else if (extraHourTypeNumber === 100) {
      precioFinal = HourPrice * 1;
    } else if (extraHourTypeNumber === 150) {
      precioFinal = HourPrice * 1.5;
    } else {
      throw new Error("Porcentaje Hora no válido");
    }

    const precioFinal1 = Number(precioFinal);

    //Calcular el valor total de las extras horas trabajadas
    const TotalExtraHour = precioFinal1 * amountExtraHours;

    //Calcular la suma del salario más el total de la horas extras
    const TotalPayment = TotalExtraHour + salary;

    //Para setear el tipo de hora de forma string
    let descripcion;

    switch (extraHourTypeNumber) {
      case 25:
        TipoHoras = "Diurna 25%";
        break;
      case 75:
        TipoHoras = "Diurna Festiva 75%";
        break;
      case 100:
        TipoHoras = "Nocturna 100%";
        break;
      case 150:
        TipoHoras = "Nocturna Festiva 150%";
        break;
      default:
        TipoHoras = "Porcentaje desconocido"; // Opcional, en caso de que el valor no coincida con ningún caso
    }

    updateExtraHoursJSON[index] = {
      ...updateExtraHoursJSON[index],
      EmployeeId,
      EmployeeName,
      JobName,
      Salary,
      Manager,
      HourPrice,
      Fecha,
      ExtraHourType: extraHourTypeNumber,
      TipoHora: TipoHoras,
      AmountExtraHours: amountExtraHours,
      Comments,
      TotalExtraHour,
      TotalPayment,
    };

    await updateJsonFile("./data/ExtraHours.json", updateExtraHoursJSON);

    res
      .status(200)
      .send({ success: true, message: "OK", record: updateExtraHoursJSON });
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteExtraHours = async (req, res) => {
  try {
    const { id, confirmDelete } = req.params;

    const idNumber = Number(id);

    let getExtraHoursInfoJSON = [];

    console.log("DELETE DEL API: ", idNumber, confirmDelete);

    if (!confirmDelete) {
      return res.status(400).send({ error: "Deletion not confirmed" });
    }

    console.log("SE CONFIRMO EL DELETE DEL API? ", idNumber, confirmDelete);

    getExtraHoursInfoJSON = await readJsonFile("./data/ExtraHours.json");

    //const recordIndex = getExtraHoursInfoJSON.find((record) => record.id === idNumber);
    const recordIndex = getExtraHoursInfoJSON.findIndex((record) => record.id === idNumber);

    console.log("ID A ELIMINAR ENCONTRADO? ", recordIndex);

    if (recordIndex === -1) {
      return res.status(404).send({ error: "Record not found" });
    }

    getExtraHoursInfoJSON.splice(recordIndex, 1);

    await updateJsonFile("./data/ExtraHours.json", getExtraHoursInfoJSON);

    console.log("ID A ELIMINAR ENCONTRADO? ", recordIndex);

    //res.status(200).send({ message: "Record deleted successfully" });
    res.status(200).json({ success: true, message: "OK", record: recordIndex });

    console.log("ELIMINÓ CORRECTAMENTE: ", recordIndex);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const addExtraHours = async (req, res) => {
  try {
    const {
      EmployeeId,
      EmployeeName,
      JobName,
      Salary,
      Manager,
      HourPrice,
      Fecha,
      ExtraHourType,
      AmountExtraHours,
      Comments,
    } = req.body;

    let getExtraHoursInfoJSON = [];

    //Convertir los string en number para calcular las horas
    const extraHourTypeNumber = Number(ExtraHourType);
    const amountExtraHours = Number(AmountExtraHours);
    const salary = Number(Salary);

    console.log(`estos son los valores del formulario: ${EmployeeId} ${EmployeeName} 
      ${JobName} ${Salary} ${Manager} ${HourPrice} ${Fecha} ${ExtraHourType} ${AmountExtraHours} ${Comments}`);

    // Validar que el cuerpo de la solicitud tiene los datos necesarios
    if (
      !EmployeeId ||
      !EmployeeName ||
      !JobName ||
      !Salary ||
      !Manager ||
      !HourPrice ||
      !Fecha ||
      !ExtraHourType ||
      !AmountExtraHours ||
      !Comments
    ) {
      return res
        .status(400)
        .send({ error: "Por favor ingrese todos los siguientes datos" });
    }

    getExtraHoursInfoJSON = await readJsonFile("./data/ExtraHours.json");

    // Comprobar si el ID ya existe
    // Crear un nuevo ID para el nuevo registro
    const newId =
      getExtraHoursInfoJSON.length > 0
        ? getExtraHoursInfoJSON[getExtraHoursInfoJSON.length - 1].id + 1
        : 1;

    const existingRecord = getExtraHoursInfoJSON.find(
      (record) => record.id === newId
    );

    if (existingRecord) {
      return res
        .status(400)
        .send({ error: "Record with this ID already exists" });
    }

    //Si la hora normal vale 5000, aplicarle el descuento de 25%, 75% 100% o 150% según el tipo de hora extra
    let precioFinal;

    if (extraHourTypeNumber === 25) {
      precioFinal = HourPrice * 0.25;
    } else if (extraHourTypeNumber === 75) {
      precioFinal = HourPrice * 0.75;
    } else if (extraHourTypeNumber === 100) {
      precioFinal = HourPrice * 1;
    } else if (extraHourTypeNumber === 150) {
      precioFinal = HourPrice * 1.5;
    } else {
      throw new Error("Porcentaje Hora no válido");
    }

    //Calcular el valor total de las extras horas trabajadas
    const TotalExtraHour = precioFinal * amountExtraHours;

    //Calcular la suma del salario más el total de la horas extras
    const TotalPayment = TotalExtraHour + salary;

    //Para setear el tipo de hora de forma string
    let descripcion;

    switch (extraHourTypeNumber) {
      case 25:
        TipoHora = "Diurna 25%";
        break;
      case 75:
        TipoHora = "Diurna Festiva 75%";
        break;
      case 100:
        TipoHora = "Nocturna 100%";
        break;
      case 150:
        TipoHora = "Nocturna Festiva 150%";
        break;
      default:
        TipoHora = "Porcentaje desconocido"; // Opcional, en caso de que el valor no coincida con ningún caso
    }

    const newRecord = {
      id: newId,
      EmployeeId,
      EmployeeName,
      JobName,
      Salary,
      Manager,
      HourPrice,
      Fecha,
      ExtraHourType,
      TipoHora,
      AmountExtraHours,
      Comments,
      TotalExtraHour,
      TotalPayment,
    };

    // Agregar el nuevo registro al array
    getExtraHoursInfoJSON.push(newRecord);

    // Escribir los datos actualizados de vuelta en el archivo
    await updateJsonFile("./data/ExtraHours.json", getExtraHoursInfoJSON);

    //res.status(200).send({ message: 'Record added successfully', record: newRecord });
    res.status(200).json({ success: true, message: "OK", record: newRecord });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getExtraHoursInfo,
  updateExtraHours,
  deleteExtraHours,
  addExtraHours,
};

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
    //const { ExtraHour, AddedPercentage, PriceHour } = req.params;
    const { extraHour, addedPercentage, priceHour } = req.body;

    let getExtraHoursInfoJSON = [];

    const ExtraHour = parseInt(extraHour, 10);
    const AddedPercentage = parseFloat(addedPercentage);
    const PriceHour = parseFloat(priceHour);

    getExtraHoursInfoJSON = await readJsonFile("./data/ExtraHours.json");

    const hourFound = getExtraHoursInfoJSON.find((updateExtraHours) => {
      return updateExtraHours.extraHour === ExtraHour;
    });

    if (hourFound === -1) {
      return res.status(404).send({ error: "Record not found" });
    }

    getExtraHoursInfoJSON[hourFound] = {
      ...getExtraHoursInfoJSON[hourFound],
      addedPercentage: AddedPercentage,
      priceHour: PriceHour,
    };

    await updateJsonFile("./data/ExtraHours.json", getExtraHoursInfoJSON);

    res.status(200).send(getExtraHoursInfoJSON[hourFound]);
  } catch (error) {
    res.status(400);
  }
};

const deleteExtraHours = async (req, res) => {
  try {
    const { ExtraHour, confirmDelete } = req.params;

    let getExtraHoursInfoJSON = [];

    if (!confirmDelete) {
      return res.status(400).send({ error: "Deletion not confirmed" });
    }

    getExtraHoursInfoJSON = await readJsonFile("./data/ExtraHours.json");

    const recordIndex = getExtraHoursInfoJSON.find(
      (record) => record.ExtraHour === ExtraHour
    );

    if (recordIndex === -1) {
      return res.status(404).send({ error: "Record not found" });
    }

    getExtraHoursInfoJSON.splice(recordIndex, 1);

    await updateJsonFile("./data/ExtraHours.json", getExtraHoursInfoJSON);

    //res.status(200).send({ message: "Record deleted successfully" });
    res.status(200).json({ success: true, message: "OK", record: newRecord });
  } catch (error) {
    res.status(400);
  }
};

const addExtraHours = async (req, res) => {
  try {
    //const { ExtraHour, AddedPercentage, PriceHour } = req.params;
    //const { extrahour,addpercentage, addpricehour } = req.body;
    //const { date,hora, extrahour, Obervaciones } = req.body;

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

    //console.log(TotalExtraHour,TotalPayment,precioFinal,ExtraHourType,TipoHora);

    // Crear un nuevo registro
    //const newRecord = { id: newId, ExtraHour, AddedPercentage, PriceHour };
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
    res.status(400).json({error});
  }
};

module.exports = {
  getExtraHoursInfo,
  updateExtraHours,
  deleteExtraHours,
  addExtraHours,
};

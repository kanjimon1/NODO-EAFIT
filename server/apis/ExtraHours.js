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

    const recordIndex = getExtraHoursInfoJSON.find((record) => record.ExtraHour === ExtraHour);

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
    const { extrahour,addpercentage, addpricehour } = req.body;

    let getExtraHoursInfoJSON = [];

    console.log(`estos son los valores del formulario: ${extrahour} ${addpercentage} ${addpricehour}`);

    // Validar que el cuerpo de la solicitud tiene los datos necesarios
    if (!extrahour || !addpercentage || !addpricehour) {
        return res.status(400).send({ error: 'Missing required fields' });
      }

    getExtraHoursInfoJSON = await readJsonFile("./data/ExtraHours.json");

      // Comprobar si el ID ya existe
    const existingRecord = getExtraHoursInfoJSON.find(record => record.ExtraHour === extrahour);

    if (existingRecord) {
        return res.status(400).send({ error: 'Record with this ID already exists' });
      }
     // Crear un nuevo ID para el nuevo registro
     //const newId = getExtraHoursInfoJSON.length > 0 ? getExtraHoursInfoJSON[getExtraHoursInfoJSON.length - 1].id + 1 : 1;

    // Crear un nuevo registro
    //const newRecord = { id: newId, ExtraHour, AddedPercentage, PriceHour };
    const newRecord = { extrahour,addpercentage, addpricehour };   
    
    // Agregar el nuevo registro al array    
    getExtraHoursInfoJSON.push(newRecord);
    
    // Escribir los datos actualizados de vuelta en el archivo
    await updateJsonFile('./data/ExtraHours.json', getExtraHoursInfoJSON);
    
    //res.status(200).send({ message: 'Record added successfully', record: newRecord });
    res.status(200).json({ success: true, message: "OK", record: newRecord });

  } catch (error) {
    res.status(400);
  }
};

module.exports = {
  getExtraHoursInfo,
  updateExtraHours,
  deleteExtraHours,
  addExtraHours,
};

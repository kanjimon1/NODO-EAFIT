require('dotenv').config();
const { readJsonFile } = require('../utils/json-reader');

const getEmployeesInfo = async (req, res) => {        
    try {
        let employeesInfoJSON = [];
        //employeesInfoJSON = await (process.env.JSON_DIR_EMPLOYEES_INFO);
        employeesInfoJSON = await readJsonFile('./data/Employees.json');
        res.status(200).send(employeesInfoJSON);     
    } catch (error) {
        res.status(400);
    }
};

module.exports = {
    getEmployeesInfo,
};
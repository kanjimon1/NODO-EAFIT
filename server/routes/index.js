const express = require('express');

const { getUsersInfo } = require('../apis/usersInfo');
const { getEmployeesInfo } = require('../apis/Employees');
const { getEmployeesInfoId } = require('../apis/Employees');
const { getExtraHoursInfo, updateExtraHours, deleteExtraHours, addExtraHours } = require('../apis/ExtraHours');
const { addEmployees } = require('../apis/Employees');

const router = express.Router();

console.log('index de ROUTES');

router.post('/login', getUsersInfo);
router.post('/insertEmployees', addEmployees);
router.post('/addExtraHours', addExtraHours);
router.get('/employeeId/:EmployeeId', getEmployeesInfoId);
router.get('/employees', getEmployeesInfo);
router.get('/extraHours', getExtraHoursInfo);
router.put('/updateExtraHours', updateExtraHours);
router.delete('/deleteExtraHours/:ExtraHour/:confirmDelete', deleteExtraHours);

module.exports = router;
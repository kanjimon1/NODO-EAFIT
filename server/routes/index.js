const express = require('express');

const { getUsersInfo } = require('../apis/usersInfo');
const { getEmployeesInfo } = require('../apis/Employees');
const { getExtraHoursInfo, updateExtraHours, deleteExtraHours, addExtraHours } = require('../apis/ExtraHours');
//const { exportReport } = require('../apis/ExportFile');

const router = express.Router();

console.log('index de ROUTES');

router.get('/login/:username/:password', getUsersInfo);
router.get('/employees', getEmployeesInfo);
router.get('/extraHours', getExtraHoursInfo);
router.put('/updateExtraHours/:ExtraHour/:AddedPercentage/:PriceHour', updateExtraHours);                     
router.delete('/deleteExtraHours/:ExtraHour/:confirmDelete', deleteExtraHours);
router.post('/addExtraHours/:ExtraHour/:AddedPercentage/:PriceHour', addExtraHours);
//router.get('/exportReport', exportReport);

module.exports = router;
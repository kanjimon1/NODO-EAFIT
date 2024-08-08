require('dotenv').config();
const { readJsonFile } = require('../utils/json-reader');

const getUsersInfo = async (req, res) => {        
    try {

        const { username, password } = req.body;

        let usersInfoJSON = [];
        //employeesInfoJSON = await (process.env.JSON_DIR_EMPLOYEES_INFO);
        usersInfoJSON = await readJsonFile('./data/users.json');

        const user = usersInfoJSON.find(user => user.username === username && user.password === password);

        if (user) {
            // Redirect to success page if credentials are valid
            //res.redirect('../pages/workedHours/ModuloHorasExtrasTrabajadores.html');
            res.redirect('http://localhost:5173/employees');
        } else {
            // Send error message if credentials are invalid
            res.send('Invalid username or password.');
        }       
        
        res.status(200).send(usersInfoJSON);
    } catch (error) {
        res.status(400);
    }
};

module.exports = {
    getUsersInfo,
};
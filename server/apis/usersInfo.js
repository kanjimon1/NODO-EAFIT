require('dotenv').config();
const { readJsonFile } = require('../utils/json-reader');

const getUsersInfo = async (req, res) => {        
    try {

        const { username, password } = req.body;        

        let usersInfoJSON = [];
        //employeesInfoJSON = await (process.env.JSON_DIR_EMPLOYEES_INFO);
        usersInfoJSON = await readJsonFile('./data/users.json');

        const users = usersInfoJSON.find(user => user.username === username && user.password === password);

        if (users) {            
            console.log(usersInfoJSON);
            console.log(users);            
            res.status(200).json({ success: true, message: "OK" });            
        } else {
            // Send error message if credentials are invalid
            res.send('Invalid username or password.');
        }            
        
    } catch (error) {
        res.status(400);
    }
};


module.exports = {
    getUsersInfo,
};
require('dotenv').config();
const express = require('express');
const router = require('./routes');
var cors = require('cors');

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//app.use(express.static('public'));
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

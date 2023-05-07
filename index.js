const express = require('express');
const app = express();
const cookie = require('cookie-parser');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.use('/js', express.static(__dirname + "/public/js"));
app.use('/css', express.static(__dirname + "/public/css"));
app.use('/assets', express.static(__dirname + "/public/assets"));
app.use(cookie());
app.use(express.json());
app.use('/', require('./routes/pages'));
app.use('/api', require('./controllers/auth'));
app.listen(PORT);
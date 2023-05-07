require('dotenv').config();
const db_path = require('path').resolve(__dirname, process.env.CONSUMIDOR_DB_PATH);
const sqlite = require('sqlite3').verbose();

const db_c = new sqlite.Database(db_path, (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('Connected to the consumidor database.');
});

module.exports = db_c;
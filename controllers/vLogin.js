require('dotenv').config();

const jwt = require('jsonwebtoken');
const db_v = require('../routes/vendedor-db-config');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const path = require('path');

const vLogin = async (req, res) => {
    const { name, password } = req.body

    console.log(req.body)

    if (!name || !password) return res.json({status: "error", text: "Please enter a name and password."});
    else {
        // sqlite
        db_v.get('SELECT * FROM loja WHERE name = ?', [name], async (err, row) => {
            if (err) throw err;

            if (!row || !await bcrypt.compare(password, row.password)) return res.json({ status: "error", text: "Incorrect Name or Password" });
            else{
                const token = jwt.sign({ id : row.id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: false
                }
                res.cookie("sellerRegistered", token, cookieOptions);
                return res.json({ status: "success", text: "User logged in successfully." });
            }
        });
    }

}

module.exports = vLogin;
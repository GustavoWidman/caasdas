require('dotenv').config();

const jwt = require('jsonwebtoken');
const db_c = require('../routes/consumidor-db-config');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const path = require('path');

const cLogin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.json({status: "error", text: "Please enter an email and password."});
    else {
        // sqlite
        db_c.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
            if (err) throw err;

            if (!row || !await bcrypt.compare(password, row.password)) return res.json({ status: "error", text: "Incorrect Email or Password" });
            else{
                const token = jwt.sign({ id : row.id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: false
                }
                res.cookie("consumerRegistered", token, cookieOptions);
                return res.json({ status: "success", text: "User logged in successfully.", id:row.id  });
            }
        });
    }

}

module.exports = cLogin;
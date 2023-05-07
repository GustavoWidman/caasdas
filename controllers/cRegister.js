const db_c = require('../routes/consumidor-db-config');
const bcrypt = require('bcryptjs');
const cLogin = require('./cLogin');

const register = async (req, res) => {
    const { email, password:Npassword, wallet } = req.body
    console.log(req.body)
    if (!email || !Npassword) return res.json({status: "error", text: "Invalid email/password."});
    else {
        console.log(email);
        db_c.serialize(() => {
            db_c.get('SELECT email FROM users WHERE email = ?', [email], (err, row) => {
                if (err) {
                    if (err) throw err;
                }
                if (row) {
                    return res.json({status: "error", text: "Email already in use."});
                }

                const hashedPassword = bcrypt.hashSync(Npassword, 8);

                db_c.run('INSERT INTO users (email, password, wallet) VALUES (?, ?, ?)', email, hashedPassword,wallet, (err) => {
                    if (err) {
                        if (err) throw err;
                    }
                    console.log('chegou aqui')
                    cLogin(req, res);
                });
            });
        });
    }
}

module.exports = register;
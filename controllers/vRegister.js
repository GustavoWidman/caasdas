const db_v = require('../routes/vendedor-db-config');
const bcrypt = require('bcryptjs');
const vLogin = require('./vLogin');

const register = async (req, res) => {
    const { name: nome_loja, password:Npassword, wallet } = req.body

    if (!nome_loja || !Npassword) return res.json({status: "error", text: "Invalid name/password."});
    else {
        db_v.serialize(() => {
            db_v.get('SELECT * FROM loja WHERE name = ?', [nome_loja], (err, row) => {
                if (err) {
                    if (err) throw err;
                }
                if (row) {
                    return res.json({status: "error", text: "Name already in use."});
                }

                const hashedPassword = bcrypt.hashSync(Npassword, 8);

                db_v.run('INSERT INTO loja (name, password, wallet) VALUES (?, ?, ?)', nome_loja, hashedPassword, wallet, (err) => {
                    if (err) {
                        if (err) throw err;
                    }
                    vLogin(req, res);
                });
            });
        });
    }
}

module.exports = register;
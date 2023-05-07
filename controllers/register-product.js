const db_v = require('../routes/vendedor-db-config');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const registerProduct = async (req, res) => {
    const { nome : name, preco: price, descricao: description, imagem: image } = req.body
    const imagePlaceholder = "placeholder";
    const id_loja = 1;

    console.log(name, price, description)
    console.log(req.body)
    if (!name || !price || !description) return res.json({status: "error", text: "Invalid name/price/description."});
    else {
        db_v.serialize(() => {
            db_v.get('SELECT * FROM produto WHERE nome = ?', [name], (err, row) => {
                if (err) {
                    if (err) throw err;
                }
                db_v.run('INSERT INTO produto (nome, id_loja preco, descricao, imagem) VALUES (?, ?, ?, ?)', name, id_loja, price, description, imagePlaceholder, (err) => {
                    if (err) {
                        if (err) throw err;
                    }
                    return res.json({status: "success", text: "Product registered successfully."});
                });
            });
        });
    }
}

module.exports = registerProduct;
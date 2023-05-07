const db_v = require('../routes/vendedor-db-config');
const jwt = require('jsonwebtoken');


const vLoggedIn = (req, res, next) => {
    console.log(req.cookies)
    if (!req.cookies.sellerRegistered) {
        return next();
    }
    try {
        const decoded = jwt.verify(req.cookies.sellerRegistered, process.env.JWT_SECRET);
        // sqlite
        db_v.get('SELECT * FROM loja WHERE id = ?', [decoded.id], (err, row) => {
            if (err) {
                return next();
            }
            req.user = row;
            user = row;
            return next();
        });
    } catch (err) {
        if (err) {
            return next();
        }
    }
}

module.exports = vLoggedIn;
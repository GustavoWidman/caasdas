const db_c = require('../routes/consumidor-db-config');
const jwt = require('jsonwebtoken');


const cLoggedIn = (req, res, next) => {
    console.log(req.cookies)
    if (!req.cookies.consumerRegistered) {
        // res.json({status : "error", user: undefined})
        return next();
    }
    try {
        const decoded = jwt.verify(req.cookies.consumerRegistered, process.env.JWT_SECRET);
        // sqlite
        db_c.get('SELECT * FROM users WHERE id = ?', [decoded.id], (err, row) => {
            if (err) {
                // res.json({status : "error", user: undefined})
                return next();
            }
            req.user = row;
            user = row;
            // res.json({status : "success", user: user})
            return next();
        });
    } catch (err) {
        if (err) {
            // res.json({status : "error", user: undefined})
            return next();
        }
    }
}

module.exports = cLoggedIn;
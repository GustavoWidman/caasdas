const express = require('express')

const cLogin = require('./cLogin');
const cRegister = require('./cRegister');
const cLoggedIn = require('./cLoggedIn');

const vLogin = require('./vLogin');
const vRegister = require('./vRegister');
const vLoggedIn = require('./vLoggedIn');

const registerProduct = require('./register-product');



const router = express.Router();

router.post('/consumidor/login', cLogin);
router.post('/consumidor/register', cRegister);
router.post('/consumidor/loggedIn', cLoggedIn);

router.post('/vendedor/login', vLogin);
router.post('/vendedor/register', vRegister);
router.post('/vendedor/loggedIn', vLoggedIn);

router.post('/vendedor/register-product', registerProduct)


router.get('/consumidor/', cLoggedIn, (req, res) => {
    // check if user is logged in
    if (req.user && req.cookies.consumerRegistered) {
        res.json(req.user);
    }
    else {
        // redirect
    }
});

router.get('/vendedor/', vLoggedIn, (req, res) => {
    // check if user is logged in
    if (req.user && req.cookies.sellerRegistered) {
        res.json(req.user);
    }
    else {
        // redirect
    }
});

module.exports = router;
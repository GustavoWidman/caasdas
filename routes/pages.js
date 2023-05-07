const express = require('express'); // This is to load the express module
const vLoggedIn = require("../controllers/vLoggedIn")
const cLoggedIn = require("../controllers/cLoggedIn")

const db_c = require('../routes/consumidor-db-config');
const db_v = require('../routes/vendedor-db-config');

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
// const db = require('../routes/db-config');
const { parse } = require('path');
const router = express.Router(); // This is to create a router object

// Home Page Route
router.get("/", (req, res) => {
    res.sendFile('index.html', {root: './public'});
})

/*
CONSUMER AREA
*/

router.get("/consumer", cLoggedIn, (req, res) => {
    // check if user is logged in
    if ((req.user != undefined) || (req.cookies.consumerRegistered != undefined)) {
        res.redirect("/consumer/home/" + req.user.id)
    } else {
        res.redirect("/consumer/login")
    }
});

router.get("/consumer/login", cLoggedIn, (req, res) => {
    if ((req.user != undefined) || (req.cookies.consumerRegistered != undefined)) {
        res.redirect("/consumer/home/" + req.user.id)
    } else {
        res.sendFile('login.html', {root: './public'});
    }
});

router.get("/consumer/logout", (req, res) => {
    res.clearCookie("consumerRegistered");
    res.redirect("/");
});

router.get("/consumer/register", (req, res) => {
    res.sendFile('register.html', {root: './public'});
});




router.get("/consumer/home/:id", (req, res) => {
    if ((req.user != undefined) || (req.cookies.consumerRegistered != undefined)) {
        res.sendFile('home.html', {root: './public'});
    } else {
        res.redirect("/consumer/login")
    }
});
router.get("/seller/purchase", (req, res) => {

        res.sendFile('purchase.html', {root: './public'});

});
router.get("/consumer/purchase", (req, res) => {
    if ((req.user != undefined) || (req.cookies.consumerRegistered != undefined)) {
        res.sendFile('purchase.html', {root: './public'});
    } else {
        res.redirect("/consumer/login")
    }
});




/*
SELLER AREA
*/

router.get("/seller", vLoggedIn, (req, res) => {
    // check if user is logged in
    if ((req.user != undefined) || (req.cookies.sellerRegistered != undefined)) {
        res.redirect("/seller/home/" + req.user.id)
    } else {
        res.redirect("/seller/login")
    }
});


router.get("/seller/register", (req, res) => {
    res.sendFile('register_vendedor.html', {root: './public'});
});
router.get("/seller/login", (req, res) => {
    res.sendFile('login_vend.html', {root: './public'});
});



router.get("/seller/new-product", vLoggedIn, (req, res) => {
    if ((req.user != undefined) || (req.cookies.sellerRegistered != undefined)) {
        // sends req user to the page aswell
        // creates a column in the table for the user id
        res.sendFile('register_product.html', {root: './public'});
    } else {
        res.redirect("/seller/login")
    }
})


router.get("/seller/home/:id", (req, res) => {
    if ((req.user != undefined) || (req.cookies.sellerRegistered != undefined)) {
        res.sendFile('home_vendedor.html', {root: './public'});
    } else {
        res.redirect("/seller/login")
    }
});

router.get("/seller/logout", (req, res) => {
    res.clearCookie("sellerRegistered");
    res.redirect("/");
});

// FRONT

// router.get("/list", (req, res) => {
//     res.sendFile('listaPessoa.html', {root: './public'});
// });

// router.get("/insert", (req, res) => {
//     res.sendFile('inserePessoa.html', {root: './public'});
// });

// router.get("/delete", (req, res) => {
//     res.sendFile('deletePessoa.html', {root: './public'});
// });

// router.get("/update", (req, res) => {
//     res.sendFile('updatePessoa.html', {root: './public'});
// });

module.exports = router;
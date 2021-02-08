var express = require('express');
var router = express.Router();
const marketPlace = require('../models/marketPlace');
const api = require('../models/api');
const user = require('../models/user');
/* GET home page. */
router.get('/marketPlace', function(req, res) {
    marketPlace.find(function(err, data) {
        res.send(data);
    });
});

router.get('/api', function(req, res) {
    api.find(function(err, data) {
        res.send(data);
    });
});

router.get('/user', function(req, res) {
    user.find(function(err, data) {
        res.send(data);
    });
});
/* add data to marketPlace */
router.post('/marketPlace', function(req, res) {
    let mp = new marketPlace({
        marketPlaceName: req.body.marketPlaceName,
        logo: req.body.logo,
        description: req.body.description,
        isAuthenticationRequired: req.body.isAuthenticationRequired,
        categoryId: req.body.categoryId,
        isAuthenticationTypeId: req.body.isAuthenticationTypeId
    });

    mp.save(function(err, data) {
        if (err) {
            console.log(err);
        }
    });
});

/* api */
router.post('/api', function(req, res) {
    let ap = new api({
        marketPlaceId: req.body.marketPlaceId,
        methodType: req.body.methodType,
        methodRoute: req.body.methodRoute,
        url: req.body.url,
        parameters: req.body.parameters,
        respone: req.body.respone,
        description: req.body.description
    });

    ap.save(function(err, data) {
        if (err) {
            console.log(err);
        }
    });
});

/* user */
router.post('/user', function(req, res) {
    let ur = new user({
        marketPlaceId: req.body.marketPlaceId
    });
    ur.save(function(err, data) {
        if (err) {
            console.log(err);
        }
    });

});
module.exports = router;
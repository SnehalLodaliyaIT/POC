var express = require('express');
var router = express.Router();
var db = require('../config/db');
const marketPlacesOfUser = require('../models/marketPlacesOfUser');
const user = require('../models/user');
const marketPlace = require('../models/marketPlace');
const bodyParser = require('body-parser');

router.get('/user/marketPlacesOfUser', (req, res, next) => {
    marketPlacesOfUser.find().populate('userId').populate('marketPlaceId').then(data => {
        res.send({
            CODE: 200,
            Data: {
                message: "MarketPlaces Of user's Data",
                data: data
            }
        })
    })
});

router.get('/user/marketPlacesOfUser/getMarketPlacesOfUser/:id', (req, res, next) => {
    try {

        marketPlacesOfUser.findOne({ _id: req.params.id }).populate('userId').populate('marketPlaceId').then(data => {
            res.send({
                CODE: 200,
                Data: {
                    message: "Data fetched Successfully",
                    data: data
                }
            });
        }).catch(err => {
            res.send({
                CODE: 500,
                Data: {
                    message: 'Database err',
                    data: err
                }
            })
        })
    } catch (err) {
        res.send({
            CODE: 400,
            Data: {
                message: "Something Bad Happened",
                data: err
            }
        })
    }

});


router.post('/user/marketPlacesOfUser/addMarketPlacesOfUser', async (req, res, next) => {
    try {
        let marketPlacesOfUserData = new marketPlacesOfUser();
        if (req.body.userId) {
            let refData = await user.findOne({ _id: req.body.userId });
            if (refData) {
                marketPlacesOfUserData.userId = refData._id;
            }
        }
        if (req.body.marketPlaceId) {
            let refData = await marketPlace.findOne({ _id: req.body.marketPlaceId });
            if (refData) {
                marketPlacesOfUserData.marketPlaceId = refData._id;
            }
        }
        marketPlacesOfUserData.secretKey = req.body.secretKey;
        marketPlacesOfUserData.isAuthorized = req.body.isAuthorized;
        marketPlacesOfUserData.save().then((data) => {
            res.send({
                CODE: 200,
                Data: {
                    message: "MarketPlaces Of User Added",
                    data: data
                }
            })
        }).catch((err) => {
            res.send({
                CODE: 500,
                Data: {
                    message: "Database error",
                    data: err
                }
            })
        })

    } catch (err) {
        res.send({
            CODE: 400,
            Data: {
                message: "Bad request",
                data: err
            }
        })
    }

});

router.put('/user/marketPlacesOfUser/updateMarketPlacesOfUser', async (req, res, next) => {
    try {
        let updateMarketPlacesOfUserData = new marketPlacesOfUser();
        if (req.body.userId) {
            let refData = await user.findOne({ _id: req.body.userId });
            if (refData) {
                updateMarketPlacesOfUserData.userId = refData._id;
            }
        }
        if (req.body.marketPlaceId) {
            let refData = await marketPlace.findOne({ _id: req.body.marketPlaceId });
            if (refData) {
                updateMarketPlacesOfUserData.marketPlaceId = refData._id;
            }
        }
        if (req.body.secretKey) {
            updateMarketPlacesOfUserData.secretKey = req.body.secretKey;
        }
        if (req.body.isAuthorized) {
            updateMarketPlacesOfUserData.isAuthorized = req.body.isAuthorized;
        }
        marketPlacesOfUserData.updateOne({ _id: req.params.id }, { $set: updateMarketPlacesOfUserData }).then((data) => {
            res.send({
                CODE: 200,
                Data: {
                    message: "MarketPlaces Of User Updated",
                    data: data
                }
            })
        }).catch((err) => {
            res.send({
                CODE: 500,
                Data: {
                    message: "Database error",
                    data: err
                }
            })
        })

    } catch (err) {
        res.send({
            CODE: 400,
            Data: {
                message: "Bad request",
                data: err
            }
        })
    }

});

module.exports=router;

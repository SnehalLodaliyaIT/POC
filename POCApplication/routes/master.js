var express = require('express');
var router = express.Router();
var db = require('../config/db');
const Master = require('../models/master');
const bodyParser = require('body-parser');
const { model } = require('../config/db');

router.use(bodyParser.json());
router.get('/', (req, res, next) => {
    res.send('default router');
});

router.get('/getMasterData', (req, res, next) => {
    Master.find({ isActive: true }).populate('parentId').then(data => {
        res.send({
            CODE: 200,
            Data: {
                message: "Master Data",
                data: data
            }
        })
    })
});

router.post('/addMasterData', async(req, res, next) => {
    try {
        let masterData = new Master();
        masterData.name = req.body.name;
        masterData.code = req.body.code;
        masterData.description = req.body.description;
        masterData.normalizeName = (req.body.name).toLowerCase();
        if (req.body.parentId) {
            masterData.parentId = req.body.parentId;
            let refData = await Master.findOne({ _id: req.body.parentId });
            masterData.parentName = refData.name;
        }
        masterData.save().then((data) => {
            res.send({
                CODE: 200,
                Data: {
                    message: "Master Added",
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

router.get('/getMasterData/:id', (req, res, next) => {
    try {

        Master.findOne({ _id: req.params.id }).populate('parentId').then(data => {
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

router.put('/updateMasterData/:id', (req, res, next) => {
    let updatedMaster = new Master();
    updatedMaster.id = req.params.id;
    if (req.body.name) {
        updatedMaster.name = req.body.name;
        updatedMaster.normalizeName = (req.body.name).toLowerCase();
    }
    if (req.body.description) {
        updatedMaster.description = req.body.description;
    }
    Master.updateOne({ _id: req.params.id }, { $set: updatedMaster }).then(data => {
        res.send({
            CODE: 200,
            Data: {
                message: "Master Updated Successfully",
                data: data
            }
        });
    }).catch(err => {
        res.send({
            CODE: 500,
            Data: {
                message: 'Database err',
                data: err.message
            }
        })
    })
})

module.exports = router;
const express = require("express");
const router = express.Router();
const https = require('https');

router.get('github-users/:user', (req, res) => {
    let options = {
        url: 'https://api.github.com/users/:user'
    }
    if (element.parameters) {
        Object.assign(options, { 'user': req.body.user })

    }
    https.get(options, (response) => {
        let anyData = {};
        response.on('data', (chunk) => {
            anyData += chunk;;
        });

        response.on('end', () => {
            res.send(anyData);
        })
    })
});
router.post('github-users/:user', (req, res) => {
    let options = {
        url: 'https://api.github.com/users/:user'
    }
    if (element.parameters) {
        Object.assign(options, { 'username': req.body.username })

    }
    https.post(options, (response) => {
        let anyData = {};
        response.on('data', (chunk) => {
            anyData += chunk;;
        });

        response.on('end', () => {
            res.send(anyData);
        })
    })
});
module.exports = router;
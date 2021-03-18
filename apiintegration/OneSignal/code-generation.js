const axios = require('axios');
let data = { "app_id": "14b7494e-1c0f-472c-a3f9-0fb57d246b70", "contents": { "en": "English Message" }, "included_segments": ["Subscribed Users"] };

var config = {
    method: 'POST',
    url: 'https://onesignal.com/api/v1/notifications',
    headers: {

        'Content-Type': 'application/json; charset=utf-8',


        'Authorization': 'Basic NmVkZTZhODMtYmMzZi00YTllLThmZmMtZWMxNGEwZWY3ZDE3',

    },
    data: data
}

axios(config)
    .then(function (response) {
        res.send(JSON.stringify(response.data))
    })
    .catch(function (error) {
        res.send(JSON.stringify(error))
    });
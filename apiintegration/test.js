var axios = require('axios');


var config = {
    method: 'post',
    url: 'https://gitlab.com/api/v4/projects/projects/',
    headers: {

        'Content-Type': 'application/json',



        'Authorization': 'Bearer ytxGD7exT_Qe9YVxuLJC'


    }
};

axios(config)
    .then(function (response) {
        res.send(JSON.stringify(response.data))
    })
    .catch(function (error) {
        res.send(JSON.stringify(error))
    });
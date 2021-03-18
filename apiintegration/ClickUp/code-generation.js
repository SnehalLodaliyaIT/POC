const axios = require('axios');
let data = {};



var config = {
    method: 'GET',
    url: 'https://api.clickup.com/api/v2/team',
    headers: {
        
        
            'Authorization': 'Bearer pk_3377822_Q6FZBYJTK3I2U8AV5MIFQ8UR8G1U6SJ9',
         
    },
    
}

axios(config)
.then(function (response) {
    res.send(JSON.stringify(response.data))
})
.catch(function (error) {
    res.send(JSON.stringify(error))
});
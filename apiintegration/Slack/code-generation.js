const axios = require('axios');
let data = {"name":"something-urgent"};

var config = {
    method: 'POST',
    url: 'https://slack.com/api/conversations.create',
    headers: {
        
            'Content-Type': 'application/json',
        
        
            'Authorization': 'Bearer xoxp-1761069917364-1740130342359-1852977026151-b5d3c5338b567ea1f1c768044f64e4a0',
         
    },
    data : data
}

axios(config)
.then(function (response) {
    res.send(JSON.stringify(response.data))
})
.catch(function (error) {
    res.send(JSON.stringify(error))
});
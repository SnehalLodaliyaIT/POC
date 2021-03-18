const axios = require('axios');
let data = {}



var config = {
    method: 'get',
    url: 'https://coruscate3.teamwork.com//latestActivity.json',
    headers: {
        
        
            'Authorization': 'Basic dHdwX09QSFJ2c213aExhTG8yNjlIdjd1MHdXZjVzQWg6Q3MjODQ4ODk1MTMwMA==',
         

    },
    
    
    
}

axios(config)
.then(function (response) {
    res.send(JSON.stringify(response.data))
})
.catch(function (error) {
    res.send(JSON.stringify(error))
});
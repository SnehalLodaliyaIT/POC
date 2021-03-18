const axios = require('axios');
let data = {}

var config = {
    method: 'get',
    url: 'https://api.github.com/user?access_token=8b1969e565dbb5aabd2d8008673dc3f1db21198c',
    headers: {
        
         
         
            'Accept': 'application/vnd.github.v3+json'
         

    },
    
    
    
}

axios(config)
.then(function (response) {
    res.send(JSON.stringify(response.data))
})
.catch(function (error) {
    res.send(JSON.stringify(error))
});
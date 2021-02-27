var axios = require('axios');
var base64 = require('js-base64')

let request = {
    url: 'https://gmail.googleapis.com/gmail/v1/users/kajalmorker1@gmail.com/messages',
    headers: {
        "Authorization": 'Bearer ya29.A0AfH6SMCU2P6lzE5fcSK1OEi94AUzD6667dt_Po-BMrBZ6cX2uTm9GDAScKPAteJOZ-mYZ0mEgUsgUQDdbPy23eqiSrRd2KNklIWKMqwoWQgiEvoH_WklYPkqcf2lM0RPv6bknE3e3P1JjqQWq_e77ki41LYs'
    }
}

let response = await axios.get(request.url, { headers: request.headers });
if (response) {
    let arrayOfData = []
    for (let i = 0; i < 10; i++) {
        let request1 = {
            url: 'https://gmail.googleapis.com/gmail/v1/users/kajalmorker1@gmail.com/messages' + `/${response.data.messages[i].id}`,
            headers: {
                "Authorization": 'Bearer ya29.A0AfH6SMCU2P6lzE5fcSK1OEi94AUzD6667dt_Po-BMrBZ6cX2uTm9GDAScKPAteJOZ-mYZ0mEgUsgUQDdbPy23eqiSrRd2KNklIWKMqwoWQgiEvoH_WklYPkqcf2lM0RPv6bknE3e3P1JjqQWq_e77ki41LYs'
            }
        }
        let response1 = await axios.get(request1.url, { headers: request1.headers });
        let obj = {
            "messageid": response.data.messages[i].id,
            "response": response1.data
        }
        arrayOfData.push(obj);
    }
    res.send(arrayOfData);
}
else {
    res.send("No messages found");
}

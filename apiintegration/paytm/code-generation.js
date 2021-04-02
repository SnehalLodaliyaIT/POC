const axios = require('axios');
const generate = require('./ChecksumGeneration');
let data = {"body":{"requestType":"Payment","mid":"NUigXp26888780822392","websiteName":"WEBSTAGING","orderId":"314.98501520399657","txnAmount":{"value":"1.00","currency":"INR"},"userInfo":{"custId":"CUST_001"},"callbackUrl":"https://merchant.com/callback"}};
Object.assign(data, {
    head: {
        "signature": await generate(JSON.stringify(data.body))
    }
})
data = JSON.stringify(data);

var config = {
    method: 'POST',
    url: 'https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=NUigXp26888780822392&orderId=314.98501520399657',
    headers: {
        
            'Content-Type': 'application/json',
        
         
    },
     
        data:data
    
}

axios(config)
.then(function (response) {
    let txnToken = response.data.txnToken;
    res.send(JSON.stringify(response.data))
})
.catch(function (error) {
    res.send(JSON.stringify(error))
});
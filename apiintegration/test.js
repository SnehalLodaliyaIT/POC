var axios = require('axios');
var data = {"amount":50000,"currency":"INR","receipt":"rcptid_11"};



var config = {
method: 'post',
url: 'https://api.razorpay.com/v1/orders',
headers: {
'Content-Type': 'application/json',
'Authorization': ''
},
data : data
};

axios(config)
.then(function (response) {
res.send(JSON.stringify(response))
})
.catch(function (error) {
res.send(JSON.stringify(error))
});
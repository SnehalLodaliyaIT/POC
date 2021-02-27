var axios = require('axios');
var data = {};


let qs = require('qs');
data = qs.stringify(data)


var config = {
    method: 'get',
    url: 'https://api.stripe.com/v1/customers',
    headers: {

        'Content-Type': 'application/x-www-form-urlencoded',


        'Authorization': 'Bearer sk_test_51IGODeLmKFVeRxasabVS8cGsHYNc99ClS7dReBchuh5ixIlxtGOUT0EPtPYqpwUd6zX33d430fBiOnXWdiS2066t00P7nusZQG'
    },
    data: data
};

axios(config)
    .then(function (response) {
        res.send(JSON.stringify(response))
    })
    .catch(function (error) {
        res.send(JSON.stringify(error))
    });
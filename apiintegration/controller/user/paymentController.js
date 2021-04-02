let paytmService=require('../../ThirdPartyAPI/paytm/paytm');
let paytmObject = {
  "data": {
    "body": {
      "requestType": "",
      "mid": "",
      "orderId": "",
      "websiteName": "",
      "txnAmount": {
        "value": "",
        "currency": ""
      },
      "userInfo": {
        "custId": ""
      }
    }
  },
  "queryParams": {
    "mid": "",
    "orderId": ""
  }
}
let result=await paytmService.initiateTransaction(paytmObject);
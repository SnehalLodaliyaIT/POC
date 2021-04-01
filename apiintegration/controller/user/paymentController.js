let paytmService=require('../../ThirdPartyAPI/paytm/paytm');
let paytmObject = {
  "queryParams": {
    "id": ""
  },
  "requestParams": {
    "address": {
      "city": "",
      "country": "",
      "line1": "",
      "line2": "",
      "postal_code": "",
      "state": ""
    },
    "description": "",
    "metadata": {},
    "name": "",
    "payment_method": "",
    "phone": "",
    "shipping": {
      "address": {
        "city": "",
        "country": "",
        "line1": "",
        "line2": "",
        "postal_code": "",
        "state": ""
      },
      "name": "",
      "phone": ""
    },
    "balance": "",
    "coupon": "",
    "invoice_prefix": "",
    "invoice_settings": {
      "custom_fields": [],
      "default_payment_method": "",
      "footer": ""
    },
    "next_invoice_sequence": "",
    "preferred_locales": [
      {}
    ],
    "promotion_code": "",
    "source": "",
    "tax_id_data": [
      {}
    ]
  }
}
let result=await paytmService.initiateTransaction(paytmObject);
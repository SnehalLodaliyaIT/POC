var mongoose=require('mongoose');

var marketPlaceSchema=mongoose.model('api',{
    marketPlaceId:{
    type: Schema.Types.ObjectId,
    ref: 'marketPlace'
    },
    MethodType:{type:String},
    Url:{type:String},
    parameters:{type:Array},
    respone:{type:Array},
    Description:{type:String}
   
});
module.exports=categorySchema;
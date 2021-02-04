var mongoose=require('mongoose');

var marketPlaceSchema=mongoose.model('marketPlace',{
    marketPlaceName:{type:String},
    logo:{type:String},
    description:{type:String},
    isAuthenticationRequired:{type:Boolean},
    categoryId:{
    type: Schema.Types.ObjectId,
    ref: 'master'
    },
    isAuthenticationTypeId:{
    type: Schema.Types.ObjectId,
    ref: 'master'
    }
});
module.exports=categorySchema;
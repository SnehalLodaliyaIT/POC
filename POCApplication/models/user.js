var mongoose=require('mongoose');

var marketPlaceSchema=mongoose.model('user',{
    marketPlaceId:{
    type: Schema.Types.ObjectId,
    ref: 'marketPlace'
    }
    
});
module.exports=categorySchema;
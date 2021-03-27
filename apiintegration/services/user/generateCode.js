const utils = require("../../utils/messages")
const stripecode = require('../../STRIPE/app');

async function generateCodeForStripe(objectOfStripe){
    try{
        if (!objectOfStripe.isRepeated) {
            await stripecode.initializeStripeCode(objectOfStripe.Authentication, (error) => {
                return error;
            });
        }
        await stripecode.generateMultipleStripeCode(objectOfStripe.APIs);
        return "Sucessfully generated code for stripe..";
    }catch(error){
        return error;
    }
}


module.exports = {
   generateCodeForStripe 
}


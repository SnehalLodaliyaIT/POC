const utils = require("../../utils/messages")
const stripecode = require('../../STRIPE/app');
const paytmCode = require('../../paytm/app')

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
        throw error;
    }
}

async function generateCodeForPaytm(objectOfPaytm){
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


const utils = require("../../utils/messages")
const importCodeValidation = require("../../utils/validation/user/importCodeValidation");
const validation = require("../../utils/validateRequest");
const service = require("../../utils/dbService");

const generateImportCode = async(req, res) => {

    try {
        
    
         return  utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error,res)
    }
   
}



module.exports={
    
    generateImportCode         
}
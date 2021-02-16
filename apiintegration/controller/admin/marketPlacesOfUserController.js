const marketPlacesOfUser = require("../../model/marketPlacesOfUser")
const utils = require("../../utils/messages")
const marketPlacesOfUserSchemaKey = require("../../utils/validation/marketPlacesOfUserValidation");
const validation = require("../../utils/validateRequest");
const service = require("../../utils/dbService");

const addmarketPlacesOfUser = async(req, res) => {

    try {
        let isValid = validation.validateParamsWithJoi(
            req.body,
            marketPlacesOfUserSchemaKey.schemaKeys
        );
        if (isValid.error) {
           return utils.inValidParam(isValid.details, res);
        } 
            const data = new marketPlacesOfUser({
                ...req.body
            })
    
           const result = await service.createDocument(marketPlacesOfUser,data);
    
         return  utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error,res)
    }
   
}

const bulkInsertmarketPlacesOfUser = async(req,res)=>{

    try {
        let data;
        if(req.body.data !== undefined || req.body.data.length >0){
            data = req.body.data
            const result =await service.bulkInsert(marketPlacesOfUser,data)
            return  utils.successResponse(result, res);
        }else{
            return utils.failureResponse('data is not valid',res)
        }
         
    } catch (error) {
        return utils.failureResponse(error,res)
    }
}
const findAllmarketPlacesOfUser = async(req, res) => {

    try {

        let options = {}
        let query={}
        if (req.body.options !== undefined) {
            options = { ...req.body.options };
        }
        if(req.body.query !==undefined){
            query={...req.body.query}
        }
        console.log(options)
       const result = await service.getAllDocuments( marketPlacesOfUser,query,options);
       
       return utils.successResponse(result, res);
    } catch (error) {  
        return utils.failureResponse(error,res)
    }

}

const getmarketPlacesOfUser = async (req,res)=>{
    try{        
        const result = await service.getSingleDocumentById(marketPlacesOfUser,req.params.id)
        if(result  && result !== undefined){
            return utils.successResponse(result, res);
        }else{
            return utils.recordNotFound([],res)
        }
        
    }catch(error){
        return utils.failureResponse(error,res)
    }
}

const updatemarketPlacesOfUser = async(req, res) => {
    try {
        const data = {
            ...req.body
        }
        let isValid = validation.validateParamsWithJoi(
            data,
            marketPlacesOfUserSchemaKey.schemaKeys
        );
        if (isValid.error) {
           return  utils.inValidParam(isValid.details, res);
        }
        
        const result = await  service.updateDocument(marketPlacesOfUser,req.params.id,data)
        return utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error,res)
    }

}

const bulkUpdatemarketPlacesOfUser =async(req,res)=>{
    try {
        let filter={};
        let data;
        if(req.body.filter !== undefined){
            filter = req.body.filter
        }
        if(req.body.data !== undefined){
            data = req.body.data;

            const result = await service.bulkUpdate(marketPlacesOfUser,filter,data);
            return utils.successResponse(result, res);
        }else{
            return res.status(500).send("data not valid");
        }

    } catch (error) {
        return utils.failureResponse(error,res)
    }    
}



// for soft delete - request { isSoftDelete : true }
const deletemarketPlacesOfUser =async(req, res) => {

    try {
        const isSoftDelete = req.body.isSoftDelete;
        let result;
        if(isSoftDelete){
            result = await service.softDeleteDocument(marketPlacesOfUser,req.params.id);
        }else{
            result = await service.deleteDocument(marketPlacesOfUser,req.params.id);
        }
        return utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error,res)
    }

}


module.exports={
    
        addmarketPlacesOfUser,
        bulkInsertmarketPlacesOfUser,            
        findAllmarketPlacesOfUser,
        getmarketPlacesOfUser,            
        updatemarketPlacesOfUser,
        bulkUpdatemarketPlacesOfUser,            
        deletemarketPlacesOfUser,            
}
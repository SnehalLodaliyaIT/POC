const marketPlace = require("../../model/marketPlace")
const utils = require("../../utils/messages")
const marketPlaceSchemaKey = require("../../utils/validation/marketPlaceValidation");
const validation = require("../../utils/validateRequest");
const service = require("../../utils/dbService");

const addmarketPlace = async(req, res) => {

    try {
        let isValid = validation.validateParamsWithJoi(
            req.body,
            marketPlaceSchemaKey.schemaKeys
        );
        if (isValid.error) {
           return utils.inValidParam(isValid.details, res);
        } 
            const data = new marketPlace({
                ...req.body
            })
    
           const result = await service.createDocument(marketPlace,data);
    
         return  utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error,res)
    }
   
}

const bulkInsertmarketPlace = async(req,res)=>{

    try {
        let data;
        if(req.body.data !== undefined || req.body.data.length >0){
            data = req.body.data
            const result =await service.bulkInsert(marketPlace,data)
            return  utils.successResponse(result, res);
        }else{
            return utils.failureResponse('data is not valid',res)
        }
         
    } catch (error) {
        return utils.failureResponse(error,res)
    }
}
const findAllmarketPlace = async(req, res) => {

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
       const result = await service.getAllDocuments( marketPlace,query,options);
       
       return utils.successResponse(result, res);
    } catch (error) {  
        return utils.failureResponse(error,res)
    }

}

const getmarketPlace = async (req,res)=>{
    try{        
        const result = await service.getSingleDocumentById(marketPlace,req.params.id)
        if(result  && result !== undefined){
            return utils.successResponse(result, res);
        }else{
            return utils.recordNotFound([],res)
        }
        
    }catch(error){
        return utils.failureResponse(error,res)
    }
}

const updatemarketPlace = async(req, res) => {
    try {
        const data = {
            ...req.body
        }
        let isValid = validation.validateParamsWithJoi(
            data,
            marketPlaceSchemaKey.schemaKeys
        );
        if (isValid.error) {
           return  utils.inValidParam(isValid.details, res);
        }
        
        const result = await  service.updateDocument(marketPlace,req.params.id,data)
        return utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error,res)
    }

}

const bulkUpdatemarketPlace =async(req,res)=>{
    try {
        let filter={};
        let data;
        if(req.body.filter !== undefined){
            filter = req.body.filter
        }
        if(req.body.data !== undefined){
            data = req.body.data;

            const result = await service.bulkUpdate(marketPlace,filter,data);
            return utils.successResponse(result, res);
        }else{
            return res.status(500).send("data not valid");
        }

    } catch (error) {
        return utils.failureResponse(error,res)
    }    
}



// for soft delete - request { isSoftDelete : true }
const deletemarketPlace =async(req, res) => {

    try {
        const isSoftDelete = req.body.isSoftDelete;
        let result;
        if(isSoftDelete){
            result = await service.softDeleteDocument(marketPlace,req.params.id);
        }else{
            result = await service.deleteDocument(marketPlace,req.params.id);
        }
        return utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error,res)
    }

}


module.exports={
    
        addmarketPlace,
        bulkInsertmarketPlace,            
        findAllmarketPlace,
        getmarketPlace,            
        updatemarketPlace,
        bulkUpdatemarketPlace,            
        deletemarketPlace,            
}
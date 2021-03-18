const modulesOfMarketPlace = require("../../model/modulesOfMarketPlace")
const utils = require("../../utils/messages")
const modulesOfMarketPlaceSchemaKey = require("../../utils/validation/modulesOfMarketPlaceValidation");
const validation = require("../../utils/validateRequest");
const service = require("../../utils/dbService");

const addmodulesOfMarketPlace = async(req, res) => {

    try {
        let isValid = validation.validateParamsWithJoi(
            req.body,
            modulesOfMarketPlaceSchemaKey.schemaKeys
        );
        if (isValid.error) {
           return utils.inValidParam(isValid.details, res);
        } 
            const data = new modulesOfMarketPlace({
                ...req.body
            })
    
           const result = await service.createDocument(modulesOfMarketPlace,data);
    
         return  utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error,res)
    }
   
}

const bulkInsertmodulesOfMarketPlace = async(req,res)=>{

    try {
        let data;
        if(req.body.data !== undefined || req.body.data.length >0){
            data = req.body.data
            const result =await service.bulkInsert(modulesOfMarketPlace,data)
            return  utils.successResponse(result, res);
        }else{
            return utils.failureResponse('data is not valid',res)
        }
         
    } catch (error) {
        return utils.failureResponse(error,res)
    }
}
const findAllmodulesOfMarketPlace = async(req, res) => {

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
       const result = await service.getAllDocuments( modulesOfMarketPlace,query,options);
       
       return utils.successResponse(result, res);
    } catch (error) {  
        return utils.failureResponse(error,res)
    }

}

const getmodulesOfMarketPlace = async (req,res)=>{
    try{        
        const result = await service.getSingleDocumentById(modulesOfMarketPlace,req.params.id)
        if(result  && result !== undefined){
            return utils.successResponse(result, res);
        }else{
            return utils.recordNotFound([],res)
        }
        
    }catch(error){
        return utils.failureResponse(error,res)
    }
}

const updatemodulesOfMarketPlace = async(req, res) => {
    try {
        const data = {
            ...req.body
        }
        let isValid = validation.validateParamsWithJoi(
            data,
            modulesOfMarketPlaceSchemaKey.schemaKeys
        );
        if (isValid.error) {
           return  utils.inValidParam(isValid.details, res);
        }
        
        const result = await  service.updateDocument(modulesOfMarketPlace,req.params.id,data)
        return utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error,res)
    }

}

const bulkUpdatemodulesOfMarketPlace =async(req,res)=>{
    try {
        let filter={};
        let data;
        if(req.body.filter !== undefined){
            filter = req.body.filter
        }
        if(req.body.data !== undefined){
            data = req.body.data;

            const result = await service.bulkUpdate(modulesOfMarketPlace,filter,data);
            return utils.successResponse(result, res);
        }else{
            return res.status(500).send("data not valid");
        }

    } catch (error) {
        return utils.failureResponse(error,res)
    }    
}



// for soft delete - request { isSoftDelete : true }
const deletemodulesOfMarketPlace =async(req, res) => {

    try {
        const isSoftDelete = req.body.isSoftDelete;
        let result;
        if(isSoftDelete){
            result = await service.softDeleteDocument(modulesOfMarketPlace,req.params.id);
        }else{
            result = await service.deleteDocument(modulesOfMarketPlace,req.params.id);
        }
        return utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error,res)
    }

}


module.exports={
    
        addmodulesOfMarketPlace,
        bulkInsertmodulesOfMarketPlace,            
        findAllmodulesOfMarketPlace,
        getmodulesOfMarketPlace,            
        updatemodulesOfMarketPlace,
        bulkUpdatemodulesOfMarketPlace,            
        deletemodulesOfMarketPlace,            
}
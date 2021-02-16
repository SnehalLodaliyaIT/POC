const master = require("../../model/master")
const utils = require("../../utils/messages")
const masterSchemaKey = require("../../utils/validation/masterValidation");
const validation = require("../../utils/validateRequest");
const service = require("../../utils/dbService");

const addmaster = async(req, res) => {

    try {
        let isValid = validation.validateParamsWithJoi(
            req.body,
            masterSchemaKey.schemaKeys
        );
        if (isValid.error) {
           return utils.inValidParam(isValid.details, res);
        } 
            const data = new master({
                ...req.body
            })
    
           const result = await service.createDocument(master,data);
    
         return  utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error,res)
    }
   
}

const bulkInsertmaster = async(req,res)=>{

    try {
        let data;
        if(req.body.data !== undefined || req.body.data.length >0){
            data = req.body.data
            const result =await service.bulkInsert(master,data)
            return  utils.successResponse(result, res);
        }else{
            return utils.failureResponse('data is not valid',res)
        }
         
    } catch (error) {
        return utils.failureResponse(error,res)
    }
}
const findAllmaster = async(req, res) => {

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
       const result = await service.getAllDocuments( master,query,options);
       
       return utils.successResponse(result, res);
    } catch (error) {  
        return utils.failureResponse(error,res)
    }

}

const getmaster = async (req,res)=>{
    try{        
        const result = await service.getSingleDocumentById(master,req.params.id)
        if(result  && result !== undefined){
            return utils.successResponse(result, res);
        }else{
            return utils.recordNotFound([],res)
        }
        
    }catch(error){
        return utils.failureResponse(error,res)
    }
}

const updatemaster = async(req, res) => {
    try {
        const data = {
            ...req.body
        }
        let isValid = validation.validateParamsWithJoi(
            data,
            masterSchemaKey.schemaKeys
        );
        if (isValid.error) {
           return  utils.inValidParam(isValid.details, res);
        }
        
        const result = await  service.updateDocument(master,req.params.id,data)
        return utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error,res)
    }

}

const bulkUpdatemaster =async(req,res)=>{
    try {
        let filter={};
        let data;
        if(req.body.filter !== undefined){
            filter = req.body.filter
        }
        if(req.body.data !== undefined){
            data = req.body.data;

            const result = await service.bulkUpdate(master,filter,data);
            return utils.successResponse(result, res);
        }else{
            return res.status(500).send("data not valid");
        }

    } catch (error) {
        return utils.failureResponse(error,res)
    }    
}



// for soft delete - request { isSoftDelete : true }
const deletemaster =async(req, res) => {

    try {
        const isSoftDelete = req.body.isSoftDelete;
        let result;
        if(isSoftDelete){
            result = await service.softDeleteDocument(master,req.params.id);
        }else{
            result = await service.deleteDocument(master,req.params.id);
        }
        return utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error,res)
    }

}


module.exports={
    
        addmaster,
        bulkInsertmaster,            
        findAllmaster,
        getmaster,            
        updatemaster,
        bulkUpdatemaster,            
        deletemaster,            
}
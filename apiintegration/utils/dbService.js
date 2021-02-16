


const createDocument =  (model, data) => {

    return new Promise((resolve,reject)=>{
        model.create(data, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
       }) 
}

const updateDocument =  (model, id, data) => {
    return new Promise((resolve,reject)=>{
            model.updateOne({ _id: id }, data, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
       }) 
}

const deleteDocument =  (model, id) => {

    return new Promise((resolve,reject)=>{
        model.deleteOne({ _id: id}, (err, data) => {
            console.log(data)
            if (err) reject(err);
            else resolve(data);
        })
   }) 


}

const getAllDocuments =  (model,query,options) => {

    return new Promise((resolve,reject)=>{
        model.paginate(query, options, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
   }) 

}

const getSingleDocumentById = (model,id)=>{
    return new Promise((resolve,reject)=>{
        model.findOne({_id:id},(err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
   })
}



//  Request Query
// {
//     "query":{
//         "and":[
//             {"Name":"Dhiraj"},{"Salary":300}
//         ],
//         "or":[
//           {"Name":"Dhiraj"},{"Salary":300}
//         ]
//     },
//     "model":"Employee"
// }

const findExistsData = (model,data) => {
    // let { model } = data;
    let { query } = data;
    let { and } = query;
    let { or } = query;
    var q = {};

    if (and) {
        console.log("in add");
        q["$and"] = [];
        for (let index = 0; index < and.length; index++) {
          q["$and"].push(and[index]);
        }
      }
      if (or) {
        q["$or"] = [];
        console.log("in Or");
        for (let index = 0; index < or.length; index++) {
          q["$or"].push(or[index]);
        }
      }

    return new Promise((resolve,reject)=>{
        model.find(q,(err,result)=>{
            if (err) reject(err);
            else resolve(result);
        });
   }) 
    
}

const softDeleteDocument = (model,id) => {
    return new Promise(async(resolve,reject)=>{
      const result = await getSingleDocumentById(model,id)
        result.isDeleted=true
        result.isActive=false
        model.updateOne({ _id: id },result, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
   }) 
}

const bulkInsert = (model,data)=>{
    return new Promise((resolve,reject)=>{

        model.insertMany(data,(err,result)=>{
            if(result.length > 0 || result !== undefined){
                resolve(result)
            }else{
                reject(err)
            }
        })

        
    })
}

const bulkUpdate = (model ,filter,data)=>{
    return new Promise((resolve,reject)=>{
        model.updateMany(filter,data,(err,result)=>{
            if(result !== undefined){
                resolve(result)
            }else{
                reject(err)
            }
        })
    })
}




module.exports={
    createDocument:createDocument,
    getAllDocuments:getAllDocuments,
    updateDocument:updateDocument,
    deleteDocument:deleteDocument,
    getSingleDocumentById:getSingleDocumentById,
    findExistsData:findExistsData,
    softDeleteDocument:softDeleteDocument,
    bulkInsert:bulkInsert,
    bulkUpdate:bulkUpdate
    

}
const apis = require("../../model/apis")
const utils = require("../../utils/messages")
const apisSchemaKey = require("../../utils/validation/apisValidation");
const validation = require("../../utils/validateRequest");
const service = require("../../utils/dbService");
const fs = require("fs");
const path = require("path");
const pathOfStore = path.join(__dirname, '../../', 'store/');
const _ = require('lodash');


const addapis = async (req, res) => {

    try {
        let isValid = validation.validateParamsWithJoi(
            req.body,
            apisSchemaKey.schemaKeys
        );
        if (isValid.error) {
            return utils.inValidParam(isValid.details, res);
        }
        const data = new apis({
            ...req.body
        })

        const result = await service.createDocument(apis, data);

        return utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error, res)
    }

}

const bulkInsertapis = async (req, res) => {

    try {
        let data;
        if (req.body.data !== undefined || req.body.data.length > 0) {
            data = req.body.data
            const result = await service.bulkInsert(apis, data)
            return utils.successResponse(result, res);
        } else {
            return utils.failureResponse('data is not valid', res)
        }

    } catch (error) {
        return utils.failureResponse(error, res)
    }
}
const findAllapis = async (req, res) => {

    try {

        let options = {}
        let query = {}
        if (req.body.options !== undefined) {
            options = { ...req.body.options };
        }
        if (req.body.query !== undefined) {
            query = { ...req.body.query }
        }
        console.log(options)
        const result = await service.getAllDocuments(apis, query, options);

        return utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error, res)
    }

}

const getapis = async (req, res) => {
    try {
        const result = await service.getSingleDocumentById(apis, req.params.id)
        if (result && result !== undefined) {
            return utils.successResponse(result, res);
        } else {
            return utils.recordNotFound([], res)
        }

    } catch (error) {
        return utils.failureResponse(error, res)
    }
}

const updateapis = async (req, res) => {
    try {
        const data = {
            ...req.body
        }
        let isValid = validation.validateParamsWithJoi(
            data,
            apisSchemaKey.schemaKeys
        );
        if (isValid.error) {
            return utils.inValidParam(isValid.details, res);
        }

        const result = await service.updateDocument(apis, req.params.id, data)
        return utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error, res)
    }

}

const bulkUpdateapis = async (req, res) => {
    try {
        let filter = {};
        let data;
        if (req.body.filter !== undefined) {
            filter = req.body.filter
        }
        if (req.body.data !== undefined) {
            data = req.body.data;

            const result = await service.bulkUpdate(apis, filter, data);
            return utils.successResponse(result, res);
        } else {
            return res.status(500).send("data not valid");
        }

    } catch (error) {
        return utils.failureResponse(error, res)
    }
}



// for soft delete - request { isSoftDelete : true }
const deleteapis = async (req, res) => {

    try {
        const isSoftDelete = req.body.isSoftDelete;
        let result;
        if (isSoftDelete) {
            result = await service.softDeleteDocument(apis, req.params.id);
        } else {
            result = await service.deleteDocument(apis, req.params.id);
        }
        return utils.successResponse(result, res);
    } catch (error) {
        return utils.failureResponse(error, res)
    }

}

const addAPIInFile = async (req, res) => {

    try {
        const params = { ...req.body }
        if (fs.existsSync(`${pathOfStore}${params.marketPlaceName}.json`)) {
            //file exists
            let rawData = fs.readFileSync(`${pathOfStore}${params.marketPlaceName}.json`);
            let thirdPartyData = JSON.parse(rawData);
            if (rawData) {

                data = _.filter(params.modules, function (module) {
                    let moduleDescription = _.find(
                        thirdPartyData.modules, function (obj) {
                            return obj.moduleId === module.moduleId;
                        }
                    );

                    if (moduleDescription == null) {
                        thirdPartyData.modules.push(module);
                        fs.writeFileSync(`${pathOfStore}${params.marketPlaceName}.json`, JSON.stringify(thirdPartyData, null, 2));
                    } else {
                        updateLanguageCodeInApi(params.marketPlaceName, module, moduleDescription, thirdPartyData);
                    }
                    return thirdPartyData.modules;
                });

                return utils.successResponse({}, res);
            } else {
                return utils.failureResponse(error, res)
            }
        } else {
            fs.writeFileSync(`${pathOfStore}${params.marketPlaceName}.json`, JSON.stringify(params, null, 2));
            return utils.successResponse({}, res);
        }

    } catch (error) {
        console.log(error)
        return utils.failureResponse(error, res)
    }

}

const updateLanguageCodeInApi = async (marketPlaceName, module, moduleDescription, thirdPartyData) => {

    try {
        apiData = _.filter(module.apis, function (api) {
            let apiDescription = _.find(
                moduleDescription.apis, function (obj) {
                    return obj.apiId === api.apiId;
                }
            );
            if (apiDescription == null) {
                moduleDescription.apis.push(api);
            } else {
                languageCodeData = _.find(api.languageWiseCode, function (language) {
                    let languageCodeDescription = _.find(apiDescription.languageWiseCode, function (obj) {
                        return obj.languageCode === language.languageCode;
                    })
                    if (languageCodeDescription == null) {
                        apiDescription.languageWiseCode.push(language)
                    } else {

                    }
                    fs.writeFileSync(`${pathOfStore}${marketPlaceName}.json`, JSON.stringify(thirdPartyData, null, 2));
                })
            }
            fs.writeFileSync(`${pathOfStore}${marketPlaceName}.json`, JSON.stringify(thirdPartyData, null, 2));
            return apiDescription;
        });
    } catch (error) {
        console.log(error)
        return null;
    }

}


module.exports = {

    addapis,
    bulkInsertapis,
    findAllapis,
    getapis,
    updateapis,
    bulkUpdateapis,
    deleteapis,
    addAPIInFile,
    updateLanguageCodeInApi
}
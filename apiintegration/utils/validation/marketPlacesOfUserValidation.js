const joi = require("joi")
exports.schemaKeys = {
    id: joi.string(),
    userId: joi.string(),
    marketPlaceId: joi.string(),
    appName: joi.string(),
    isAuthorized: joi.boolean(),
    isDeleted: joi.boolean(),
    isActive: joi.boolean()
};
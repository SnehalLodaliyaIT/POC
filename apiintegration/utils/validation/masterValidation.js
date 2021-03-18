const joi = require("joi")
exports.schemaKeys = {
    id: joi.string(),
    name: joi.string(),
    normalizeName: joi.string(),
    slug: joi.string(),
    code: joi.string(),
    group: joi.string(),
    description: joi.string(),
    isActive: joi.boolean(),
    likeKeywords: joi.array().items(joi.string()),
    parentId: joi.string(),
    isDeleted: joi.boolean(),
    parentName: joi.string()
};
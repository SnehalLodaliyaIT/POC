const joi = require("joi")
exports.schemaKeys = {
	id: joi.string(),
	nameOfModule: joi.string(),
	marketPlace: joi.string(),
	contentType:joi.number(),
	isDeleted: joi.boolean(),
	isActive: joi.boolean()
};
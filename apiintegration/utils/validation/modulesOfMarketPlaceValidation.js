const joi = require("joi")
exports.schemaKeys = {
	id: joi.string(),
	nameOfModule: joi.string(),
	marketPlace: joi.string(),
	isDeleted: joi.boolean(),
	isActive: joi.boolean()
};
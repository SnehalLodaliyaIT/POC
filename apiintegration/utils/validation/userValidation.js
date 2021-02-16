const joi = require("joi")
exports.schemaKeys = {
	id: joi.string(),
	userName: joi.string(),
	fullName: joi.string(),
	emailId: joi.string(),
	isDeleted: joi.boolean(),
	isActive: joi.boolean()
};
const joi = require("joi")
exports.schemaKeys = {
	id: joi.string(),
	marketPlaceName: joi.string(),
	logo: joi.string(),
	description: joi.string(),
	isAuthenticationRequired: joi.boolean(),
	categoryId: joi.string(),
	authenticationTypeId: joi.array().items(joi.string()),
	isDeleted: joi.boolean(),
	isActive: joi.boolean()
};
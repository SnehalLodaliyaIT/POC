const joi = require("joi")
exports.schemaKeys = {
	id: joi.string(),
	marketPlaceId: joi.string(),
	modulesOfMarketPlaceId: joi.string(),
	methodType: joi.string(),
	url: joi.string(),
	parameters: joi.array(),
	response: joi.object(),
	description: joi.string(),
	isDeleted: joi.boolean(),
	isActive: joi.boolean()
};
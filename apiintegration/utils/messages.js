const responseStatusCode = require('./responseCode')
exports.successResponse = (data, res) => {
    return res.status(responseStatusCode.success).json({
        STATUS: 'SUCCESS',
        MESSAGE: 'Your request is successfully executed',
        DATA: data
    });
}

exports.failureResponse = (data, res) => {
    return res.status(responseStatusCode.internalServerError).json({
        STATUS: responseStatusCode.internalServerError,
        MESSAGE: "Internal Server Error",
        DATA: data
    });
}

exports.badRequest = (data, res) => {
    return res.status(responseStatusCode.internalServerError).json({
        STATUS: responseStatusCode.internalServerError,
        MESSAGE: 'The request cannot be fulfilled due to bad syntax',
        DATA: data
    });
}
exports.isDuplicate = (data, res) => {
    return res.status(responseStatusCode.internalServerError).json({
        STATUS: responseStatusCode.internalServerError,
        MESSAGE: 'already exists',
        DATA: data
    });
}
exports.recordNotFound = (data, res) => {
    return res.status(responseStatusCode.internalServerError).json({
        STATUS: responseStatusCode.internalServerError,
        MESSAGE: 'Record not found with specified criteria.',
        DATA: data
    });
}
exports.insufficientParameters = (res) => {
    return res.status(responseStatusCode.badRequest).json({
        STATUS: 'FAILURE',
        MESSAGE: 'Insufficient parameters'
    });
}

exports.notFound = (err, res) => {
    return res.status(responseStatusCode.notFound).json({
        STATUS: 'FAILURE',
        MESSAGE:
            'The requested resource could not be found but may be available again in the future',
        DATA: err
    });
}

exports.mongoError = (err, res) => {
    return res.status(responseStatusCode.internalServerError).json({
        STATUS: 'FAILURE',
        MESSAGE: 'Mongo db related error',
        DATA: err
    });
}
exports.inValidParam = (err, res) => {
    return res.status(responseStatusCode.internalServerError).json({
        STATUS: 'FAILURE',
        MESSAGE: 'In valid values in parameters',
        DATA: err
    });
}

exports.unAuthorizedRequest = (res) => {
    return res.status(responseStatusCode.unAuthorizedRequest).json({
        STATUS: 'FAILURE',
        MESSAGE: 'You are not authorized to access the request'
    });
}

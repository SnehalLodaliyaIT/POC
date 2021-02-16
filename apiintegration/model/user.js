const mongoose = require("../config/db");
const mongoosePaginate = require('mongoose-paginate-v2');
var idvalidator = require('mongoose-id-validator');


const uniqueValidator = require('mongoose-unique-validator');


const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'data',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator',
};

mongoosePaginate.paginate.options = {
    customLabels: myCustomLabels
};

const Schema = mongoose.Schema;
const schema = new Schema(
    {
	userName: {
		type: String,
		unique: true,
		uniqueCaseInsensitive: true
	},
	fullName: String,
	emailId: String,
	isDeleted: Boolean,
	isActive: Boolean
},
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

schema.pre('save', function(next) {
    this.isDeleted = false;
    this.isActive = true;
    next();
});

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idvalidator);


schema.plugin(uniqueValidator);



const user = mongoose.model("user",schema,"user");
module.exports = user
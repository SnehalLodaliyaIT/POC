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
const schema = new Schema({
    name: {
        type: String,
        unique: true,
        uniqueCaseInsensitive: true
    },
    normalizeName: String,
    slug: String,
    code: String,
    group: String,
    description: String,
    isActive: Boolean,
    likeKeywords: [String],
    parentId: {
        type: Schema.Types.ObjectId,
        ref: "master"
    },
    isDeleted: Boolean,
    parentName: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

schema.pre('save', function(next) {
    this.isDeleted = false;
    this.isActive = true;
    next();
});

schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idvalidator);


schema.plugin(uniqueValidator);



const master = mongoose.model("master", schema, "master");
module.exports = master
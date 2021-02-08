const mongoose = require('mongoose');

const masterSchema = {
    name: { type: String, required: true },
    normalizeName: { type: String, required: true },
    slug: { type: String },
    code: { type: String },
    group: { type: String },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Master'
    },
    isDeleted: { type: Boolean, default: false },
    parentName: { type: String }
};


module.exports = mongoose.model('Master', masterSchema);
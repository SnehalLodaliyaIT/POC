import mongoose, { model } from 'mongoose';

const masterSchema = mongoose.model('master',{
  name: { type: String, required: true },
  normalizeName: { type: String, required: true },
  slug: { type: String, required: true },
  code: { type: String, required: true },
  group: { type: String, required: true },
  description: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'master'
  },
  isDeleted: { type: Boolean, default: false },
  parentName: { type: String, default: true }
});
module.exports=masterSchema;

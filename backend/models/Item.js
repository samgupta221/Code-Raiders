 const mongoose = require('mongoose');
 const itemSchema = new mongoose.Schema({
 title: {
 type: String,
 required: [true, 'Title is required'],
 trim: true,
 maxlength: [100, 'Title cannot exceed 100 characters']
 },
 description: {
 type: String,
 required: [true, 'Description is required'],
 maxlength: [1000, 'Description cannot exceed 1000 characters']
 },
 category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories', 'other']
  },
  type: {
    type: String,
    required: [true, 'Type is required']
  },
  size: {
    type: String,
    required: [true, 'Size is required'],
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12', 'One S
  },
  condition: {
    type: String,
    required: [true, 'Condition is required'],
    enum: ['like-new', 'very-good', 'good', 'fair']
  },
  brand: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true
  },
  material: {
    type: String,
    trim: true
  },
  images: [{
    url: String,
    publicId: String
  }],
  tags: [String],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pointValue: {
    type: Number,
    required: true,
    min: [10, 'Point value must be at least 10']
  },
  status: {
    type: String,
    enum: ['pending', 'available', 'swapping', 'swapped', 'rejected'],
    default: 'pending'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  swapRequests: [{
    user: {
type: mongoose.Schema.Types.ObjectId,
 ref: 'User'
 },
 message: String,
 offeredItems: [{
 type: mongoose.Schema.Types.ObjectId,
 ref: 'Item'
 }],
 status: {
 type: String,
 enum: ['pending', 'accepted', 'rejected'],
 default: 'pending'
 },
 createdAt: {
 type: Date,
 default: Date.now
 }
 }],
 views: {
 type: Number,
 default: 0
 },
 likes: [{
 type: mongoose.Schema.Types.ObjectId,
 ref: 'User'
 }]
 }, {
 timestamps: true
 });
 itemSchema.index({ category: 1, size: 1, condition: 1 });
 itemSchema.index({ owner: 1, status: 1 });
 itemSchema.index({ 'owner': 1, 'createdAt': -1 });
 module.exports = mongoose.model('Item', itemSchema);
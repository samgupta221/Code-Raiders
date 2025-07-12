 const mongoose = require('mongoose');
 const bcrypt = require('bcryptjs');
 const userSchema = new mongoose.Schema({
 name: {
 type: String,
 required: [true, 'Name is required'],
 trim: true,
 maxlength: [50, 'Name cannot exceed 50 characters']
 },
 email: {
 type: String,
 required: [true, 'Email is required'],
 unique: true,
 lowercase: true,
 match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
 },
 password: {
 type: String,
 required: [true, 'Password is required'],
 minlength: [6, 'Password must be at least 6 characters'],
 select: false
 },
 avatar: {
 type: String,
 default: null
 },
 points: {
 type: Number,
 default: 100
 },
 location: {
 city: String,
 state: String,
 country: String,
 coordinates: {
 latitude: Number,
 longitude: Number
 }
},
 preferences: {
 sizes: [String],
 categories: [String],
 brands: [String]
 },
 isActive: {
 type: Boolean,
 default: true
 },
 isAdmin: {
 type: Boolean,
 default: false
 },
 swapHistory: [{
 type: mongoose.Schema.Types.ObjectId,
 ref: 'Swap'
 }],
 ratings: {
 average: { type: Number, default: 0 },
 count: { type: Number, default: 0 }
 }
 }, {
 timestamps: true
 });
 userSchema.pre('save', async function(next) {
 if (!this.isModified('password')) return next();
 this.password = await bcrypt.hash(this.password, 12);
 next();
 });
 userSchema.methods.comparePassword = async function(candidatePassword) {
 return await bcrypt.compare(candidatePassword, this.password);
 };
 module.exports = mongoose.model('User', userSchema)
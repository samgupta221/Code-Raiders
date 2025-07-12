const mongoose = require('mongoose');
 const swapSchema = new mongoose.Schema({
 initiator: {
 type: mongoose.Schema.Types.ObjectId,
 ref: 'User',
 required: true
 },
 recipient: {
 type: mongoose.Schema.Types.ObjectId,
 ref: 'User',
 required: true
 },
 type: {
 type: String,
 enum: ['direct', 'points'],
 required: true
  },
  items: {
    initiatorItems: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    }],
    recipientItems: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    }]
  },
  pointsExchanged: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  message: {
    type: String,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  shippingDetails: {
    initiatorAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    recipientAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    trackingNumbers: {
      initiatorToRecipient: String,
      recipientToInitiator: String
    }
  },
  ratings: {
    initiatorRating: {
      score: { type: Number, min: 1, max: 5 },
      comment: String
    },
    recipientRating: {
      score: { type: Number, min: 1, max: 5 },
      comment: String
    }
  }
 }, {
  timestamps: true
});
 module.exports = mongoose.model('Swap', swapSchema);
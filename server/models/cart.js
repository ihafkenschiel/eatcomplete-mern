const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Cart Item Schema
const CartItemSchema = new Schema({
  food: {
    type: Schema.Types.ObjectId,
    ref: 'Food'
  },
  quantity: Number,
  totalPrice: {
    type: Number
  },
  priceWithTax: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'Not processed',
    enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
  }
});

module.exports = Mongoose.model('CartItem', CartItemSchema);

// Cart Schema
const CartSchema = new Schema({
  foods: [CartItemSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Cart', CartSchema);

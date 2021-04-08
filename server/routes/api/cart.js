const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Cart = require('../../models/cart');
const Food = require('../../models/food');
const auth = require('../../middleware/auth');

router.post('/add', auth, (req, res) => {
  const user = req.user._id;
  const foods = req.body.foods;

  const cart = new Cart({
    user,
    foods
  });

  cart.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    decreaseQuantity(foods);

    res.status(200).json({
      success: true,
      cartId: data.id
    });
  });
});

router.delete('/delete/:cartId', auth, (req, res) => {
  Cart.deleteOne({ _id: req.params.cartId }, err => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      success: true
    });
  });
});

router.post('/add/:cartId', auth, (req, res) => {
  const food = req.body.food;
  const query = { _id: req.params.cartId };

  Cart.updateOne(query, { $push: { foods: food } }).exec(err => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      success: true
    });
  });
});

router.delete('/delete/:cartId/:foodId', auth, (req, res) => {
  const food = { food: req.params.foodId };
  const query = { _id: req.params.cartId };

  Cart.updateOne(query, { $pull: { foods: food } }).exec(err => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      success: true
    });
  });
});

const decreaseQuantity = foods => {
  let bulkOptions = foods.map(item => {
    return {
      updateOne: {
        filter: { _id: item.food },
        update: { $inc: { quantity: -item.quantity } }
      }
    };
  });

  Food.bulkWrite(bulkOptions);
};

module.exports = router;

const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Order = require('../../models/order');
const Cart = require('../../models/cart');
const Food = require('../../models/food');
const auth = require('../../middleware/auth');
const mailgun = require('../../services/mailgun');
const taxConfig = require('../../config/tax');

router.post('/add', auth, async (req, res) => {
  try {
    const cart = req.body.cartId;
    const total = req.body.total;
    const user = req.user._id;

    const order = new Order({
      cart,
      user,
      total
    });

    const orderDoc = await order.save();

    await Order.findById(orderDoc._id).populate('cart user', '-password');

    const cartDoc = await Cart.findById(orderDoc.cart._id).populate({
      path: 'foods.food',
      populate: {
        path: 'brand'
      }
    });

    const newOrder = {
      _id: orderDoc._id,
      created: orderDoc.created,
      user: orderDoc.user,
      total: orderDoc.total,
      foods: cartDoc.foods
    };

    await mailgun.sendEmail(order.user.email, 'order-confirmation', newOrder);

    res.status(200).json({
      success: true,
      message: `Your order has been placed successfully!`,
      order: { _id: orderDoc._id }
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch all orders api
router.get('/list', auth, async (req, res) => {
  try {
    const user = req.user._id;

    const orders = await Order.find({ user }).populate({
      path: 'cart'
    });

    const newOrders = orders.filter(order => order.cart);

    if (newOrders.length > 0) {
      const newDataSet = [];

      newOrders.map(async doc => {
        const cartId = doc.cart._id;

        const cart = await Cart.findById(cartId).populate({
          path: 'foods.food',
          populate: {
            path: 'brand'
          }
        });

        const order = {
          _id: doc._id,
          total: parseFloat(Number(doc.total.toFixed(2))),
          created: doc.created,
          foods: cart.foods
        };

        newDataSet.push(order);

        if (newDataSet.length === newOrders.length) {
          res.status(200).json({
            orders: newDataSet
          });
        }
      });
    } else {
      res.status(200).json({
        orders: []
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch order api
router.get('/:orderId', auth, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const user = req.user._id;

    const orderDoc = await Order.findOne({ _id: orderId, user }).populate({
      path: 'cart'
    });

    if (!orderDoc) {
      res.status(404).json({
        message: `Cannot find order with the id: ${orderId}.`
      });
    }

    const cart = await Cart.findById(orderDoc.cart._id).populate({
      path: 'foods.food',
      populate: {
        path: 'brand'
      }
    });

    let order = {
      _id: orderDoc._id,
      cartId: orderDoc.cart._id,
      total: orderDoc.total,
      totalTax: 0,
      created: cart.created,
      foods: cart.foods
    };

    order = caculateTaxAmount(order);

    res.status(200).json({
      order
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete('/cancel/:orderId', auth, async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findOne({ _id: orderId });
    const foundCart = await Cart.findOne({ _id: order.cart });

    increaseQuantity(foundCart.foods);

    await Order.deleteOne({ _id: orderId });
    await Cart.deleteOne({ _id: order.cart });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/cancel/item/:itemId', auth, async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const orderId = req.body.orderId;
    const cartId = req.body.cartId;

    const foundCart = await Cart.findOne({ 'foods._id': itemId });
    const foundCartFood = foundCart.foods.find(p => p._id == itemId);

    await Cart.updateOne(
      { 'foods._id': itemId },
      {
        'foods.$.status': 'Cancelled'
      }
    );

    await Food.updateOne(
      { _id: foundCartFood.food },
      { $inc: { quantity: 1 } }
    );

    const cart = await Cart.findOne({ _id: cartId });
    const items = cart.foods.filter(item => item.status === 'Cancelled');

    // All items are cancelled => Cancel order
    if (cart.foods.length === items.length) {
      await Order.deleteOne({ _id: orderId });
      await Cart.deleteOne({ _id: cartId });

      return res.status(200).json({
        success: true,
        orderCancelled: true,
        message: 'You order has been cancelled successfully!'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item has been cancelled successfully!'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// calculate order tax amount
const caculateTaxAmount = order => {
  const taxRate = taxConfig.stateTaxRate;

  order.totalTax = 0;

  if (order.foods && order.foods.length > 0) {
    order.foods.map(item => {
      if (item.food) {
        if (item.food.taxable) {
          const price = Number(item.food.price).toFixed(2);
          const taxAmount = Math.round(price * taxRate * 100) / 100;
          item.priceWithTax = parseFloat(price) + parseFloat(taxAmount);
          order.totalTax += taxAmount;
        }

        item.totalPrice = parseFloat(item.totalPrice.toFixed(2));
      }
    });
  }

  order.totalWithTax = order.total + order.totalTax;

  order.total = parseFloat(Number(order.total.toFixed(2)));
  order.totalTax = parseFloat(
    Number(order.totalTax && order.totalTax.toFixed(2))
  );
  order.totalWithTax = parseFloat(Number(order.totalWithTax.toFixed(2)));
  return order;
};

const increaseQuantity = foods => {
  let bulkOptions = foods.map(item => {
    return {
      updateOne: {
        filter: { _id: item.food },
        update: { $inc: { quantity: +item.quantity } }
      }
    };
  });

  Food.bulkWrite(bulkOptions);
};

module.exports = router;

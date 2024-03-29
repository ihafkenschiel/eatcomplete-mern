const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const foodRoutes = require('./food');
const nutrientRoutes = require('./nutrient');
const brandRoutes = require('./brand');
const contactRoutes = require('./contact');
const merchantRoutes = require('./merchant');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// food routes
router.use('/food', foodRoutes);

// nutrient routes
router.use('/nutrient', nutrientRoutes);

// brand routes
router.use('/brand', brandRoutes);

// contact routes
router.use('/contact', contactRoutes);

// merchant routes
router.use('/merchant', merchantRoutes);

// cart routes
router.use('/cart', cartRoutes);

// order routes
router.use('/order', orderRoutes);

module.exports = router;

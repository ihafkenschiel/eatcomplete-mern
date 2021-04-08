const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const Nutrient = require('../../models/nutrient');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const store = require('../../helpers/store');

router.post('/add', auth, role.checkRole(role.ROLES.Admin), (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const foods = req.body.foods;
  const isActive = req.body.isActive;

  if (!description || !name) {
    return res
      .status(400)
      .json({ error: 'You must enter description & name.' });
  }

  const nutrient = new Nutrient({
    name,
    description,
    foods,
    isActive
  });

  nutrient.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Nutrient has been added successfully!`,
      nutrient: data
    });
  });
});

// fetch store categories api
router.get('/list', (req, res) => {
  Nutrient.find({ isActive: true }, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      categories: data
    });
  });
});

// fetch categories api
router.get('/', (req, res) => {
  Nutrient.find({}, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      categories: data
    });
  });
});

// fetch nutrient api
router.get('/:id', async (req, res) => {
  try {
    const nutrientId = req.params.id;

    const nutrientDoc = await Nutrient.findOne({ _id: nutrientId }).populate(
      'brand'
    );

    if (!nutrientDoc) {
      return res.status(404).json({
        message: 'No Nutrient found.'
      });
    }

    res.status(200).json({
      nutrient: nutrientDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/:id', auth, role.checkRole(role.ROLES.Admin), async (req, res) => {
  try {
    const nutrientId = req.params.id;
    const update = req.body.nutrient;
    const query = { _id: nutrientId };

    await Nutrient.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: 'Nutrient has been updated successfully!'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put(
  '/:id/active',
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const nutrientId = req.params.id;
      const update = req.body.nutrient;
      const query = { _id: nutrientId };

      // disable nutrient(nutrientId) foods
      if (!update.isActive) {
        const nutrientDoc = await Nutrient.findOne(
          { _id: nutrientId, isActive: true },
          'foods -_id'
        ).populate('foods');

        store.disableFoods(nutrientDoc.foods);
      }

      await Nutrient.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Nutrient has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.delete(
  '/delete/:id',
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const food = await Nutrient.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Nutrient has been deleted successfully!`,
        food
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

module.exports = router;

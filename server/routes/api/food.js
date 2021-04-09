const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');

// Bring in Models & Helpers
const Food = require('../../models/food');
const Brand = require('../../models/brand');
const Nutrient = require('../../models/nutrient');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// fetch store foods api
router.get('/list', async (req, res) => {
  try {
    const foods = await Food.find().populate();
    res.status(200).json({
      foods
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
      // error
    });
  }
});

// fetch foods api
router.get(
  '/',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      let foods = [];

      if (req.user.merchant) {
        const brands = await Brand.find({
          merchant: req.user.merchant
        }).populate('merchant', '_id');

        const brandId = brands[0]['_id'];

        foods = await Food.find({})
          .populate({
            path: 'brand',
            populate: {
              path: 'merchant',
              model: 'Merchant'
            }
          })
          .where('brand', brandId);
      } else {
        foods = await Food.find({}).populate({
          path: 'brand',
          populate: {
            path: 'merchant',
            model: 'Merchant'
          }
        });
      }

      res.status(200).json({
        foods
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch food api
router.get('/:id', async (req, res) => {
  try {
    const foodId = req.params.id;

    const foodDoc = await Food.findOne({ _id: foodId }).populate(
      'brand'
    );

    if (!foodDoc) {
      return res.status(404).json({
        message: 'No food found3.'
      });
    }

    res.status(200).json({
      food: foodDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch food slug api
router.get('/item/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const foodDoc = await Food.findOne({ slug, isActive: true }).populate(
      'brand'
    );

    if (!foodDoc) {
      return res.status(404).json({
        message: 'No food found.'
      });
    }

    res.status(200).json({
      food: foodDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch all foods by nutrient api
router.get('/list/nutrient/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const nutrientDoc = await Nutrient.findOne(
      { slug, isActive: true },
      'foods -_id'
    ).populate('foods');

    if (!nutrientDoc) {
      return res.status(404).json({
        message: 'No foods found.'
      });
    }

    res.status(200).json({
      foods: nutrientDoc ? nutrientDoc.foods : nutrientDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch all foods by brand api
router.get('/list/brand/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const brand = await Brand.find({ slug, isActive: true });

    if (brand.length <= 0) {
      return res.status(404).json({
        message: `Cannot find brand with the slug: ${slug}.`
      });
    }

    const foods = await Food.find({ brand: brand[0]._id }).populate(
      'brand',
      'name'
    );

    res.status(200).json({
      foods
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get('/list/select', auth, async (req, res) => {
  try {
    const foods = await Food.find({}, 'name');

    res.status(200).json({
      foods
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put(
  '/:id',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      const foodId = req.params.id;
      const update = req.body.food;
      const query = { _id: foodId };

      await Food.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Food has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id/active',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      const foodId = req.params.id;
      const update = req.body.food;
      const query = { _id: foodId };

      await Food.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Food has been updated successfully!'
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
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      const food = await Food.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Food has been deleted successfully!`,
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

const Food = require('../models/food');

exports.disableFoods = foods => {
  let bulkOptions = foods.map(item => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { isActive: false }
      }
    };
  });

  Food.bulkWrite(bulkOptions);
};

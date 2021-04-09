const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

Mongoose.plugin(slug, options);

// Food Schema
const Foodschema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    trim: true
  },
  weight: {
    type: Number
  },
  measure: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number
  },
  quantity_measurement: {
    type: String,
    trim: true
  },
  nutrient: {
    type: String,
    trim: true
  },
  percent_rda: {
    type: Number
  }
},
{
  collection: 'foods'
});

module.exports = Mongoose.model('Food', Foodschema);

import * as mongoose from 'mongoose';

export const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  totalPopulation: {
    type: Number,
    required: true
  },
  country: String,
  zipCode: Number,
  updated: {
    type: Date,
    default: Date.now
  }
});

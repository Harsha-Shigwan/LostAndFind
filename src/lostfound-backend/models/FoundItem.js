// const mongoose = require('mongoose');

// const foundItemSchema = new mongoose.Schema({
//   itemName: String,
//   category: String,
//   description: String,
//   locationFound: String,
//   dateFound: Date,
//   photoPath: String,
//   email: String
// }, { timestamps: true });

// module.exports = mongoose.model('FoundItem', foundItemSchema);

const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
  itemName: String,
  category: String,
  description: String,
  locationFound: String,
  dateFound: Date,
  photoPath: String,
  email: String,
  phoneNumber: String,
  contactPreference: {
    type: String,
    enum: ['email', 'phone', 'both'],
    default: 'email'
  }
}, { timestamps: true });

module.exports = mongoose.model('FoundItem', foundItemSchema);
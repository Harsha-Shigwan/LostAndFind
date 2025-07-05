// // const mongoose = require('mongoose');

// // const contactRequestSchema = new mongoose.Schema({
// //   itemId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'FoundItem',
// //     required: true
// //   },
// //   requesterName: String,
// //   requesterEmail: String,
// //   requesterPhone: String,
// //   finderEmail: String,
// //   message: String,
// //   requestType: {
// //     type: String,
// //     enum: ['chat', 'call'],
// //     required: true
// //   },
// //   status: {
// //     type: String,
// //     enum: ['pending', 'accepted', 'rejected', 'completed'],
// //     default: 'pending'
// //   },
// //   messages: [{
// //     sender: String,
// //     content: String,
// //     timestamp: {
// //       type: Date,
// //       default: Date.now
// //     }
// //   }]
// // }, { timestamps: true });

// // module.exports = mongoose.model('ContactRequest', contactRequestSchema);


// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   sender: {
//     type: String,
//     required: true
//   },
//   content: {
//     type: String,
//     required: true
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now
//   }
// });

// const contactRequestSchema = new mongoose.Schema({
//   itemId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'FoundItem',
//     required: true
//   },
//   requesterName: {
//     type: String,
//     required: true
//   },
//   requesterEmail: {
//     type: String,
//     required: true
//   },
//   requesterPhone: {
//     type: String
//   },
//   finderEmail: {
//     type: String,
//     required: true
//   },
//   requestType: {
//     type: String,
//     enum: ['chat', 'call'],
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'in-progress', 'resolved', 'cancelled'],
//     default: 'pending'
//   },
//   messages: [messageSchema]
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('ContactRequest', contactRequestSchema);




const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const contactRequestSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoundItem',
    required: true
  },
  requesterName: {
    type: String,
    required: true
  },
  requesterEmail: {
    type: String,
    required: true
  },
  requesterPhone: {
    type: String
  },
  finderEmail: {
    type: String,
    required: true
  },
  requestType: {
    type: String,
    enum: ['chat', 'call'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'cancelled'],
    default: 'pending'
  },
  messages: [messageSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactRequest', contactRequestSchema);
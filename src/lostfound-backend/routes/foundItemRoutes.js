// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const FoundItem = require('../models/FoundItem');
// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });

// const upload = multer({ storage });

// router.post('/api/found-items', upload.single('photo'), async (req, res) => {
//   try {
//     const { itemName, category, description, locationFound, dateFound, email} = req.body;
//     const newItem = new FoundItem({
//       itemName,
//       category,
//       description,
//       locationFound,
//       dateFound,
//       email,
//       photoPath: req.file?.path || ''
//     });

//     await newItem.save();
//     res.status(200).json({ message: 'Item saved successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to save item' });
//   }
// });
// router.get('/api/found-items', async (req, res) => {
//     try {
//       const items = await FoundItem.find().sort({ createdAt: -1 });
//       res.json(items);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Failed to fetch items' });
//     }
//   });
  
// module.exports = router;


const express = require('express');
const multer = require('multer');
const path = require('path');
const FoundItem = require('../models/FoundItem');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.post('/api/found-items', upload.single('photo'), async (req, res) => {
  try {
    const { 
      itemName, 
      category, 
      description, 
      locationFound, 
      dateFound, 
      email,
      phoneNumber,
      contactPreference
    } = req.body;
    
    const newItem = new FoundItem({
      itemName,
      category,
      description,
      locationFound,
      dateFound,
      email,
      phoneNumber: phoneNumber || '',
      contactPreference: contactPreference || 'email',
      photoPath: req.file?.path || ''
    });

    await newItem.save();
    res.status(200).json({ message: 'Item saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save item' });
  }
});

router.get('/api/found-items', async (req, res) => {
  try {
    const items = await FoundItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

module.exports = router;
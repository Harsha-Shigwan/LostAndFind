// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const foundItemRoutes = require('./routes/foundItemRoutes');
// // const contactRequestRoutes = require('./routes/contactRequestRoutes');
// // const path = require('path');
// // require('dotenv').config();

// // const authRoutes = require('./routes/auth');

// // const app = express();
// // app.use(cors());
// // app.use(express.json());
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // mongoose.connect(process.env.MONGO_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // })
// // .then(() => console.log('✅ MongoDB connected'))
// // .catch(err => console.log('❌ MongoDB connection error:', err));

// // app.use('/api/auth', authRoutes);
// // app.use(foundItemRoutes);
// // app.use(contactRequestRoutes);
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




// // server.js (main server file)
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });

// // Your existing middleware setup
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Import routes
// const foundItemRoutes = require('./routes/foundItemRoutes');
// const contactRequestRoutes = require('./routes/contactRequestRoutes');

// // Use routes
// app.use(foundItemRoutes);
// app.use(contactRequestRoutes);

// // Set up socket connection
// const activeUsers = {};

// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);
  
//   // User joins a chat room based on contact request ID
//   socket.on('join_chat', ({ userId, requestId }) => {
//     console.log(`User ${userId} joined chat ${requestId}`);
//     socket.join(requestId);
//     activeUsers[socket.id] = { userId, requestId };
//   });
  
//   // Handle new message
//   socket.on('send_message', async (messageData) => {
//     const { requestId, sender, content } = messageData;
    
//     try {
//       // Save message to database using your existing API
//       const response = await axios.post(`http://localhost:5000/api/contact-requests/${requestId}/messages`, {
//         sender,
//         content
//       });
      
//       // Broadcast message to all users in the room
//       io.to(requestId).emit('receive_message', {
//         sender,
//         content,
//         timestamp: new Date()
//       });
//     } catch (error) {
//       console.error('Error saving message:', error);
//       socket.emit('message_error', { error: 'Failed to send message' });
//     }
//   });
  
//   // Handle disconnect
//   socket.on('disconnect', () => {
//     console.log('Client disconnected:', socket.id);
//     delete activeUsers[socket.id];
//   });
// });

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // // services.msc



// // // In your server.js or app.js file
// // require('dotenv').config();
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const path = require('path');
// // const foundItemRoutes = require('./routes/foundItemRoutes');
// // const contactRequestRoutes = require('./routes/contactRequestRoutes');
// // const authRoutes = require('./routes/auth');

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // Serve static files from the uploads directory
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // Routes
// // app.use('/api/auth', authRoutes);
// // app.use(foundItemRoutes);
// // app.use(contactRequestRoutes);

// // // MongoDB connection
// // mongoose.connect(process.env.MONGO_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // })
// // .then(() => console.log('MongoDB connected'))
// // .catch(err => console.error('MongoDB connection error:', err));

// // // mongoose.connect(process.env.MONGO_URI, {
// // //   useNewUrlParser: true,
// // //   useUnifiedTopology: true,
// // // })
// // // .then(() => console.log('✅ MongoDB connected'))
// // // .catch(err => console.log('❌ MongoDB connection error:', err));

// // // Start server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const http = require('http');
// // const socketIo = require('socket.io');
// // const foundItemRoutes = require('./routes/foundItemRoutes');
// // const contactRequestRoutes = require('./routes/contactRequestRoutes');
// // const path = require('path');
// // require('dotenv').config();

// // const authRoutes = require('./routes/auth');

// // const app = express();
// // const server = http.createServer(app);
// // const io = socketIo(server, {
// //   cors: {
// //     origin: "http://localhost:3000",
// //     methods: ["GET", "POST"]
// //   }
// // });

// // app.use(cors());
// // app.use(express.json());
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // Store active user connections
// // const userConnections = {};

// // // Socket.IO connection handling
// // io.on('connection', (socket) => {
// //   console.log('New client connected:', socket.id);
  
// //   // User authentication - associate socket with user email
// //   socket.on('authenticate', (userData) => {
// //     if (userData && userData.email) {
// //       userConnections[userData.email] = socket.id;
// //       socket.userEmail = userData.email;
// //       console.log(`User ${userData.email} authenticated with socket ${socket.id}`);
// //     }
// //   });
  
// //   // Handle disconnection
// //   socket.on('disconnect', () => {
// //     console.log('Client disconnected:', socket.id);
// //     if (socket.userEmail) {
// //       delete userConnections[socket.userEmail];
// //     }
// //   });
// // });

// // // Create a notification function available throughout the app
// // const sendNotification = (recipientEmail, notificationType, data) => {
// //   const socketId = userConnections[recipientEmail];
  
// //   if (socketId) {
// //     io.to(socketId).emit('notification', {
// //       type: notificationType,
// //       timestamp: new Date(),
// //       data: data
// //     });
// //     console.log(`Real-time notification sent to ${recipientEmail}`);
// //     return true;
// //   } else {
// //     console.log(`User ${recipientEmail} not connected, notification not delivered in real-time`);
// //     return false;
// //   }
// // };

// // // Make sendNotification function available to routes
// // app.set('io', io);
// // app.set('sendNotification', sendNotification);
// // app.set('userConnections', userConnections);

// // mongoose.connect(process.env.MONGO_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // })
// // .then(() => console.log('✅ MongoDB connected'))
// // .catch(err => console.log('❌ MongoDB connection error:', err));

// // app.use('/api/auth', authRoutes);
// // app.use(foundItemRoutes);
// // app.use(contactRequestRoutes);

// // const PORT = process.env.PORT || 5000;
// // server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));





// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const http = require('http');
// const socketIo = require('socket.io');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });

// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // // Connect to MongoDB
// // mongoose.connect(process.env.MONGODB_URI)
// //   .then(() => console.log('Connected to MongoDB'))
// //   .catch(err => console.error('MongoDB connection error:', err));

//   // Change this line in your server.js
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Socket.IO connection handling
// const messageSchema = new mongoose.Schema({
//   chatRoom: String,
//   sender: String,
//   content: String,
//   timestamp: { type: Date, default: Date.now }
// });

// const Message = mongoose.model('Message', messageSchema);

// // Socket.IO connection handling
// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);

//   // Join a chat room
//   socket.on('join_chat', async ({ userId, requestId }) => {
//     socket.join(requestId);
//     console.log(`User ${userId} joined chat ${requestId}`);

//     // Send chat history when joining
//     try {
//       const chatHistory = await Message.find({ chatRoom: requestId })
//         .sort({ timestamp: 1 });
//       socket.emit('chat_history', chatHistory);
//     } catch (error) {
//       console.error('Error fetching chat history:', error);
//     }
//   });

//   // Handle new messages
//   socket.on('send_message', async ({ requestId, sender, content }) => {
//     try {
//       // Create and save the message
//       const newMessage = new Message({
//         chatRoom: requestId,
//         sender,
//         content,
//         timestamp: new Date()
//       });
//       await newMessage.save();

//       // Broadcast to all clients in the room including sender
//       io.to(requestId).emit('receive_message', {
//         _id: newMessage._id,
//         sender,
//         content,
//         timestamp: newMessage.timestamp
//       });
//     } catch (error) {
//       console.error('Error saving message:', error);
//       socket.emit('message_error', 'Failed to send message');
//     }
//   });

//   // Handle typing status
//   socket.on('typing', ({ requestId, userId }) => {
//     socket.to(requestId).emit('user_typing', { userId });
//   });

//   socket.on('stop_typing', ({ requestId }) => {
//     socket.to(requestId).emit('user_stopped_typing');
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected:', socket.id);
//   });
// });

// // Import and use your routes
// const foundItemRoutes = require('./routes/foundItemRoutes');
// const contactRequestRoutes = require('./routes/contactRequestRoutes');
// const authRoutes = require('./routes/auth');

// app.use(foundItemRoutes);
// app.use(contactRequestRoutes);
// app.use('/auth', authRoutes);

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



// const express = require('express');
// const mongoose = require('mongoose');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const foundItemRoutes = require('./routes/foundItemRoutes');
// const contactRequestRoutes = require('./routes/contactRequestRoutes');
// const path = require('path');
// require('dotenv').config();
// // Load environment variables
// dotenv.config();
// const authRoutes = require('./routes/auth');
// const nodemailer = require('nodemailer');
// // Initialize express app
// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Connect to MongoDB
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => console.log('Connected to MongoDB'))
// //   .catch(err => console.error('MongoDB connection error:', err));


// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ MongoDB connected'))
// .catch(err => console.log('❌ MongoDB connection error:', err));
// // Create HTTP server
// const server = http.createServer(app);

// // const transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASSWORD
// //   }
// // });

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true, // Use SSL/TLS
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD // Matches exactly what's in your .env file
//   },
//   debug: true,
//   logger: true
// });


// // Verify connection configuration
// transporter.verify(function(error, success) {
//   if (error) {
//     console.log('Server connection error: ', error);
//   } else {
//     console.log('Server is ready to take our messages');
//   }
// });
// // Initialize Socket.IO
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });

// // Message schema and model
// const messageSchema = new mongoose.Schema({
//   chatRoom: String,
//   sender: String,
//   content: String,
//   timestamp: { type: Date, default: Date.now }
// });
// const Message = mongoose.model('Message', messageSchema);

// // Socket.IO connection
// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);

//   socket.on('send_message', async ({ requestId, sender, content, recipientEmail }) => {
//     try {
//       const newMessage = new Message({
//         chatRoom: requestId,
//         sender,
//         content,
//         timestamp: new Date()
//       });
//       await newMessage.save();

//       // Send message to users in the room
//       io.to(requestId).emit('receive_message', {
//         _id: newMessage._id,
//         sender,
//         content,
//         timestamp: newMessage.timestamp
//       });

//       // Send email notification
//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: recipientEmail,
//         subject: 'New Message in Lost & Found Chat',
//         html: `
//           <h3>You have a new message</h3>
//           <p><strong>From:</strong> ${sender}</p>
//           <p><strong>Message:</strong> ${content}</p>
//           <p>Login to the application to respond to this message.</p>
//         `
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error('Error sending email:', error);
//         } else {
//           console.log('Email sent:', info.response);
//         }
//       });

//     } catch (error) {
//       console.error('Error saving message:', error);
//       socket.emit('message_error', 'Failed to send message');
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected:', socket.id);
//   });
// });
// // // Start server
// // const PORT = process.env.PORT || 5000;
// // server.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });

// app.use('/api/auth', authRoutes);
// app.use(foundItemRoutes);
// app.use(contactRequestRoutes);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));






// const express = require('express');
// const mongoose = require('mongoose');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');
// const path = require('path');
// const nodemailer = require('nodemailer');

// // Load environment variables - ONLY ONCE at the beginning
// require('dotenv').config();

// // Routes
// const foundItemRoutes = require('./routes/foundItemRoutes');
// const contactRequestRoutes = require('./routes/contactRequestRoutes');
// const authRoutes = require('./routes/auth');

// // Initialize express app
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ MongoDB connected'))
// .catch(err => console.log('❌ MongoDB connection error:', err));

// // Create HTTP server
// const server = http.createServer(app);

// // Configure Nodemailer with Outlook
// const transporter = nodemailer.createTransport({
//   host: 'smtp-mail.outlook.com', // Outlook SMTP server
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL_USER, // Your Outlook email address
//     pass: process.env.EMAIL_PASSWORD // Your Outlook password
//   },
//   tls: {
//     ciphers: 'SSLv3'
//   }
// });

// // Verify connection configuration
// transporter.verify(function(error, success) {
//   if (error) {
//     console.log('Server connection error: ', error);
//   } else {
//     console.log('Server is ready to take our messages');
//   }
// });

// // Initialize Socket.IO
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });

// // Message schema and model
// const messageSchema = new mongoose.Schema({
//   chatRoom: String,
//   sender: String,
//   content: String,
//   timestamp: { type: Date, default: Date.now }
// });
// const Message = mongoose.model('Message', messageSchema);

// // Socket.IO connection
// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);

//   // Join a chat room
//   socket.on('join_room', (roomId) => {
//     socket.join(roomId);
//     console.log(`User joined room: ${roomId}`);
//   });

//   socket.on('send_message', async ({ requestId, sender, content, recipientEmail }) => {
//     try {
//       const newMessage = new Message({
//         chatRoom: requestId,
//         sender,
//         content,
//         timestamp: new Date()
//       });
//       await newMessage.save();

//       // Send message to users in the room
//       io.to(requestId).emit('receive_message', {
//         _id: newMessage._id,
//         sender,
//         content,
//         timestamp: newMessage.timestamp
//       });

//       // Send email notification
//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: recipientEmail,
//         subject: 'New Message in Lost & Found Chat',
//         html: `
//           <h3>You have a new message</h3>
//           <p><strong>From:</strong> ${sender}</p>
//           <p><strong>Message:</strong> ${content}</p>
//           <p>Login to the application to respond to this message.</p>
//         `
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error('Error sending email:', error);
//         } else {
//           console.log('Email sent:', info.response);
//         }
//       });

//     } catch (error) {
//       console.error('Error saving message:', error);
//       socket.emit('message_error', 'Failed to send message');
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected:', socket.id);
//   });
// });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use(foundItemRoutes);
// app.use(contactRequestRoutes);

// // IMPORTANT: Start server using the HTTP server instance for Socket.IO to work
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

// Load environment variables
require('dotenv').config();

// Routes
const foundItemRoutes = require('./routes/foundItemRoutes');
const contactRequestRoutes = require('./routes/contactRequestRoutes');
const authRoutes = require('./routes/auth');

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Message schema and model
const messageSchema = new mongoose.Schema({
  chatRoom: String,
  sender: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join chat room
  socket.on('join_chat', async ({ requestId }) => {
    socket.join(requestId);
    console.log(`User joined chat: ${requestId}`);

    // Send chat history
    try {
      const chatHistory = await Message.find({ chatRoom: requestId })
        .sort({ timestamp: 1 });
      socket.emit('chat_history', chatHistory);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  });

  // Handle new messages
  socket.on('send_message', async ({ requestId, sender, content, recipientEmail }) => {
    try {
      // Save message
      const newMessage = new Message({
        chatRoom: requestId,
        sender,
        content,
        timestamp: new Date()
      });
      await newMessage.save();

      // Broadcast message
      io.to(requestId).emit('receive_message', {
        _id: newMessage._id,
        sender,
        content,
        timestamp: newMessage.timestamp
      });

      // Send email notification
      if (recipientEmail) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: recipientEmail,
          subject: 'New Message in Lost & Found Chat',
          html: `
            <h3>You have a new message</h3>
            <p><strong>From:</strong> ${sender}</p>
            <p><strong>Message:</strong> ${content}</p>
            <p>Login to the application to respond to this message.</p>
          `
        };

        transporter.sendMail(mailOptions)
          .then(info => console.log('Email sent:', info.response))
          .catch(error => console.error('Error sending email:', error));
      }
    } catch (error) {
      console.error('Error handling message:', error);
      socket.emit('message_error', 'Failed to send message');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.log('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use(foundItemRoutes);
app.use(contactRequestRoutes);

// Start server using the HTTP server instance
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
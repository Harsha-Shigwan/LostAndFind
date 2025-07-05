// // const express = require('express');
// // const router = express.Router();
// // const ContactRequest = require('../models/ContactRequest');
// // const FoundItem = require('../models/FoundItem');
// // const nodemailer = require('nodemailer'); // Install this package with npm

// // // Simple email configuration - consider using environment variables for security
// // // const transporter = nodemailer.createTransport({
// // //   service: 'gmail', // Replace with your email service
// // //   auth: {
// // //     user: process.env.EMAIL_USER || 'harshashigwan02@gmail.com', // Replace with your app's email
// // //     pass: process.env.EMAIL_PASSWORD || 'Harsha@04' // Replace with your app's password or app password
// // //   }
// // // });

// // const transporter = nodemailer.createTransport({
// //     service: 'gmail',
// //     auth: {
// //       user: process.env.EMAIL_USER,
// //       pass: process.env.EMAIL_PASSWORD
// //     }
// //   });
  

// // // Create a new contact request
// // router.post('/api/contact-request', async (req, res) => {
// //   try {
// //     const { 
// //       itemId, 
// //       requesterName, 
// //       requesterEmail, 
// //       requesterPhone,
// //       message,
// //       requestType
// //     } = req.body;
    
// //     // Find the item to get the finder's email
// //     const item = await FoundItem.findById(itemId);
// //     if (!item) {
// //       return res.status(404).json({ error: 'Item not found' });
// //     }
    
// //     // Create a new contact request
// //     const contactRequest = new ContactRequest({
// //       itemId,
// //       requesterName,
// //       requesterEmail,
// //       requesterPhone: requesterPhone || '',
// //       finderEmail: item.email,
// //       message,
// //       requestType,
// //       messages: requestType === 'chat' ? [{
// //         sender: requesterName,
// //         content: message
// //       }] : []
// //     });
    
// //     await contactRequest.save();
    
// //     // Send email notification to the item finder
// //     const mailOptions = {
// //       from: process.env.EMAIL_USER || 'your-app-email@gmail.com',
// //       to: item.email,
// //       subject: `New ${requestType} request for your found item: ${item.itemName}`,
// //       html: `
// //         <h3>Someone has contacted you about your found item</h3>
// //         <p><strong>Item:</strong> ${item.itemName}</p>
// //         <p><strong>From:</strong> ${requesterName}</p>
// //         <p><strong>Email:</strong> ${requesterEmail}</p>
// //         ${requesterPhone ? `<p><strong>Phone:</strong> ${requesterPhone}</p>` : ''}
// //         <p><strong>Message:</strong> ${message}</p>
// //         <p>This person believes this may be their lost item. Please login to the app to respond.</p>
// //       `
// //     };
    
// //     transporter.sendMail(mailOptions, (error, info) => {
// //       if (error) {
// //         console.error('Error sending email:', error);
// //       } else {
// //         console.log('Email sent:', info.response);
// //       }
// //     });
    
// //     res.status(201).json({ 
// //       message: 'Contact request sent successfully',
// //       requestId: contactRequest._id
// //     });
// //   } catch (error) {
// //     console.error('Error creating contact request:', error);
// //     res.status(500).json({ error: 'Failed to send contact request' });
// //   }
// // });

// // // Get contact requests for a specific item
// // router.get('/api/contact-requests/item/:itemId', async (req, res) => {
// //   try {
// //     const contactRequests = await ContactRequest.find({ itemId: req.params.itemId });
// //     res.json(contactRequests);
// //   } catch (error) {
// //     console.error('Error fetching contact requests:', error);
// //     res.status(500).json({ error: 'Failed to fetch contact requests' });
// //   }
// // });

// // // Get contact requests for a specific user (by email)
// // router.get('/api/contact-requests/user/:email', async (req, res) => {
// //   try {
// //     // Find requests where user is either the finder or requester
// //     const contactRequests = await ContactRequest.find({
// //       $or: [
// //         { finderEmail: req.params.email },
// //         { requesterEmail: req.params.email }
// //       ]
// //     }).populate('itemId');
    
// //     res.json(contactRequests);
// //   } catch (error) {
// //     console.error('Error fetching user contact requests:', error);
// //     res.status(500).json({ error: 'Failed to fetch contact requests' });
// //   }
// // });

// // // Add a message to an existing chat
// // router.post('/api/contact-requests/:requestId/messages', async (req, res) => {
// //   try {
// //     const { sender, content } = req.body;
    
// //     const contactRequest = await ContactRequest.findById(req.params.requestId);
// //     if (!contactRequest) {
// //       return res.status(404).json({ error: 'Contact request not found' });
// //     }
    
// //     // Add the new message
// //     contactRequest.messages.push({
// //       sender,
// //       content,
// //       timestamp: new Date()
// //     });
    
// //     await contactRequest.save();
    
// //     // Determine recipient email (the other person in the conversation)
// //     const recipientEmail = sender === contactRequest.requesterName 
// //       ? contactRequest.finderEmail 
// //       : contactRequest.requesterEmail;
    
// //     // Send email notification about new message
// //     const mailOptions = {
// //       from: process.env.EMAIL_USER || 'your-app-email@gmail.com',
// //       to: recipientEmail,
// //       subject: 'New message about found item',
// //       html: `
// //         <h3>You have a new message</h3>
// //         <p><strong>From:</strong> ${sender}</p>
// //         <p><strong>Message:</strong> ${content}</p>
// //         <p>Please login to the app to continue the conversation.</p>
// //       `
// //     };
    
// //     transporter.sendMail(mailOptions);
    
// //     res.status(200).json({ message: 'Message added successfully' });
// //   } catch (error) {
// //     console.error('Error adding message:', error);
// //     res.status(500).json({ error: 'Failed to add message' });
// //   }
// // });

// // // Update contact request status
// // router.patch('/api/contact-requests/:requestId/status', async (req, res) => {
// //   try {
// //     const { status } = req.body;
    
// //     const contactRequest = await ContactRequest.findByIdAndUpdate(
// //       req.params.requestId,
// //       { status },
// //       { new: true }
// //     );
    
// //     if (!contactRequest) {
// //       return res.status(404).json({ error: 'Contact request not found' });
// //     }
    
// //     res.json(contactRequest);
// //   } catch (error) {
// //     console.error('Error updating contact request status:', error);
// //     res.status(500).json({ error: 'Failed to update status' });
// //   }
// // });

// // module.exports = router;



// // // const express = require('express');
// // // const router = express.Router();
// // // const ContactRequest = require('../models/ContactRequest');
// // // const FoundItem = require('../models/FoundItem');
// // // const nodemailer = require('nodemailer');
// // // const crypto = require('crypto'); // For generating unique session IDs

// // // // Email transporter setup
// // // const transporter = nodemailer.createTransport({
// // //   service: 'gmail',
// // //   auth: {
// // //     user: process.env.EMAIL_USER,
// // //     pass: process.env.EMAIL_PASSWORD
// // //   }
// // // });

// // // // Create a new contact request (claim, chat, or call)
// // // router.post('/api/contact-request', async (req, res) => {
// // //   try {
// // //     const { 
// // //       itemId, 
// // //       requesterName, 
// // //       requesterEmail, 
// // //       requesterPhone,
// // //       message,
// // //       requestType // 'claim', 'chat', or 'call'
// // //     } = req.body;
    
// // //     // Find the item to get the finder's information
// // //     const item = await FoundItem.findById(itemId);
// // //     if (!item) {
// // //       return res.status(404).json({ error: 'Item not found' });
// // //     }
    
// // //     // Create a new contact request
// // //     const contactRequest = new ContactRequest({
// // //       itemId,
// // //       requesterName,
// // //       requesterEmail,
// // //       requesterPhone: requesterPhone || '',
// // //       finderEmail: item.email,
// // //       message,
// // //       requestType,
// // //       messages: requestType === 'chat' ? [{
// // //         sender: requesterName,
// // //         content: message,
// // //         timestamp: new Date()
// // //       }] : [],
// // //       // For call requests, generate a unique session ID
// // //       callSessionId: requestType === 'call' ? crypto.randomBytes(16).toString('hex') : null,
// // //       callStatus: requestType === 'call' ? 'requested' : 'none'
// // //     });
    
// // //     await contactRequest.save();
    
// // //     // Send real-time notification to the item finder if they're online
// // //     const sendNotification = req.app.get('sendNotification');
// // //     const notificationSent = sendNotification(item.email, 'new_contact_request', {
// // //       requestId: contactRequest._id,
// // //       itemName: item.itemName,
// // //       requesterName: requesterName,
// // //       requestType: requestType,
// // //       message: message.substring(0, 100) // Preview of message
// // //     });
    
// // //     // Customize email based on request type
// // //     let emailSubject = '';
// // //     let emailBody = '';
    
// // //     if (requestType === 'claim') {
// // //       emailSubject = `New claim request for your found item: ${item.itemName}`;
// // //       emailBody = `
// // //         <h3>Someone has claimed your found item</h3>
// // //         <p><strong>Item:</strong> ${item.itemName}</p>
// // //         <p><strong>From:</strong> ${requesterName}</p>
// // //         <p><strong>Message:</strong> ${message}</p>
// // //         <p>This person believes this may be their lost item. Please login to the app to respond.</p>
// // //       `;
// // //     } else if (requestType === 'chat') {
// // //       emailSubject = `New chat request about your found item: ${item.itemName}`;
// // //       emailBody = `
// // //         <h3>Someone wants to chat about your found item</h3>
// // //         <p><strong>Item:</strong> ${item.itemName}</p>
// // //         <p><strong>From:</strong> ${requesterName}</p>
// // //         <p><strong>Message:</strong> ${message}</p>
// // //         <p>Please login to the app to continue the conversation.</p>
// // //       `;
// // //     } else if (requestType === 'call') {
// // //       emailSubject = `New call request about your found item: ${item.itemName}`;
// // //       emailBody = `
// // //         <h3>Someone wants to call you about your found item</h3>
// // //         <p><strong>Item:</strong> ${item.itemName}</p>
// // //         <p><strong>From:</strong> ${requesterName}</p>
// // //         <p><strong>Message:</strong> ${message}</p>
// // //         <p>Please login to the app to schedule or accept this call request.</p>
// // //       `;
// // //     }
    
// // //     // Send email notification to the item finder (as backup for offline users)
// // //     const mailOptions = {
// // //       from: process.env.EMAIL_USER,
// // //       to: item.email,
// // //       subject: emailSubject,
// // //       html: emailBody
// // //     };
    
// // //     transporter.sendMail(mailOptions, (error, info) => {
// // //       if (error) {
// // //         console.error('Error sending email:', error);
// // //       } else {
// // //         console.log('Email sent:', info.response);
// // //       }
// // //     });
    
// // //     res.status(201).json({ 
// // //       message: `${requestType} request sent successfully`,
// // //       requestId: contactRequest._id,
// // //       realTimeDelivery: notificationSent
// // //     });
// // //   } catch (error) {
// // //     console.error('Error creating contact request:', error);
// // //     res.status(500).json({ error: 'Failed to send contact request' });
// // //   }
// // // });

// // // // Process call requests (schedule, accept, reject)
// // // router.patch('/api/contact-requests/:requestId/call', async (req, res) => {
// // //   try {
// // //     const { action, scheduledTime } = req.body;
// // //     const requestId = req.params.requestId;
    
// // //     const contactRequest = await ContactRequest.findById(requestId);
// // //     if (!contactRequest) {
// // //       return res.status(404).json({ error: 'Contact request not found' });
// // //     }
    
// // //     // Update the call status based on the action
// // //     switch (action) {
// // //       case 'schedule':
// // //         contactRequest.callStatus = 'scheduled';
// // //         contactRequest.scheduledCallTime = new Date(scheduledTime);
// // //         break;
// // //       case 'accept':
// // //         contactRequest.callStatus = 'accepted';
// // //         break;
// // //       case 'reject':
// // //         contactRequest.callStatus = 'missed';
// // //         break;
// // //       default:
// // //         return res.status(400).json({ error: 'Invalid action' });
// // //     }
    
// // //     await contactRequest.save();
    
// // //     // Determine recipient email (the person who requested the call)
// // //     const recipientEmail = contactRequest.requesterEmail;
    
// // //     // Send real-time notification if user is online
// // //     const sendNotification = req.app.get('sendNotification');
// // //     const notificationSent = sendNotification(recipientEmail, 'call_update', {
// // //       requestId: contactRequest._id,
// // //       itemId: contactRequest.itemId,
// // //       status: contactRequest.callStatus,
// // //       scheduledTime: contactRequest.scheduledCallTime
// // //     });
    
// // //     // Send email notification about call status
// // //     let emailSubject = 'Update on your call request';
// // //     let emailBody = '';
    
// // //     if (action === 'schedule') {
// // //       const callTime = new Date(scheduledTime).toLocaleString();
// // //       emailSubject = 'Your call has been scheduled';
// // //       emailBody = `
// // //         <h3>Your call request has been scheduled</h3>
// // //         <p>The finder of the item has scheduled a call with you.</p>
// // //         <p><strong>Scheduled time:</strong> ${callTime}</p>
// // //         <p>Please login to the app at the scheduled time to join the call.</p>
// // //       `;
// // //     } else if (action === 'accept') {
// // //       emailSubject = 'Your call request has been accepted';
// // //       emailBody = `
// // //         <h3>Your call request has been accepted</h3>
// // //         <p>The finder of the item is ready to talk now.</p>
// // //         <p>Please login to the app to join the call.</p>
// // //       `;
// // //     } else if (action === 'reject') {
// // //       emailSubject = 'Your call request cannot be fulfilled';
// // //       emailBody = `
// // //         <h3>Call request update</h3>
// // //         <p>The finder of the item is unable to take the call at this time.</p>
// // //         <p>Please try sending a message through the chat feature instead.</p>
// // //       `;
// // //     }
    
// // //     const mailOptions = {
// // //       from: process.env.EMAIL_USER,
// // //       to: recipientEmail,
// // //       subject: emailSubject,
// // //       html: emailBody
// // //     };
    
// // //     transporter.sendMail(mailOptions);
    
// // //     res.status(200).json({ 
// // //       message: 'Call request updated successfully',
// // //       callStatus: contactRequest.callStatus,
// // //       realTimeDelivery: notificationSent
// // //     });
// // //   } catch (error) {
// // //     console.error('Error updating call request:', error);
// // //     res.status(500).json({ error: 'Failed to update call request' });
// // //   }
// // // });

// // // // Add a message to an existing chat
// // // router.post('/api/contact-requests/:requestId/messages', async (req, res) => {
// // //   try {
// // //     const { sender, content } = req.body;
    
// // //     const contactRequest = await ContactRequest.findById(req.params.requestId);
// // //     if (!contactRequest) {
// // //       return res.status(404).json({ error: 'Contact request not found' });
// // //     }
    
// // //     // Add the new message
// // //     const newMessage = {
// // //       sender,
// // //       content,
// // //       timestamp: new Date()
// // //     };
    
// // //     contactRequest.messages.push(newMessage);
// // //     await contactRequest.save();
    
// // //     // Determine recipient email (the other person in the conversation)
// // //     const recipientEmail = sender === contactRequest.requesterName 
// // //       ? contactRequest.finderEmail 
// // //       : contactRequest.requesterEmail;
    
// // //     // Send real-time notification if recipient is online
// // //     const sendNotification = req.app.get('sendNotification');
// // //     const notificationSent = sendNotification(recipientEmail, 'new_message', {
// // //       requestId: contactRequest._id,
// // //       sender: sender,
// // //       preview: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
// // //       timestamp: newMessage.timestamp
// // //     });
    
// // //     // Send email notification about new message as backup
// // //     const mailOptions = {
// // //       from: process.env.EMAIL_USER,
// // //       to: recipientEmail,
// // //       subject: 'New message about found item',
// // //       html: `
// // //         <h3>You have a new message</h3>
// // //         <p><strong>From:</strong> ${sender}</p>
// // //         <p><strong>Message:</strong> ${content}</p>
// // //         <p>Please login to the app to continue the conversation.</p>
// // //       `
// // //     };
    
// // //     transporter.sendMail(mailOptions);
    
// // //     res.status(200).json({ 
// // //       message: 'Message added successfully',
// // //       realTimeDelivery: notificationSent
// // //     });
// // //   } catch (error) {
// // //     console.error('Error adding message:', error);
// // //     res.status(500).json({ error: 'Failed to add message' });
// // //   }
// // // });

// // // // Get contact requests for a specific item
// // // router.get('/api/contact-requests/item/:itemId', async (req, res) => {
// // //   try {
// // //     const contactRequests = await ContactRequest.find({ itemId: req.params.itemId });
// // //     res.json(contactRequests);
// // //   } catch (error) {
// // //     console.error('Error fetching contact requests:', error);
// // //     res.status(500).json({ error: 'Failed to fetch contact requests' });
// // //   }
// // // });

// // // // Get contact requests for a specific user (by email)
// // // router.get('/api/contact-requests/user/:email', async (req, res) => {
// // //   try {
// // //     // Find requests where user is either the finder or requester
// // //     const contactRequests = await ContactRequest.find({
// // //       $or: [
// // //         { finderEmail: req.params.email },
// // //         { requesterEmail: req.params.email }
// // //       ]
// // //     }).populate('itemId');
    
// // //     // Mark the user as online in the connections list
// // //     const userConnections = req.app.get('userConnections');
// // //     const io = req.app.get('io');
    
// // //     // If there are new items while the user has been offline, update status
// // //     if (contactRequests.some(req => req.isNew)) {
// // //       if (userConnections[req.params.email]) {
// // //         io.to(userConnections[req.params.email]).emit('sync_updates', {
// // //           message: 'You have new contact requests or messages'
// // //         });
// // //       }
// // //     }
    
// // //     res.json(contactRequests);
// // //   } catch (error) {
// // //     console.error('Error fetching user contact requests:', error);
// // //     res.status(500).json({ error: 'Failed to fetch contact requests' });
// // //   }
// // // });

// // // // Update contact request status
// // // router.patch('/api/contact-requests/:requestId/status', async (req, res) => {
// // //   try {
// // //     const { status } = req.body;
    
// // //     const contactRequest = await ContactRequest.findById(req.params.requestId);
// // //     if (!contactRequest) {
// // //       return res.status(404).json({ error: 'Contact request not found' });
// // //     }
    
// // //     // Store previous status to detect changes
// // //     const previousStatus = contactRequest.status;
    
// // //     // Update status
// // //     contactRequest.status = status;
// // //     await contactRequest.save();
    
// // //     // If status changed, notify the requester
// // //     if (previousStatus !== status) {
// // //       const sendNotification = req.app.get('sendNotification');
// // //       sendNotification(contactRequest.requesterEmail, 'status_update', {
// // //         requestId: contactRequest._id,
// // //         itemId: contactRequest.itemId,
// // //         previousStatus: previousStatus,
// // //         newStatus: status
// // //       });
      
// // //       // Also send email notification
// // //       const item = await FoundItem.findById(contactRequest.itemId);
// // //       const itemName = item ? item.itemName : 'an item';
      
// // //       const mailOptions = {
// // //         from: process.env.EMAIL_USER,
// // //         to: contactRequest.requesterEmail,
// // //         subject: `Status update on your request for ${itemName}`,
// // //         html: `
// // //           <h3>Your request status has been updated</h3>
// // //           <p>The status of your request has changed from ${previousStatus} to ${status}.</p>
// // //           <p>Please login to the app for more details.</p>
// // //         `
// // //       };
      
// // //       transporter.sendMail(mailOptions);
// // //     }
    
// // //     res.json(contactRequest);
// // //   } catch (error) {
// // //     console.error('Error updating contact request status:', error);
// // //     res.status(500).json({ error: 'Failed to update status' });
// // //   }
// // // });

// // // // Get active call session
// // // router.get('/api/contact-requests/:requestId/call-session', async (req, res) => {
// // //   try {
// // //     const requestId = req.params.requestId;
    
// // //     const contactRequest = await ContactRequest.findById(requestId);
// // //     if (!contactRequest) {
// // //       return res.status(404).json({ error: 'Contact request not found' });
// // //     }
    
// // //     // Check if the call is scheduled or accepted
// // //     if (contactRequest.callStatus !== 'scheduled' && contactRequest.callStatus !== 'accepted') {
// // //       return res.status(400).json({ error: 'Call is not currently available' });
// // //     }
    
// // //     // Return the call session details
// // //     res.json({
// // //       sessionId: contactRequest.callSessionId,
// // //       requestType: contactRequest.requestType,
// // //       itemId: contactRequest.itemId
// // //     });
// // //   } catch (error) {
// // //     console.error('Error getting call session:', error);
// // //     res.status(500).json({ error: 'Failed to get call session' });
// // //   }
// // // });

// // // module.exports = router;




// const express = require('express');
// const router = express.Router();
// const ContactRequest = require('../models/ContactRequest');
// const FoundItem = require('../models/FoundItem');
// const nodemailer = require('nodemailer');

// // Email configuration
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD
//   }
// });

// // Create a new contact request
// router.post('/api/contact-request', async (req, res) => {
//   try {
//     const { 
//       itemId, 
//       requesterName, 
//       requesterEmail, 
//       requesterPhone,
//       message,
//       requestType
//     } = req.body;
    
//     // Find the item to get the finder's email
//     const item = await FoundItem.findById(itemId);
//     if (!item) {
//       return res.status(404).json({ error: 'Item not found' });
//     }
    
//     // Create a new contact request
//     const contactRequest = new ContactRequest({
//       itemId,
//       requesterName,
//       requesterEmail,
//       requesterPhone: requesterPhone || '',
//       finderEmail: item.email,
//       message,
//       requestType,
//       messages: requestType === 'chat' ? [{
//         sender: requesterName,
//         content: message,
//         timestamp: new Date()
//       }] : []
//     });
    
//     await contactRequest.save();
    
//     // Send email notification to the item finder
//     const mailOptions = {
//       from: process.env.EMAIL_USER || 'your-app-email@gmail.com',
//       to: item.email,
//       subject: `New ${requestType} request for your found item: ${item.itemName}`,
//       html: `
//         <h3>Someone has contacted you about your found item</h3>
//         <p><strong>Item:</strong> ${item.itemName}</p>
//         <p><strong>From:</strong> ${requesterName}</p>
//         <p><strong>Email:</strong> ${requesterEmail}</p>
//         ${requesterPhone ? `<p><strong>Phone:</strong> ${requesterPhone}</p>` : ''}
//         <p><strong>Message:</strong> ${message}</p>
//         <p>This person believes this may be their lost item. Please login to the app to respond.</p>
//       `
//     };
    
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//       } else {
//         console.log('Email sent:', info.response);
//       }
//     });
    
//     res.status(201).json({ 
//       message: 'Contact request sent successfully',
//       requestId: contactRequest._id
//     });
//   } catch (error) {
//     console.error('Error creating contact request:', error);
//     res.status(500).json({ error: 'Failed to send contact request' });
//   }
// });

// // Get a specific contact request by ID (new endpoint)
// router.get('/api/contact-requests/:requestId', async (req, res) => {
//   try {
//     const contactRequest = await ContactRequest.findById(req.params.requestId);
//     if (!contactRequest) {
//       return res.status(404).json({ error: 'Contact request not found' });
//     }
//     res.json(contactRequest);
//   } catch (error) {
//     console.error('Error fetching contact request:', error);
//     res.status(500).json({ error: 'Failed to fetch contact request' });
//   }
// });

// // Get contact requests for a specific item
// router.get('/api/contact-requests/item/:itemId', async (req, res) => {
//   try {
//     const contactRequests = await ContactRequest.find({ itemId: req.params.itemId });
//     res.json(contactRequests);
//   } catch (error) {
//     console.error('Error fetching contact requests:', error);
//     res.status(500).json({ error: 'Failed to fetch contact requests' });
//   }
// });

// // Get contact requests for a specific user (by email)
// router.get('/api/contact-requests/user/:email', async (req, res) => {
//   try {
//     // Find requests where user is either the finder or requester
//     const contactRequests = await ContactRequest.find({
//       $or: [
//         { finderEmail: req.params.email },
//         { requesterEmail: req.params.email }
//       ]
//     }).populate('itemId');
    
//     res.json(contactRequests);
//   } catch (error) {
//     console.error('Error fetching user contact requests:', error);
//     res.status(500).json({ error: 'Failed to fetch contact requests' });
//   }
// });

// // Add a message to an existing chat
// router.post('/api/contact-requests/:requestId/messages', async (req, res) => {
//   try {
//     const { sender, content } = req.body;
    
//     const contactRequest = await ContactRequest.findById(req.params.requestId);
//     if (!contactRequest) {
//       return res.status(404).json({ error: 'Contact request not found' });
//     }
    
//     // Add the new message
//     const newMessage = {
//       sender,
//       content,
//       timestamp: new Date()
//     };
    
//     contactRequest.messages.push(newMessage);
//     await contactRequest.save();
    
//     // Determine recipient email (the other person in the conversation)
//     const recipientEmail = sender === contactRequest.requesterName 
//       ? contactRequest.finderEmail 
//       : contactRequest.requesterEmail;
    
//     // Send email notification about new message
//     const mailOptions = {
//       from: process.env.EMAIL_USER || 'your-app-email@gmail.com',
//       to: recipientEmail,
//       subject: 'New message about found item',
//       html: `
//         <h3>You have a new message</h3>
//         <p><strong>From:</strong> ${sender}</p>
//         <p><strong>Message:</strong> ${content}</p>
//         <p>Please login to the app to continue the conversation.</p>
//       `
//     };
    
//     transporter.sendMail(mailOptions);
    
//     res.status(200).json({ 
//       message: 'Message added successfully',
//       newMessage
//     });
//   } catch (error) {
//     console.error('Error adding message:', error);
//     res.status(500).json({ error: 'Failed to add message' });
//   }
// });

// // Update contact request status
// router.patch('/api/contact-requests/:requestId/status', async (req, res) => {
//   try {
//     const { status } = req.body;
    
//     const contactRequest = await ContactRequest.findByIdAndUpdate(
//       req.params.requestId,
//       { status },
//       { new: true }
//     );
    
//     if (!contactRequest) {
//       return res.status(404).json({ error: 'Contact request not found' });
//     }
    
//     res.json(contactRequest);
//   } catch (error) {
//     console.error('Error updating contact request status:', error);
//     res.status(500).json({ error: 'Failed to update status' });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const ContactRequest = require('../models/ContactRequest');
const FoundItem = require('../models/FoundItem');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Create a new contact request
router.post('/api/contact-request', async (req, res) => {
  try {
    const { 
      itemId, 
      requesterName, 
      requesterEmail, 
      requesterPhone,
      message,
      requestType
    } = req.body;
    
    const item = await FoundItem.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    const contactRequest = new ContactRequest({
      itemId,
      requesterName,
      requesterEmail,
      requesterPhone: requesterPhone || '',
      finderEmail: item.email,
      requestType,
      messages: requestType === 'chat' ? [{
        sender: requesterName,
        content: message
      }] : []
    });
    
    await contactRequest.save();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: item.email,
      subject: `New ${requestType} request for your found item: ${item.itemName}`,
      html: `
        <h3>Someone has contacted you about your found item</h3>
        <p><strong>Item:</strong> ${item.itemName}</p>
        <p><strong>From:</strong> ${requesterName}</p>
        <p><strong>Email:</strong> ${requesterEmail}</p>
        ${requesterPhone ? `<p><strong>Phone:</strong> ${requesterPhone}</p>` : ''}
        <p><strong>Message:</strong> ${message}</p>
        <p>Please login to the app to respond.</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    res.status(201).json({ 
      message: 'Contact request sent successfully',
      requestId: contactRequest._id
    });
  } catch (error) {
    console.error('Error creating contact request:', error);
    res.status(500).json({ error: 'Failed to send contact request' });
  }
});

// Get contact requests for a specific item
router.get('/api/contact-requests/item/:itemId', async (req, res) => {
  try {
    const contactRequests = await ContactRequest.find({ itemId: req.params.itemId });
    res.json(contactRequests);
  } catch (error) {
    console.error('Error fetching contact requests:', error);
    res.status(500).json({ error: 'Failed to fetch contact requests' });
  }
});

// Get contact requests for a specific user
router.get('/api/contact-requests/user/:email', async (req, res) => {
  try {
    const contactRequests = await ContactRequest.find({
      $or: [
        { finderEmail: req.params.email },
        { requesterEmail: req.params.email }
      ]
    }).populate('itemId');
    
    res.json(contactRequests);
  } catch (error) {
    console.error('Error fetching user contact requests:', error);
    res.status(500).json({ error: 'Failed to fetch contact requests' });
  }
});

// Add a message to an existing chat
router.post('/api/contact-requests/:requestId/messages', async (req, res) => {
  try {
    const { sender, content } = req.body;
    
    const contactRequest = await ContactRequest.findById(req.params.requestId);
    if (!contactRequest) {
      return res.status(404).json({ error: 'Contact request not found' });
    }
    
    contactRequest.messages.push({
      sender,
      content,
      timestamp: new Date()
    });
    
    await contactRequest.save();
    
    const recipientEmail = sender === contactRequest.requesterName 
      ? contactRequest.finderEmail 
      : contactRequest.requesterEmail;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: 'New message about found item',
      html: `
        <h3>You have a new message</h3>
        <p><strong>From:</strong> ${sender}</p>
        <p><strong>Message:</strong> ${content}</p>
        <p>Please login to the app to continue the conversation.</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Message added successfully' });
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ error: 'Failed to add message' });
  }
});

// Update contact request status
router.patch('/api/contact-requests/:requestId/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    const contactRequest = await ContactRequest.findByIdAndUpdate(
      req.params.requestId,
      { status },
      { new: true }
    );
    
    if (!contactRequest) {
      return res.status(404).json({ error: 'Contact request not found' });
    }
    
    res.json(contactRequest);
  } catch (error) {
    console.error('Error updating contact request status:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

module.exports = router;
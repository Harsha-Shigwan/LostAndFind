// // // import React, { useState } from 'react';
// // // import axios from 'axios';
// // // import '../SearchLostItems.css';

// // // function ContactModal({ item, onClose }) {
// // //   const [message, setMessage] = useState('');
// // //   const [activeTab, setActiveTab] = useState('chat');
// // //   const [isSending, setIsSending] = useState(false);

// // //   const handleCall = () => {
// // //     if (item.phone) {
// // //       window.open(`tel:${item.phone}`);
// // //     } else {
// // //       alert('No phone number available for this finder');
// // //     }
// // //   };

// // //   const handleVideoCall = () => {
// // //     alert('Video call functionality would be implemented here');
// // //     // Actual implementation would use WebRTC or a service like Twilio
// // //   };

// // //   const handleSendMessage = async () => {
// // //     if (!message.trim()) return;
    
// // //     setIsSending(true);
// // //     try {
// // //       await axios.post('/api/messages', {
// // //         to: item._id,
// // //         message: message,
// // //         itemId: item._id
// // //       });
// // //       alert('Message sent successfully!');
// // //       setMessage('');
// // //     } catch (error) {
// // //       console.error('Error sending message:', error);
// // //       alert('Failed to send message');
// // //     } finally {
// // //       setIsSending(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="contact-modal">
// // //       <div className="modal-content">
// // //         <div className="modal-header">
// // //           <h3>Contact Finder</h3>
// // //           <button className="close-btn" onClick={onClose}>×</button>
// // //         </div>

// // //         <div className="tabs">
// // //           <button 
// // //             className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
// // //             onClick={() => setActiveTab('chat')}
// // //           >
// // //             Chat
// // //           </button>
// // //           <button 
// // //             className={`tab-btn ${activeTab === 'call' ? 'active' : ''}`}
// // //             onClick={() => setActiveTab('call')}
// // //           >
// // //             Call
// // //           </button>
// // //         </div>

// // //         {activeTab === 'chat' ? (
// // //           <div className="chat-section">
// // //             <div className="chat-messages">
// // //               {/* Messages would be displayed here */}
// // //               <div className="message received">
// // //                 <p>Hello! I found this item.</p>
// // //               </div>
// // //             </div>
// // //             <div className="message-input">
// // //               <textarea
// // //                 value={message}
// // //                 onChange={(e) => setMessage(e.target.value)}
// // //                 placeholder="Type your message..."
// // //                 rows="3"
// // //               />
// // //               <button 
// // //                 onClick={handleSendMessage}
// // //                 disabled={isSending || !message.trim()}
// // //                 className="send-btn"
// // //               >
// // //                 {isSending ? 'Sending...' : 'Send'}
// // //               </button>
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           <div className="call-section">
// // //             <h4>Contact Options</h4>
// // //             <div className="call-options">
// // //               <button onClick={handleCall} className="call-btn">
// // //                 <i className="fas fa-phone"></i> Call
// // //               </button>
// // //               <button onClick={handleVideoCall} className="video-call-btn">
// // //                 <i className="fas fa-video"></i> Video Call
// // //               </button>
// // //             </div>
// // //             <p className="disclaimer">
// // //               Note: The finder's phone number is not displayed for privacy.
// // //               Calls will be connected directly.
// // //             </p>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ContactModal;


// // // import React, { useState } from 'react';
// // // import axios from 'axios';

// // // function ContactModal({ item, onClose }) {
// // //   const [message, setMessage] = useState('');
// // //   const [contactMethod, setContactMethod] = useState('chat');
// // //   const [userEmail, setUserEmail] = useState('');
// // //   const [userName, setUserName] = useState('');
// // //   const [chatMessages, setChatMessages] = useState([]);
// // //   const [chatStarted, setChatStarted] = useState(false);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
    
// // //     if (contactMethod === 'chat') {
// // //       // Add message to chat
// // //       const newMessage = {
// // //         sender: userName,
// // //         content: message,
// // //         timestamp: new Date().toISOString()
// // //       };
      
// // //       setChatMessages([...chatMessages, newMessage]);
// // //       setMessage('');
      
// // //       if (!chatStarted) {
// // //         setChatStarted(true);
        
// // //         // Notify the item finder about new chat request
// // //         try {
// // //           await axios.post('http://localhost:5000/api/contact-request', {
// // //             itemId: item._id,
// // //             requesterName: userName,
// // //             requesterEmail: userEmail,
// // //             message: `${userName} is claiming this item and wants to chat about "${item.itemName}"`
// // //           });
// // //         } catch (error) {
// // //           console.error('Failed to send contact request:', error);
// // //         }
// // //       }
// // //     } else if (contactMethod === 'call') {
// // //       // Handle call request
// // //       try {
// // //         await axios.post('http://localhost:5000/api/call-request', {
// // //           itemId: item._id,
// // //           requesterName: userName,
// // //           requesterEmail: userEmail,
// // //           message: `${userName} would like to arrange a call about "${item.itemName}"`
// // //         });
// // //         alert('Call request sent! The finder will contact you via email to arrange a call.');
// // //         onClose();
// // //       } catch (error) {
// // //         console.error('Failed to send call request:', error);
// // //         alert('Failed to send call request. Please try again.');
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <div className="contact-modal">
// // //       <div className="modal-content">
// // //         <div className="modal-header">
// // //           <h4>Contact about: {item.itemName}</h4>
// // //           <button type="button" className="close-button" onClick={onClose}>×</button>
// // //         </div>
        
// // //         {!chatStarted && (
// // //           <div className="contact-form">
// // //             <div className="form-group">
// // //               <label>Your Name</label>
// // //               <input 
// // //                 type="text" 
// // //                 value={userName} 
// // //                 onChange={(e) => setUserName(e.target.value)} 
// // //                 required 
// // //                 className="form-control"
// // //               />
// // //             </div>
            
// // //             <div className="form-group">
// // //               <label>Your Email</label>
// // //               <input 
// // //                 type="email" 
// // //                 value={userEmail} 
// // //                 onChange={(e) => setUserEmail(e.target.value)} 
// // //                 required 
// // //                 className="form-control"
// // //               />
// // //             </div>
            
// // //             <div className="form-group">
// // //               <label>Contact Method</label>
// // //               <div className="contact-options">
// // //                 <label>
// // //                   <input 
// // //                     type="radio" 
// // //                     value="chat" 
// // //                     checked={contactMethod === 'chat'} 
// // //                     onChange={() => setContactMethod('chat')} 
// // //                   />
// // //                   Chat
// // //                 </label>
// // //                 <label>
// // //                   <input 
// // //                     type="radio" 
// // //                     value="call" 
// // //                     checked={contactMethod === 'call'} 
// // //                     onChange={() => setContactMethod('call')} 
// // //                   />
// // //                   Request Call
// // //                 </label>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
        
// // //         {contactMethod === 'chat' && (
// // //           <>
// // //             <div className="chat-messages">
// // //               {chatMessages.length === 0 && !chatStarted ? (
// // //                 <p className="chat-info">Start a conversation with the finder of this item</p>
// // //               ) : (
// // //                 <>
// // //                   {chatMessages.map((msg, index) => (
// // //                     <div key={index} className={`message ${msg.sender === userName ? 'sent' : 'received'}`}>
// // //                       <strong>{msg.sender}:</strong> {msg.content}
// // //                     </div>
// // //                   ))}
// // //                   {chatStarted && chatMessages.length === 1 && (
// // //                     <p className="chat-info">Your message has been sent. The finder will be notified and can respond via email.</p>
// // //                   )}
// // //                 </>
// // //               )}
// // //             </div>
            
// // //             <form onSubmit={handleSubmit} className="message-form">
// // //               <textarea
// // //                 value={message}
// // //                 onChange={(e) => setMessage(e.target.value)}
// // //                 placeholder="Type your message here..."
// // //                 required
// // //                 className="form-control"
// // //               ></textarea>
// // //               <button type="submit" className="btn btn-primary">Send</button>
// // //             </form>
// // //           </>
// // //         )}
        
// // //         {contactMethod === 'call' && !chatStarted && (
// // //           <div className="call-request">
// // //             <p>Request a call with the finder. We'll notify them and they'll arrange a call via email.</p>
// // //             <textarea
// // //               value={message}
// // //               onChange={(e) => setMessage(e.target.value)}
// // //               placeholder="Add any details about your claim to this item..."
// // //               className="form-control"
// // //             ></textarea>
// // //             <button onClick={handleSubmit} className="btn btn-primary mt-3">Request Call</button>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ContactModal;



// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import '../SearchLostItems.css';
// // function ContactModal({ item, onClose }) {
// //   const [contactStep, setContactStep] = useState('initial'); // initial, chat, call, success
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [message, setMessage] = useState('');
// //   const [chatMessages, setChatMessages] = useState([]);
// //   const [contactRequestId, setContactRequestId] = useState(null);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const handleStartChat = () => {
// //     setContactStep('chat');
// //     setMessage(`Hi, I believe this ${item.itemName} is mine. Can we discuss further?`);
// //   };

// //   const handleStartCall = () => {
// //     setContactStep('call');
// //     setMessage(`Hi, I believe this ${item.itemName} is mine. I'd like to arrange a call to discuss further.`);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!name || !email || !message) {
// //       alert('Please fill all required fields');
// //       return;
// //     }

// //     setIsSubmitting(true);

// //     try {
// //       const requestType = contactStep === 'chat' ? 'chat' : 'call';
      
// //       const response = await axios.post('http://localhost:5000/api/contact-request', {
// //         itemId: item._id,
// //         requesterName: name,
// //         requesterEmail: email,
// //         requesterPhone: phone,
// //         message,
// //         requestType
// //       });

// //       setContactRequestId(response.data.requestId);
      
// //       if (contactStep === 'chat') {
// //         // Add the first message to chat history
// //         setChatMessages([{
// //           sender: name,
// //           content: message,
// //           timestamp: new Date().toISOString()
// //         }]);
// //         setMessage('');
// //       } else {
// //         // Show success message for call requests
// //         setContactStep('success');
// //       }
// //     } catch (error) {
// //       console.error('Error sending contact request:', error);
// //       alert('Failed to send request. Please try again.');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };


// //   // const handleSubmit = async (e) => {
// //   //   e.preventDefault();
  
// //   //   if (!file) return alert("Please upload or capture an image.");
  
// //   //   const formData = new FormData();
// //   //   formData.append('itemName', itemName);
// //   //   formData.append('category', category);
// //   //   formData.append('description', description);
// //   //   formData.append('locationFound', locationFound);
// //   //   formData.append('dateFound', dateFound);
// //   //   formData.append('photo', file);
// //   //   formData.append('email', email);
// //   //   formData.append('phoneNumber', phoneNumber);
// //   //   formData.append('contactPreference', contactPreference);
  
// //   //   try {
// //   //     const res = await axios.post('http://localhost:5000/api/found-items', formData, {
// //   //       headers: { 'Content-Type': 'multipart/form-data' }
// //   //     });
  
// //   //     // SERVER RETURNS A CUSTOM MESSAGE (TWO WAY)
// //   //     const serverMessage = res.data.message;
// //   //     const itemId = res.data.itemId;
  
// //   //     alert(`Success! Server says: ${serverMessage}\nItem ID: ${itemId}`);
// //   //     onClose();
// //   //   } catch (error) {
// //   //     console.error(error);
// //   //     alert('Error submitting item');
// //   //   }
// //   // };
  

// //   const sendChatMessage = async (e) => {
// //     e.preventDefault();
// //     if (!message.trim() || !contactRequestId) return;

// //     try {
// //       // Add message to UI immediately for responsiveness
// //       const newMessage = {
// //         sender: name,
// //         content: message,
// //         timestamp: new Date().toISOString()
// //       };
      
// //       setChatMessages([...chatMessages, newMessage]);
      
// //       // Send to server
// //       await axios.post(`http://localhost:5000/api/contact-requests/${contactRequestId}/messages`, {
// //         sender: name,
// //         content: message
// //       });
      
// //       setMessage('');
// //     } catch (error) {
// //       console.error('Error sending message:', error);
// //       alert('Failed to send message. Please try again.');
// //     }
// //   };

// //   return (
// //     <div className="contact-modal">
// //       <div className="modal-content">
// //         <div className="modal-header">
// //           <h4>Contact about: {item.itemName}</h4>
// //           <button type="button" className="close-button" onClick={onClose}>×</button>
// //         </div>

// //         {contactStep === 'initial' && (
// //           <div className="initial-options">
// //             <p>How would you like to contact the finder of this item?</p>
// //             <div className="contact-option-buttons">
// //               <button className="btn btn-primary" onClick={handleStartChat}>
// //                 Start a Chat
// //               </button>
// //               <button className="btn btn-outline-primary mt-2" onClick={handleStartCall}>
// //                 Request a Call
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {(contactStep === 'chat' || contactStep === 'call') && contactRequestId === null && (
// //           <form onSubmit={handleSubmit}>
// //             <div className="form-group">
// //               <label>Your Name*</label>
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 value={name}
// //                 onChange={(e) => setName(e.target.value)}
// //                 required
// //               />
// //             </div>
            
// //             <div className="form-group">
// //               <label>Your Email*</label>
// //               <input
// //                 type="email"
// //                 className="form-control"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //               />
// //             </div>
            
// //             <div className="form-group">
// //               <label>Your Phone Number {contactStep === 'call' ? '*' : '(Optional)'}</label>
// //               <input
// //                 type="tel"
// //                 className="form-control"
// //                 value={phone}
// //                 onChange={(e) => setPhone(e.target.value)}
// //                 required={contactStep === 'call'}
// //               />
// //             </div>
            
// //             <div className="form-group">
// //               <label>Message*</label>
// //               <textarea
// //                 className="form-control"
// //                 value={message}
// //                 onChange={(e) => setMessage(e.target.value)}
// //                 rows="4"
// //                 required
// //               ></textarea>
// //             </div>
            
// //             <div className="form-actions">
// //               <button
// //                 type="submit"
// //                 className="btn btn-success"
// //                 disabled={isSubmitting}
// //               >
// //                 {isSubmitting ? 'Sending...' : contactStep === 'chat' ? 'Start Chat' : 'Request Call'}
// //               </button>
// //               <button
// //                 type="button"
// //                 className="btn btn-secondary ml-2"
// //                 onClick={() => setContactStep('initial')}
// //                 disabled={isSubmitting}
// //               >
// //                 Back
// //               </button>
// //             </div>
// //           </form>
// //         )}

// //         {contactStep === 'chat' && contactRequestId && (
// //           <div className="chat-interface">
// //             <div className="chat-messages">
// //               {chatMessages.map((msg, index) => (
// //                 <div key={index} className={`message ${msg.sender === name ? 'sent' : 'received'}`}>
// //                   <div className="message-content">
// //                     <strong>{msg.sender}</strong>
// //                     <p>{msg.content}</p>
// //                     <small className="timestamp">
// //                       {new Date(msg.timestamp).toLocaleTimeString()}
// //                     </small>
// //                   </div>
// //                 </div>
// //               ))}
// //               {chatMessages.length === 1 && (
// //                 <div className="system-message">
// //                   Your message has been sent to the finder. They will be notified by email.
// //                   When they reply, you'll receive an email notification.
// //                 </div>
// //               )}
// //             </div>
            
// //             <form onSubmit={sendChatMessage} className="chat-input">
// //               <textarea
// //                 className="form-control"
// //                 value={message}
// //                 onChange={(e) => setMessage(e.target.value)}
// //                 placeholder="Type your message..."
// //                 rows="3"
// //                 required
// //               ></textarea>
// //               <button type="submit" className="btn btn-primary send-button">
// //                 Send
// //               </button>
// //             </form>
// //           </div>
// //         )}

// //         {contactStep === 'success' && (
// //           <div className="success-message">
// //             <div className="alert alert-success">
// //               <h5>Request Sent Successfully!</h5>
// //               <p>Your call request has been sent to the finder of this item.</p>
// //               <p>They will contact you via the email or phone number you provided.</p>
// //               <button className="btn btn-primary mt-3" onClick={onClose}>Close</button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default ContactModal;




// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';
// import '../SearchLostItems.css';

// function ContactModal({ item, onClose }) {
//   const [contactStep, setContactStep] = useState('initial'); // initial, chat, call, success
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [message, setMessage] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);
//   const [contactRequestId, setContactRequestId] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [socket, setSocket] = useState(null);
  
//   const chatContainerRef = useRef(null);

//   // Connect to Socket.io when component mounts
//   useEffect(() => {
//     const newSocket = io('http://localhost:5000');
//     setSocket(newSocket);
    
//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   // Join chat room when contact request is created
//   useEffect(() => {
//     if (socket && contactRequestId) {
//       socket.emit('join_chat', { 
//         userId: name || email,
//         requestId: contactRequestId
//       });
      
//       // Listen for new messages
//       socket.on('receive_message', (newMessage) => {
//         setChatMessages(prevMessages => [...prevMessages, newMessage]);
//       });
      
//       socket.on('message_error', (error) => {
//         console.error('Message error:', error);
//         alert('Failed to send message. Please try again.');
//       });
//     }
    
//     return () => {
//       if (socket) {
//         socket.off('receive_message');
//         socket.off('message_error');
//       }
//     };
//   }, [socket, contactRequestId, name, email]);

//   // Auto-scroll to bottom of chat when new messages arrive
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [chatMessages]);

//   // Load existing messages when contact request ID changes
//   useEffect(() => {
//     if (contactRequestId) {
//       fetchChatHistory();
//     }
//   }, [contactRequestId]);

//   const fetchChatHistory = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/contact-requests/${contactRequestId}`);
//       if (response.data && response.data.messages) {
//         setChatMessages(response.data.messages);
//       }
//     } catch (error) {
//       console.error('Error fetching chat history:', error);
//     }
//   };

//   const handleStartChat = () => {
//     setContactStep('chat');
//     setMessage(`Hi, I believe this ${item.itemName} is mine. Can we discuss further?`);
//   };

//   const handleStartCall = () => {
//     setContactStep('call');
//     setMessage(`Hi, I believe this ${item.itemName} is mine. I'd like to arrange a call to discuss further.`);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name || !email || !message) {
//       alert('Please fill all required fields');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const requestType = contactStep === 'chat' ? 'chat' : 'call';
      
//       const response = await axios.post('http://localhost:5000/api/contact-request', {
//         itemId: item._id,
//         requesterName: name,
//         requesterEmail: email,
//         requesterPhone: phone,
//         message,
//         requestType
//       });

//       setContactRequestId(response.data.requestId);
      
//       if (contactStep === 'chat') {
//         // Add the first message to chat history
//         const firstMessage = {
//           sender: name,
//           content: message,
//           timestamp: new Date().toISOString()
//         };
        
//         setChatMessages([firstMessage]);
//         setMessage('');
//       } else {
//         // Show success message for call requests
//         setContactStep('success');
//       }
//     } catch (error) {
//       console.error('Error sending contact request:', error);
//       alert('Failed to send request. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const sendChatMessage = async (e) => {
//     e.preventDefault();
//     if (!message.trim() || !contactRequestId) return;

//     try {
//       const newMessage = {
//         sender: name,
//         content: message,
//         timestamp: new Date().toISOString()
//       };
      
//       // Use socket to send message instead of direct API call
//       if (socket) {
//         socket.emit('send_message', {
//           requestId: contactRequestId,
//           sender: name,
//           content: message
//         });
//       } else {
//         // Fallback to HTTP if socket is not available
//         await axios.post(`http://localhost:5000/api/contact-requests/${contactRequestId}/messages`, {
//           sender: name,
//           content: message
//         });
        
//         // Add message to UI
//         setChatMessages([...chatMessages, newMessage]);
//       }
      
//       setMessage('');
//     } catch (error) {
//       console.error('Error sending message:', error);
//       alert('Failed to send message. Please try again.');
//     }
//   };

//   return (
//     <div className="contact-modal">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h4>Contact about: {item.itemName}</h4>
//           <button type="button" className="close-button" onClick={onClose}>×</button>
//         </div>

//         {contactStep === 'initial' && (
//           <div className="initial-options">
//             <p>How would you like to contact the finder of this item?</p>
//             <div className="contact-option-buttons">
//               <button className="btn btn-primary" onClick={handleStartChat}>
//                 Start a Chat
//               </button>
//               <button className="btn btn-outline-primary mt-2" onClick={handleStartCall}>
//                 Request a Call
//               </button>
//             </div>
//           </div>
//         )}

//         {(contactStep === 'chat' || contactStep === 'call') && contactRequestId === null && (
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Your Name*</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label>Your Email*</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label>Your Phone Number {contactStep === 'call' ? '*' : '(Optional)'}</label>
//               <input
//                 type="tel"
//                 className="form-control"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 required={contactStep === 'call'}
//               />
//             </div>
            
//             <div className="form-group">
//               <label>Message*</label>
//               <textarea
//                 className="form-control"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 rows="4"
//                 required
//               ></textarea>
//             </div>
            
//             <div className="form-actions">
//               <button
//                 type="submit"
//                 className="btn btn-success"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? 'Sending...' : contactStep === 'chat' ? 'Start Chat' : 'Request Call'}
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-secondary ml-2"
//                 onClick={() => setContactStep('initial')}
//                 disabled={isSubmitting}
//               >
//                 Back
//               </button>
//             </div>
//           </form>
//         )}

//         {contactStep === 'chat' && contactRequestId && (
//           <div className="chat-interface">
//             <div className="chat-messages" ref={chatContainerRef}>
//               {chatMessages.map((msg, index) => (
//                 <div key={index} className={`message ${msg.sender === name ? 'sent' : 'received'}`}>
//                   <div className="message-content">
//                     <strong>{msg.sender}</strong>
//                     <p>{msg.content}</p>
//                     <small className="timestamp">
//                       {new Date(msg.timestamp).toLocaleTimeString()}
//                     </small>
//                   </div>
//                 </div>
//               ))}
//               {chatMessages.length === 1 && (
//                 <div className="system-message">
//                   Your message has been sent to the finder. They will be notified by email.
//                   When they reply, you'll receive an email notification and see the message here in real-time.
//                 </div>
//               )}
//             </div>
            
//             <form onSubmit={sendChatMessage} className="chat-input">
//               <textarea
//                 className="form-control"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type your message..."
//                 rows="3"
//                 required
//               ></textarea>
//               <button type="submit" className="btn btn-primary send-button">
//                 Send
//               </button>
//             </form>
//           </div>
//         )}

//         {contactStep === 'success' && (
//           <div className="success-message">
//             <div className="alert alert-success">
//               <h5>Request Sent Successfully!</h5>
//               <p>Your call request has been sent to the finder of this item.</p>
//               <p>They will contact you via the email or phone number you provided.</p>
//               <button className="btn btn-primary mt-3" onClick={onClose}>Close</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ContactModal;


import React, { useState } from 'react';
import ChatComponent from './ChatComponent';
import '../SearchLostItems.css';

function ContactModal({ item, onClose }) {
  const [contactStep, setContactStep] = useState('initial');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [chatStarted, setChatStarted] = useState(false);
  const [contactRequestId, setContactRequestId] = useState(null);

  const handleStartChat = async () => {
    if (!name || !email) {
      alert('Please provide your name and email');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/contact-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: item._id,
          requesterName: name,
          requesterEmail: email,
          message: `Hi, I'm interested in the ${item.itemName} you found.`,
          requestType: 'chat'  // Add this required field
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create contact request');
      }
      
      setContactRequestId(data.requestId);
      setChatStarted(true);
      setContactStep('chat');
    } catch (error) {
      console.error('Error starting chat:', error);
      alert('Failed to start chat. Please try again.');
    }
  };

  return (
    <div className="contact-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4>Contact about: {item.itemName}</h4>
          <button type="button" className="close-button" onClick={onClose}>×</button>
        </div>

        {contactStep === 'initial' && (
          <div className="contact-form">
            <div className="form-group">
              <label>Your Name*</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Your Email*</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <button
              onClick={handleStartChat}
              className="btn btn-primary"
            >
              Start Chat
            </button>
          </div>
        )}

        {contactStep === 'chat' && contactRequestId && (
          <ChatComponent
            requestId={contactRequestId}
            currentUser={name}
            recipientEmail={item.email}
          />
        )}
      </div>
    </div>
  );
}

export default ContactModal;
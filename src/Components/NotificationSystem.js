// // src/components/NotificationSystem.js

// import React, { useEffect, useContext } from 'react';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import notificationService from '../services/NotificationService';
// import { useAuth } from '../routes/auth.js'; // Adjust import based on your auth setup

// const NotificationSystem = () => {
//   // Assuming you have some form of auth context
//   const { user } = useAuth();
  
//   useEffect(() => {
//     // Connect to notification service when user is authenticated
//     if (user && user.email) {
//       notificationService.connect(user.email);
      
//       // Example of registering for specific notification types
//       // These could update your app state or trigger other actions
      
//       // For new contact requests
//       const handleNewContactRequest = (data) => {
//         console.log('Handling new contact request:', data);
//         // Update your app state, e.g., increment badge count
//       };
//       notificationService.on('new_contact_request', handleNewContactRequest);
      
//       // For new messages
//       const handleNewMessage = (data) => {
//         console.log('Handling new message:', data);
//         // Update unread message counts, refresh conversations, etc.
//       };
//       notificationService.on('new_message', handleNewMessage);
      
//       // Clean up on unmount
//       return () => {
//         notificationService.off('new_contact_request', handleNewContactRequest);
//         notificationService.off('new_message', handleNewMessage);
//         notificationService.disconnect();
//       };
//     }
//   }, [user]);
  
//   return (
//     <ToastContainer 
//       position="top-right"
//       autoClose={5000}
//       hideProgressBar={false}
//       newestOnTop
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//     />
//   );
// };

// export default NotificationSystem;
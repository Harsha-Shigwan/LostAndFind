// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// // import './ChatComponent.css';

// const ChatComponent = ({ requestId, currentUser, recipientEmail }) => {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     // Connect to the Socket.IO server
//     const newSocket = io('http://localhost:5000');
//     setSocket(newSocket);

//     // Join the chat room
//     newSocket.emit('join_chat', { userId: currentUser, requestId });

//     // Listen for chat history
//     newSocket.on('chat_history', (history) => {
//       setMessages(history);
//     });

//     // Listen for new messages
//     newSocket.on('receive_message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     // Listen for typing status
//     newSocket.on('user_typing', ({ userId }) => {
//       if (userId !== currentUser) {
//         setIsTyping(true);
//       }
//     });

//     newSocket.on('user_stopped_typing', () => {
//       setIsTyping(false);
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, [requestId, currentUser]);

//   // Auto-scroll to bottom when new messages arrive
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleTyping = () => {
//     socket.emit('typing', { requestId, userId: currentUser });
//   };

//   const handleStopTyping = () => {
//     socket.emit('stop_typing', { requestId });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (newMessage.trim() && socket) {
//       socket.emit('send_message', {
//         requestId,
//         sender: currentUser,
//         content: newMessage.trim(),
//         recipientEmail: recipientEmail 
//       });
//       setNewMessage('');
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="messages-container">
//         {messages.map((message, index) => (
//           <div
//             key={message._id || index}
//             className={`message ${message.sender === currentUser ? 'sent' : 'received'}`}
//           >
//             <div className="message-content">{message.content}</div>
//             <div className="message-timestamp">
//               {new Date(message.timestamp).toLocaleTimeString()}
//             </div>
//           </div>
//         ))}
//         {isTyping && <div className="typing-indicator">User is typing...</div>}
//         <div ref={messagesEndRef} />
//       </div>
//       <form onSubmit={handleSubmit} className="message-form">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={handleTyping}
//           onKeyUp={handleStopTyping}
//           placeholder="Type a message..."
//           className="message-input"
//         />
//         <button type="submit" className="send-button">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatComponent;



import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import '../SearchLostItems.css';

const ChatComponent = ({ requestId, currentUser, recipientEmail }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Join the chat room
    newSocket.emit('join_chat', { requestId });

    // Listen for chat history
    newSocket.on('chat_history', (history) => {
      setMessages(history);
    });

    // Listen for new messages
    newSocket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen for errors
    newSocket.on('message_error', (error) => {
      console.error('Message error:', error);
      alert('Failed to send message. Please try again.');
    });

    return () => {
      newSocket.disconnect();
    };
  }, [requestId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      socket.emit('send_message', {
        requestId,
        sender: currentUser,
        content: newMessage.trim(),
        recipientEmail
      });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={message._id || index}
            className={`message ${message.sender === currentUser ? 'sent' : 'received'}`}
          >
            <div className="message-content">{message.content}</div>
            <div className="message-timestamp">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import '../SearchLostItems.css';

function MyContactRequests() {
  const [contactRequests, setContactRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const chatContainerRef = useRef(null);

  // Connect to Socket.io when component mounts  
  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);
    
    // For demo purposes, you'd normally get this from authentication
    const email = prompt("Enter your email to view your contact requests:");
    setUserEmail(email);
    
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Load contact requests when email is set
  useEffect(() => {
    if (userEmail) {
      fetchContactRequests();
    }
  }, [userEmail]);

  // Join chat room when a request is selected
  useEffect(() => {
    if (socket && selectedRequest) {
      socket.emit('join_chat', { 
        userId: userEmail,
        requestId: selectedRequest._id
      });
      
      // Listen for new messages
      socket.on('receive_message', (newMessage) => {
        // Update the selected request's messages
        setSelectedRequest(prev => ({
          ...prev,
          messages: [...prev.messages, newMessage]
        }));
      });
    }
    
    return () => {
      if (socket) {
        socket.off('receive_message');
      }
    };
  }, [socket, selectedRequest, userEmail]);

  // Auto-scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatContainerRef.current && selectedRequest) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [selectedRequest?.messages]);

  const fetchContactRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/contact-requests/user/${userEmail}`);
      setContactRequests(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching contact requests:', err);
      setError('Failed to load contact requests. Please try again.');
      setLoading(false);
    }
  };

  const handleSelectRequest = async (request) => {
    try {
      // Get the latest version of the request to make sure we have all messages
      const response = await axios.get(`http://localhost:5000/api/contact-requests/${request._id}`);
      setSelectedRequest(response.data);
      setMessage('');
    } catch (err) {
      console.error('Error fetching contact request details:', err);
      alert('Failed to load conversation details.');
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedRequest) return;

    const senderName = selectedRequest.finderEmail === userEmail 
      ? selectedRequest.itemId.finderName || 'Item Finder'  // You might need to adjust this if you have a different field for finder name
      : selectedRequest.requesterName;

    try {
      if (socket) {
        socket.emit('send_message', {
          requestId: selectedRequest._id,
          sender: senderName,
          content: message
        });
      } else {
        // Fallback to HTTP if socket is not available
        await axios.post(`http://localhost:5000/api/contact-requests/${selectedRequest._id}/messages`, {
          sender: senderName,
          content: message
        });
        
        // Refresh the contact request to get updated messages
        const response = await axios.get(`http://localhost:5000/api/contact-requests/${selectedRequest._id}`);
        setSelectedRequest(response.data);
      }
      
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const updateRequestStatus = async (status) => {
    try {
      await axios.patch(`http://localhost:5000/api/contact-requests/${selectedRequest._id}/status`, { status });
      
      // Update local state
      setSelectedRequest({ ...selectedRequest, status });
      setContactRequests(contactRequests.map(req => 
        req._id === selectedRequest._id ? { ...req, status } : req
      ));
      
      alert(`Request marked as ${status}`);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="loading">Loading contact requests...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-contact-requests">
      <h2>My Contact Requests</h2>
      
      <div className="contact-requests-container">
        <div className="request-list">
          <h3>Requests ({contactRequests.length})</h3>
          {contactRequests.length === 0 ? (
            <p>No contact requests found.</p>
          ) : (
            <ul>
              {contactRequests.map(request => (
                <li 
                  key={request._id} 
                  className={`request-item ${selectedRequest?._id === request._id ? 'active' : ''} ${request.status}`}
                  onClick={() => handleSelectRequest(request)}
                >
                  <div className="request-info">
                    <div className="request-type">
                      {request.requestType === 'chat' ? '💬 Chat' : '📞 Call'}
                    </div>
                    <div className="request-item-name">
                      Item: {request.itemId?.itemName || 'Unknown item'}
                    </div>
                    <div className="request-person">
                      {userEmail === request.finderEmail 
                        ? `From: ${request.requesterName}`
                        : `To: Item Finder`}
                    </div>
                    <div className="request-date">
                      {new Date(request.createdAt).toLocaleString()}
                    </div>
                    <div className="request-status">
                      Status: {request.status}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="request-detail">
          {selectedRequest ? (
            <div className="detail-container">
              <div className="detail-header">
                <h3>
                  {selectedRequest.requestType === 'chat' ? 'Chat' : 'Call Request'}: {selectedRequest.itemId?.itemName}
                </h3>
                <div className="status-badge">{selectedRequest.status}</div>
              </div>
              
              <div className="detail-info">
                <p><strong>Requester:</strong> {selectedRequest.requesterName} ({selectedRequest.requesterEmail})</p>
                {selectedRequest.requesterPhone && (
                  <p><strong>Phone:</strong> {selectedRequest.requesterPhone}</p>
                )}
                <p><strong>Request Type:</strong> {selectedRequest.requestType}</p>
                <p><strong>Created:</strong> {new Date(selectedRequest.createdAt).toLocaleString()}</p>
              </div>
              
              {selectedRequest.requestType === 'chat' && (
                <>
                  <div className="chat-messages" ref={chatContainerRef}>
                    {selectedRequest.messages.map((msg, index) => (
                      <div 
                        key={index} 
                        className={`message ${msg.sender === (userEmail === selectedRequest.finderEmail ? 'Item Finder' : selectedRequest.requesterName) ? 'sent' : 'received'}`}
                      >
                        <div className="message-content">
                          <strong>{msg.sender}</strong>
                          <p>{msg.content}</p>
                          <small className="timestamp">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <form onSubmit={sendMessage} className="message-form">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your reply..."
                      className="message-input"
                      rows="3"
                      required
                    ></textarea>
                    <button type="submit" className="send-button">Send</button>
                  </form>
                </>
              )}
              
              {selectedRequest.requestType === 'call' && (
                <div className="call-info">
                  <p>This person would like to arrange a call to discuss the item.</p>
                  <p>You can contact them at:</p>
                  <p><strong>Email:</strong> {selectedRequest.requesterEmail}</p>
                  {selectedRequest.requesterPhone && (
                    <p><strong>Phone:</strong> {selectedRequest.requesterPhone}</p>
                  )}
                </div>
              )}
              
              <div className="status-actions">
                <h4>Update Status:</h4>
                <div className="status-buttons">
                  <button 
                    onClick={() => updateRequestStatus('in-progress')}
                    className={`status-button in-progress ${selectedRequest.status === 'in-progress' ? 'active' : ''}`}
                    disabled={selectedRequest.status === 'in-progress'}
                  >
                    In Progress
                  </button>
                  <button 
                    onClick={() => updateRequestStatus('resolved')}
                    className={`status-button resolved ${selectedRequest.status === 'resolved' ? 'active' : ''}`}
                    disabled={selectedRequest.status === 'resolved'}
                  >
                    Resolved
                  </button>
                  <button 
                    onClick={() => updateRequestStatus('cancelled')}
                    className={`status-button cancelled ${selectedRequest.status === 'cancelled' ? 'active' : ''}`}
                    disabled={selectedRequest.status === 'cancelled'}
                  >
                    Cancelled
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <p>Select a contact request to view details</p>
            </div>
          )}
        </div>

    
      </div> 
    </div> 
  );
}

export default MyContactRequests;

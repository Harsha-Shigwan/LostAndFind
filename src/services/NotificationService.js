// src/services/NotificationService.js

import io from 'socket.io-client';
import { toast } from 'react-toastify'; // You'll need to install this package

class NotificationService {
  constructor() {
    this.socket = null;
    this.connected = false;
    this.callbacks = {
      'new_contact_request': [],
      'new_message': [],
      'call_update': [],
      'status_update': []
    };
  }

  // Initialize the connection
  connect(userEmail) {
    if (this.socket) {
      this.socket.disconnect();
    }

    // Connect to the server
    // In development, use: const serverUrl = 'http://localhost:5000'
    // In production, you can leave it empty to connect to same origin
    const serverUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
    this.socket = io(serverUrl);

    // Listen for connection events
    this.socket.on('connect', () => {
      console.log('Connected to notification server');
      this.connected = true;
      
      // Authenticate with user email
      if (userEmail) {
        this.socket.emit('authenticate', { email: userEmail });
      }
    });

    // Handle disconnection
    this.socket.on('disconnect', () => {
      console.log('Disconnected from notification server');
      this.connected = false;
    });

    // Handle reconnection
    this.socket.on('reconnect', () => {
      console.log('Reconnected to notification server');
      this.connected = true;
      
      // Re-authenticate after reconnection
      if (userEmail) {
        this.socket.emit('authenticate', { email: userEmail });
      }
    });

    // Listen for notifications
    this.socket.on('notification', (notification) => {
      console.log('Received notification:', notification);
      
      // Show toast notification based on type
      this.showToastNotification(notification);
      
      // Call registered callbacks for this notification type
      if (this.callbacks[notification.type]) {
        this.callbacks[notification.type].forEach(callback => {
          try {
            callback(notification.data);
          } catch (error) {
            console.error('Error in notification callback:', error);
          }
        });
      }
    });

    // Handle synchronization updates when user reconnects
    this.socket.on('sync_updates', (data) => {
      console.log('Sync update received:', data);
      // Refresh data as needed
      if (this.callbacks['sync_updates']) {
        this.callbacks['sync_updates'].forEach(callback => callback(data));
      }
    });
  }

  // Disconnect
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  // Register a callback for a notification type
  on(notificationType, callback) {
    if (!this.callbacks[notificationType]) {
      this.callbacks[notificationType] = [];
    }
    this.callbacks[notificationType].push(callback);
  }

  // Remove a callback
  off(notificationType, callback) {
    if (this.callbacks[notificationType]) {
      this.callbacks[notificationType] = this.callbacks[notificationType]
        .filter(cb => cb !== callback);
    }
  }

  // Show toast notification
  showToastNotification(notification) {
    const { type, data } = notification;
    
    switch (type) {
      case 'new_contact_request':
        toast.info(`New ${data.requestType} request for: ${data.itemName}`, {
          onClick: () => {
            // Navigate to the contact request when clicked
            window.location.href = `/contact-requests/${data.requestId}`;
          }
        });
        break;
        
      case 'new_message':
        toast.info(`New message from ${data.sender}`, {
          onClick: () => {
            window.location.href = `/contact-requests/${data.requestId}`;
          }
        });
        break;
        
      case 'call_update':
        let callMessage = 'Call status updated';
        
        if (data.status === 'scheduled') {
          const date = new Date(data.scheduledTime).toLocaleString();
          callMessage = `Call scheduled for ${date}`;
        } else if (data.status === 'accepted') {
          callMessage = 'Call request accepted! Join now.';
        } else if (data.status === 'missed') {
          callMessage = 'Call request was declined';
        }
        
        toast.info(callMessage, {
          onClick: () => {
            window.location.href = `/contact-requests/${data.requestId}`;
          }
        });
        break;
        
      case 'status_update':
        toast.info(`Request status changed from ${data.previousStatus} to ${data.newStatus}`, {
          onClick: () => {
            window.location.href = `/contact-requests/${data.requestId}`;
          }
        });
        break;
        
      default:
        toast.info('New notification received');
    }
  }
}

// Create singleton instance
const notificationService = new NotificationService();
export default notificationService;
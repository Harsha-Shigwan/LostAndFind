import React, { useState } from 'react';
import axios from 'axios';
//import './ReportLostItemForm.css'; // optional for custom styling

function ReportLostItemForm() {
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    description: '',
    dateLost: '',
    locationLost: '',
    contactInfo: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/lost-requests', formData);
      setMessage('Lost item reported successfully!');
      setFormData({
        itemName: '',
        category: '',
        description: '',
        dateLost: '',
        locationLost: '',
        contactInfo: '',
      });
    } catch (err) {
      setError('Failed to report item. Please try again.');
    }
  };

  return (
    <div className="report-lost-item-form">
      <h2>Report Lost Item</h2>
      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={formData.itemName}
          onChange={handleChange}
          required
        />

        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Accessories">Accessories</option>
          <option value="Others">Others</option>
        </select>

        <textarea
          name="description"
          placeholder="Description..."
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="dateLost"
          value={formData.dateLost}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="locationLost"
          placeholder="Lost Location"
          value={formData.locationLost}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="contactInfo"
          placeholder="Email (to notify if found)"
          value={formData.contactInfo}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}

export default ReportLostItemForm;
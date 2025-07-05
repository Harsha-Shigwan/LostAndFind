// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../SearchLostItems.css';

// import 'bootstrap/dist/css/bootstrap.min.css';

// function SearchLostItems() {
//   const [items, setItems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/found-items');
//       setItems(res.data);
//     } catch (error) {
//       console.error('Failed to fetch items:', error);
//     }
//   };

//   const filteredItems = items.filter(item =>
//     item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.locationFound.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="search-lost-items container mt-4">
//       <h2 className="mb-4">Search Lost Items</h2>
//       <input
//         type="text"
//         placeholder="Search by name, category, location..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="search-input form-control mb-4"
//       />

//       <div className="items-grid">
//         {filteredItems.map(item => (
//           <div key={item._id} className="item-card card">
//             <img
//               src={`http://localhost:5000/${item.photoPath.replace(/\\/g, '/')}`}
//               alt={item.itemName}
//               className="item-photo card-img-top"
//             />
//             <div className="card-body">
//               <h4 className="card-title">{item.itemName}</h4>
//               <p className="card-text"><strong>Category:</strong> {item.category}</p>
//               <p className="card-text"><strong>Description:</strong> {item.description}</p>
//               <p className="card-text"><strong>Found at:</strong> {item.locationFound}</p>
//               <p className="card-text"><strong>Date:</strong> {new Date(item.dateFound).toLocaleDateString()}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredItems.length === 0 && (
//         <div className="no-results">
//           <p>No matching items found.</p>
//           <button 
//             onClick={() => navigate("/report-lost-item")}
//             className="btn btn-primary"
//           >
//             Click here to file a lost item complaint
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchLostItems;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../SearchLostItems.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function SearchLostItems() {
//   const [items, setItems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/found-items');
//       setItems(res.data);
//     } catch (error) {
//       console.error('Failed to fetch items:', error);
//     }
//   };

//   const filteredItems = items.filter(item =>
//     item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.locationFound.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="search-lost-items container mt-4">
//       <h2 className="mb-4">Search Lost Items</h2>
//       <input
//         type="text"
//         placeholder="Search by name, category, location..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="search-input form-control mb-4"
//       />

//       <div className="items-grid">
//         {filteredItems.map(item => (
//           <div key={item._id} className="item-card card">
//             <img
//               src={`http://localhost:5000/${item.photoPath.replace(/\\/g, '/')}`}
//               alt={item.itemName}
//               className="item-photo card-img-top"
//             />
//             <div className="card-body">
//               <h4 className="card-title">{item.itemName}</h4>
//               <p className="card-text"><strong>Category:</strong> {item.category}</p>
//               <p className="card-text"><strong>Description:</strong> {item.description}</p>
//               <p className="card-text"><strong>Found at:</strong> {item.locationFound}</p>
//               <p className="card-text"><strong>Date:</strong> {new Date(item.dateFound).toLocaleDateString()}</p>
//               <button 
//                 className="btn btn-success mt-2"
//                 onClick={() => {
//                   const subject = `Regarding your found item: ${item.itemName}`;
//                   const body = `Hello,\n\nI believe this item (${item.itemName}) belongs to me. ` +
//                     `Can we arrange to verify and return it?\n\nThank you,\n[Your Name]`;
//                   window.location.href = `mailto:${item.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//                 }}
//               >
//                 Contact Finder
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredItems.length === 0 && (
//         <div className="no-results">
//           <p>No matching items found.</p>
//           <button 
//             onClick={() => navigate("/report-lost-item")}
//             className="btn btn-primary"
//           >
//             Click here to file a lost item complaint
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchLostItems;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ContactModal from './ContactModal';
import '../SearchLostItems.css';

function SearchLostItems() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/found-items');
      setItems(res.data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.locationFound.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-lost-items container mt-4">
      <h2 className="mb-4">Search Lost Items</h2>
      <input
        type="text"
        placeholder="Search by name, category, location..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input form-control mb-4"
      />

      <div className="items-grid">
        {filteredItems.map(item => (
          <div key={item._id} className="item-card card">
            <img
              src={`http://localhost:5000/${item.photoPath.replace(/\\/g, '/')}`}
              alt={item.itemName}
              className="item-photo card-img-top"
            />
            <div className="card-body">
              <h4 className="card-title">{item.itemName}</h4>
              <p className="card-text"><strong>Category:</strong> {item.category}</p>
              <p className="card-text"><strong>Description:</strong> {item.description}</p>
              <p className="card-text"><strong>Found at:</strong> {item.locationFound}</p>
              <p className="card-text"><strong>Date:</strong> {new Date(item.dateFound).toLocaleDateString()}</p>
              <button 
                className="btn btn-success mt-2"
                onClick={() => setSelectedItem(item)}
              >
                Contact Finder
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="modal-overlay">
          <ContactModal 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="no-results">
          <p>No matching items found.</p>
          <button 
            onClick={() => navigate("/report-lost-item")}
            className="btn btn-primary"
          >
            Click here to file a lost item complaint
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchLostItems;

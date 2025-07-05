// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// function FoundItemForm({ onClose }) {
//   const [preview, setPreview] = useState(null);
//   const [file, setFile] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const videoRef = useRef(null);
//   const streamRef = useRef(null);
//   const formRef = useRef(null);

//   const [itemName, setItemName] = useState('');
//   const [category, setCategory] = useState('');
//   const [description, setDescription] = useState('');
//   const [locationFound, setLocationFound] = useState('');
//   const [dateFound, setDateFound] = useState('');
//   const [email, setEmail] =useState('');

//   useEffect(() => {
//     if (showCamera) {
//       navigator.mediaDevices.getUserMedia({
//         video: { facingMode: 'environment' },
//         audio: false,
//       }).then(stream => {
//         streamRef.current = stream;
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           videoRef.current.play();
//         }
//       }).catch(err => {
//         console.error('Camera error:', err);
//         alert('Could not access camera');
//         setShowCamera(false);
//       });
//     }

//     return () => {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [showCamera]);

//   const capturePhoto = () => {
//     const video = videoRef.current;
//     if (!video) return;

//     const canvas = document.createElement('canvas');
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     const imageData = canvas.toDataURL('image/jpeg');
//     canvas.toBlob(blob => {
//       const capturedFile = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
//       setFile(capturedFile);
//       setPreview(imageData);
//       setShowCamera(false);
//     }, 'image/jpeg');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) return alert("Please upload or capture an image.");

//     const formData = new FormData();
//     formData.append('itemName', itemName);
//     formData.append('category', category);
//     formData.append('description', description);
//     formData.append('locationFound', locationFound);
//     formData.append('dateFound', dateFound);
//     formData.append('photo', file);
//     formData.append('email',email);

//     try {
//       const res = await axios.post('http://localhost:5000/api/found-items', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       alert('Item reported successfully!');
//       onClose();
//     } catch (error) {
//       console.error(error);
//       alert('Error submitting item');
//     }
//   };

//   return (
//     <div className="found-item-form">
//       <h3>Report Found Item</h3>
//       <form onSubmit={handleSubmit} ref={formRef} style={{
//         maxHeight: '80vh',
//         overflowY: 'auto',
//         paddingRight: '10px'
//       }}>
//         <div className="form-group">
//           <label>Item Photo</label>
//           <div className="photo-upload">
//             {preview ? (
//               <div className="preview-container">
//                 <img src={preview} alt="Preview" className="preview-image" />
//                 <button 
//                   type="button" 
//                   className="remove-photo"
//                   onClick={() => { setPreview(null); setFile(null); }}
//                 >
//                   ×
//                 </button>
//               </div>
//             ) : showCamera ? (
//               <div className="camera-preview">
//                 <video ref={videoRef} autoPlay style={{ width: '100%' }} />
//                 <div className="camera-buttons" style={{
//                   display: 'flex',
//                   gap: '10px',
//                   marginTop: '10px'
//                 }}>
//                   <button 
//                     type="button" 
//                     onClick={capturePhoto}
//                     style={{
//                       padding: '8px 16px',
//                       background: '#3B82F6',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '4px'
//                     }}
//                   >
//                     Take Photo
//                   </button>
//                   <button 
//                     type="button" 
//                     onClick={() => setShowCamera(false)}
//                     style={{
//                       padding: '8px 16px',
//                       background: '#EF4444',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '4px'
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   onChange={e => {
//                     const selected = e.target.files[0];
//                     if (selected) {
//                       setFile(selected);
//                       const reader = new FileReader();
//                       reader.onloadend = () => setPreview(reader.result);
//                       reader.readAsDataURL(selected);
//                     }
//                   }} 
//                   style={{ display: 'none' }}
//                   id="file-upload"
//                 />
//                 <label 
//                   htmlFor="file-upload" 
//                   style={{
//                     display: 'block',
//                     padding: '10px',
//                     background: '#f0f0f0',
//                     borderRadius: '4px',
//                     textAlign: 'center',
//                     cursor: 'pointer',
//                     marginBottom: '10px'
//                   }}
//                 >
//                   Upload Photo
//                 </label>
//                 <button 
//                   type="button" 
//                   onClick={() => setShowCamera(true)}
//                   style={{
//                     width: '100%',
//                     padding: '10px',
//                     background: '#3B82F6',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   Open Camera
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         <div className="form-group">
//           <label>Item Name</label>
//           <input 
//             type="text" 
//             value={itemName} 
//             onChange={(e) => setItemName(e.target.value)} 
//             required 
//             style={{
//               width: '100%',
//               padding: '8px',
//               border: '1px solid #ddd',
//               borderRadius: '4px'
//             }}
//           />
//         </div>
//         <div className="form-group">
//           <label>Category</label>
//           <select 
//             value={category} 
//             onChange={(e) => setCategory(e.target.value)} 
//             required
//             style={{
//               width: '100%',
//               padding: '8px',
//               border: '1px solid #ddd',
//               borderRadius: '4px'
//             }}
//           >
//             <option value="">Select category</option>
//             <option value="electronics">Electronics</option>
//             <option value="documents">Documents</option>
//             <option value="clothing">Clothing</option>
//             <option value="jewelry">Jewelry</option>
//             <option value="other">Other</option>
//           </select>
//         </div>
//         <div className="form-group">
//   <label>Email</label>
//   <input 
//     type="email" 
//     value={email} 
//     onChange={(e) => setEmail(e.target.value)} 
//     required 
//     style={{
//       width: '100%',
//       padding: '8px',
//       border: '1px solid #ddd',
//       borderRadius: '4px'
//     }}
//   />
// </div>

//         <div className="form-group">
//           <label>Description</label>
//           <textarea 
//             value={description} 
//             onChange={(e) => setDescription(e.target.value)} 
//             required
//             style={{
//               width: '100%',
//               padding: '8px',
//               border: '1px solid #ddd',
//               borderRadius: '4px',
//               minHeight: '100px'
//             }}
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label>Location Found</label>
//           <input 
//             type="text" 
//             value={locationFound} 
//             onChange={(e) => setLocationFound(e.target.value)} 
//             required 
//             style={{
//               width: '100%',
//               padding: '8px',
//               border: '1px solid #ddd',
//               borderRadius: '4px'
//             }}
//           />
//         </div>
//         <div className="form-group">
//           <label>Date Found</label>
//           <input 
//             type="date" 
//             value={dateFound} 
//             onChange={(e) => setDateFound(e.target.value)} 
//             required 
//             style={{
//               width: '100%',
//               padding: '8px',
//               border: '1px solid #ddd',
//               borderRadius: '4px'
//             }}
//           />
//         </div>
//         <div className="form-buttons" style={{
//           position: 'sticky',
//           bottom: '0',
//           background: 'white',
//           padding: '15px 0',
//           display: 'flex',
//           justifyContent: 'space-between',
//           gap: '10px'
//         }}>
//           <button 
//             type="submit" 
//             className="submit-button"
//             style={{
//               padding: '10px 20px',
//               background: '#3B82F6',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               flex: '1'
//             }}
//           >
//             Submit
//           </button>
//           <button 
//             type="button" 
//             onClick={onClose} 
//             className="cancel-button"
//             style={{
//               padding: '10px 20px',
//               background: '#EF4444',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               flex: '1'
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default FoundItemForm;


import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function FoundItemForm({ onClose }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const formRef = useRef(null);

  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [locationFound, setLocationFound] = useState('');
  const [dateFound, setDateFound] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contactPreference, setContactPreference] = useState('email');

  useEffect(() => {
    if (showCamera) {
      navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      }).then(stream => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }).catch(err => {
        console.error('Camera error:', err);
        alert('Could not access camera');
        setShowCamera(false);
      });
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [showCamera]);

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/jpeg');
    canvas.toBlob(blob => {
      const capturedFile = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
      setFile(capturedFile);
      setPreview(imageData);
      setShowCamera(false);
    }, 'image/jpeg');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please upload or capture an image.");

    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('locationFound', locationFound);
    formData.append('dateFound', dateFound);
    formData.append('photo', file);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('contactPreference', contactPreference);

    try {
      const res = await axios.post('http://localhost:5000/api/found-items', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Item reported successfully!');
      onClose();
    } catch (error) {
      console.error(error);
      alert('Error submitting item');
    }
  };

  return (
    <div className="found-item-form">
      <h3>Report Found Item</h3>
      <form onSubmit={handleSubmit} ref={formRef} style={{
        maxHeight: '80vh',
        overflowY: 'auto',
        paddingRight: '10px'
      }}>
        <div className="form-group">
          <label>Item Photo</label>
          <div className="photo-upload">
            {preview ? (
              <div className="preview-container">
                <img src={preview} alt="Preview" className="preview-image" />
                <button 
                  type="button" 
                  className="remove-photo"
                  onClick={() => { setPreview(null); setFile(null); }}
                >
                  ×
                </button>
              </div>
            ) : showCamera ? (
              <div className="camera-preview">
                <video ref={videoRef} autoPlay style={{ width: '100%' }} />
                <div className="camera-buttons" style={{
                  display: 'flex',
                  gap: '10px',
                  marginTop: '10px'
                }}>
                  <button 
                    type="button" 
                    onClick={capturePhoto}
                    style={{
                      padding: '8px 16px',
                      background: '#3B82F6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px'
                    }}
                  >
                    Take Photo
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowCamera(false)}
                    style={{
                      padding: '8px 16px',
                      background: '#EF4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => {
                    const selected = e.target.files[0];
                    if (selected) {
                      setFile(selected);
                      const reader = new FileReader();
                      reader.onloadend = () => setPreview(reader.result);
                      reader.readAsDataURL(selected);
                    }
                  }} 
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label 
                  htmlFor="file-upload" 
                  style={{
                    display: 'block',
                    padding: '10px',
                    background: '#f0f0f0',
                    borderRadius: '4px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '10px'
                  }}
                >
                  Upload Photo
                </label>
                <button 
                  type="button" 
                  onClick={() => setShowCamera(true)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: '#3B82F6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Open Camera
                </button>
              </>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Item Name</label>
          <input 
            type="text" 
            value={itemName} 
            onChange={(e) => setItemName(e.target.value)} 
            required 
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="">Select category</option>
            <option value="electronics">Electronics</option>
            <option value="documents">Documents</option>
            <option value="clothing">Clothing</option>
            <option value="jewelry">Jewelry</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Contact Information</label>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div className="form-group">
            <label>Phone Number (optional)</label>
            <input 
              type="tel" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div className="form-group">
            <label>Preferred Contact Method</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <label>
                <input 
                  type="radio" 
                  name="contactPreference" 
                  value="email" 
                  checked={contactPreference === 'email'} 
                  onChange={() => setContactPreference('email')} 
                />
                Email
              </label>
              <label>
                <input 
                  type="radio" 
                  name="contactPreference" 
                  value="phone" 
                  checked={contactPreference === 'phone'} 
                  onChange={() => setContactPreference('phone')} 
                />
                Phone
              </label>
              <label>
                <input 
                  type="radio" 
                  name="contactPreference" 
                  value="both" 
                  checked={contactPreference === 'both'} 
                  onChange={() => setContactPreference('both')} 
                />
                Both
              </label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              minHeight: '100px'
            }}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Location Found</label>
          <input 
            type="text" 
            value={locationFound} 
            onChange={(e) => setLocationFound(e.target.value)} 
            required 
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        <div className="form-group">
          <label>Date Found</label>
          <input 
            type="date" 
            value={dateFound} 
            onChange={(e) => setDateFound(e.target.value)} 
            required 
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        <div className="form-buttons" style={{
          position: 'sticky',
          bottom: '0',
          background: 'white',
          padding: '15px 0',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px'
        }}>
          <button 
            type="submit" 
            className="submit-button"
            style={{
              padding: '10px 20px',
              background: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              flex: '1'
            }}
          >
            Submit
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            className="cancel-button"
            style={{
              padding: '10px 20px',
              background: '#EF4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              flex: '1'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default FoundItemForm;
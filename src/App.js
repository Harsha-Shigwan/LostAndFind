import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './Components/HomePage';
import SearchLostItems from './Components/SearchLostItem';
import ReportLostItemForm from './Components/ReportLostItemForm';
import NotificationSystem from './Components/NotificationSystem';

 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/searchLost" element={<SearchLostItems/>} />
        <Route path="/report-lost-item" element={<ReportLostItemForm />} />
        <Route path="/notify" element={<NotificationSystem />} />
      </Routes>
    </Router>
  );
}
export default App;

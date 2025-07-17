import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import CompanyPage from './pages/CompanyPage';
import CompanyDirectory from './pages/CompanyDirectory';
import Methodology from './pages/Methodology';
import Footer from './components/Footer'; 

function App() {
  return (
    <Router basename="/rai-score">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company/:slug" element={<CompanyPage />} />
        <Route path="/companies" element={<CompanyDirectory />} />
		<Route path="/methodology" element={<Methodology />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
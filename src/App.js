import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import CompanyPage from './pages/CompanyPage';
import CompanyDirectory from './pages/CompanyDirectory';
import Footer from './components/Footer'; 

function App() {
  return (
   <Router>
  <NavBar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/company/:slug" element={<CompanyPage />} />
    <Route path="/companies" element={<CompanyDirectory />} />
  </Routes>
  <Footer /> {/* add this below routes */}
</Router>
  );
}

export default App;
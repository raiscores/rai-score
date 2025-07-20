import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import CompanyPage from './pages/CompanyPage';
import CompanyDirectory from './pages/CompanyDirectory';
import Methodology from './pages/Methodology';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import ComingSoon from './pages/ComingSoon';
import Footer from './components/Footer'; 
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router> {/* remove basename for now */}
      <>
		<ScrollToTop />
        <NavBar />
			<Routes>
			  <Route path="/" element={<Home />} />
			  <Route path="/company/:slug" element={<CompanyPage />} />
			  <Route path="/companies" element={<CompanyDirectory />} />
			  <Route path="/methodology" element={<Methodology />} />
			  <Route path="/about" element={<AboutPage />} />
			  <Route path="/contact" element={<ContactPage />} />
			  {/* Add under-construction routes */}
			  <Route path="/privacy" element={<ComingSoon />} />
			  <Route path="/terms" element={<ComingSoon />} />
			  <Route path="/blog" element={<ComingSoon />} />
			  <Route path="/faq" element={<ComingSoon />} />
			  {/* Catch-all: */}
			  <Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
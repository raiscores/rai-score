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
import ReactGA from "react-ga4"; // Google Analytics Library
import usePageViews from "./hooks/usePageViews"; // Load page view hooks file to send page data to Google Analytics

ReactGA.initialize("G-2RXBCGPN1T"); // <-- put your real Measurement ID here

// Tracker component: runs the usePageViews hook inside the Router context
function PageViewTracker() {
  usePageViews();
  return null;
}

function App() {
  return (
    <Router>
      <PageViewTracker /> {/* Ensures GA tracks every route change */}
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
          {/* Under-construction routes */}
		  <Route path="/coming-soon" element={<ComingSoon />} />
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

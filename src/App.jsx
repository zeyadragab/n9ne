import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Lazy load page components for better performance
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const ServicesPage = lazy(() => import("./pages/ServicesPage.jsx"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage.jsx"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-bg-main">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-4 border-accent-purple/20"></div>
      <div className="absolute inset-0 rounded-full border-4 border-t-accent-purple border-r-accent-pink border-b-accent-blue border-l-transparent animate-spin"></div>
    </div>
  </div>
);

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
        <Footer />
        <SpeedInsights />
      </Router>
    </MotionConfig>
  );
}

export default App;

import React from 'react';
import { motion } from 'framer-motion';
import logo from '../img/Gennify - Transparent-Photoroom (1).png'; // Adjust the path to your logo image

const Footer = () => {
  return (
    <motion.footer
      className="bg-dark text-white mt-5 text-center py-4"
      initial={{ opacity: 0, y: 50 }} // Start with hidden and off-screen
      whileInView={{ opacity: 1, y: 0 }} // Animate to visible and on-screen when in view
      transition={{ duration: 0.5, ease: 'easeOut' }} // Animation duration and easing
      viewport={{ once: true }} // Trigger animation only once when it comes into view
    >
      <div className="container">
        <img 
          src={logo} 
          alt="Gennify Logo" 
          className="footer-logo mb-3" 
          style={{ maxWidth: '150px' }} 
        />
        <p className="mb-2">&copy; {new Date().getFullYear()} Gennify. All rights reserved.</p>
        <p className="mb-0">
          <a href="/privacy-policy" className="text-white hover:text-primary mx-2">Privacy Policy</a> | 
          <a href="/terms-of-service" className="text-white hover:text-primary mx-2">Terms of Service</a>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;

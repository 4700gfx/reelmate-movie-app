import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-column">
            <h4>Main Website</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Featured Nails</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li><a href="#">Hand Scrub</a></li>
              <li><a href="#">Lioness's Cuticle Oil</a></li>
              <li><a href="#">Lioness's Mini Cuticle</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>About Me</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">More Information</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Follow Me</h4>
            <div className="footer-social-links">
              <a href="#"><img src="images/instagram.png" alt="Instagram" /></a>
              <a href="#"><img src="images/twitter-icon.png" alt="Twitter" /></a>
              <a href="#"><img src="images/linkedin.png" alt="LinkedIn" /></a>
              <a href="#"><img src="images/facebook.png" alt="Facebook" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

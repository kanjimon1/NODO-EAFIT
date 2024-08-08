import React from 'react';
//import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <img src="path-to-your-logo/amadeus-logo-dark-sky.png" alt="logo amadeus" />
      <div className="dropdown">
        <button className="dropbtn">Solutions<i className="fa fa-caret-down"></i></button>
        <div className="dropdown-content">
          <div className="row">
            <div className="column">
              <h3>Solutions</h3>
              <a href="#"><i className="icon icon-airplane"></i>Airlines</a>
              <a href="#"><i className="icon icon-airport"></i>Airports</a>
              <a href="#"><i className="icon icon-corporation"></i>Corporations</a>
              <a href="#"><i className="icon icon-hospitality"></i>Hospitality</a>
              <a href="#"><i className="icon icon-travelsellers"></i>Travel Sellers</a>
            </div>
            <div className="column1">
              <h3>Solutions 2</h3>
              <img src="path-to-your-image/promo-solution.png" alt="solution"/>
            </div>
          </div>
        </div>
      </div>
      {/* Repeat dropdown for Support & Training, Partners, Resources, Company */}
    </div>
  );
};

export default Navbar;

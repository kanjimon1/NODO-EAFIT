import React from "react";
import logo from "../../pics/amadeus-logo-dark-sky.png";
import solution from "../../pics/promo-solution.png";
import support from "../../pics/promo02.png";
import training from "../../pics/promo-solution.png";
import partners from "../../pics/promo-solution5.png";
import resource from "../../pics/luis-marotto-promo.png";
import company from "../../pics/promo-solution3.png";
import company1 from "../../pics/promo-solution7.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <img alt="Amadeus" src={logo} />
      <div className="dropdown">
        <button className="dropbtn">
          Solutions<i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <div className="row">
            <div className="column">
              <h3>Solutions</h3>
              <a href="#">
                <i className="icon icon-airplane"></i>Airlines
              </a>
              <a href="#">
                <i className="icon icon-airport"></i>Airports
              </a>
              <a href="#">
                <i className="icon icon-corporation"></i>Corporations
              </a>
              <a href="#">
                <i className="icon icon-hospitality"></i>Hospitality
              </a>
              <a href="#">
                <i className="icon icon-travelsellers"></i>Travel Sellers
              </a>
            </div>
            <div className="column1">
              <h3>Solutions 2</h3>
              <img alt="Amadeus" src={solution} />
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn">
          Support & Training<i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <div class="row">
            <div class="column">
              <h3>Support & Training</h3>
              <a href="#">
                <i class="icon icon-support"></i>Support
              </a>
              <a href="#">
                <i class="icon icon-training"></i>Training
              </a>
            </div>
            <div class="column1">
              <h3>Support 2</h3>
              {/*<img src="../pics/promo02.png" alt="foto de un gatito" />*/}
              <img alt="Amadeus" src={support} />
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn">
          Partners<i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <div class="row">
            <div class="column">
              <h3>Partners</h3>
              <a href="#">
                <i class="icon icon-network"></i>Amadeus Partner Network
              </a>
              <a href="#">
                <i class="icon icon-partner"></i>Partner Marketplace
              </a>
              <a href="#">
                <i class="icon icon-market"></i>Partner Marketplace
              </a>
            </div>
            <div class="column1">
              <h3>Partners 2</h3>
              {/*<img src="../pics/promo-solution5.png" alt="foto de un gatito" />*/}
              <img alt="Amadeus" src={partners} />
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn">
          Resources<i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <div class="row">
            <div class="column">
              <h3>Resources</h3>
              <a href="#">
                <i class="icon icon-blog"></i>Amadeus Blog
              </a>
              <a href="#">
                <i class="icon icon-center"></i>Resources Center
              </a>
              <a href="#">Events</a>
            </div>
            <div class="column1">
              <h3>Resources 2</h3>
              {/*<img src="../pics/luis-marotto-promo.png" alt="foto de un gatito" />*/}
                <img alt="Amadeus" src={resource} />
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn">
          Company<i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <div class="row">
            <div class="column">
              <h3>Company</h3>
              <a href="#">
                <i class="icon icon-about"></i>About Amadeus
              </a>
              <a href="#">
                <i class="icon icon-innovation"></i>Innovation
              </a>
              <a href="#">
                <i class="icon icon-news"></i>News Room
              </a>
              <a href="#">
                <i class="icon icon-good"></i>Travel for good
              </a>
              <a href="#">
                <i class="icon icon-career"></i>Careers
              </a>
            </div>
            <div class="column1">
              <h3>Company 2</h3>
              {/*<img src="../pics/promo-solution3.png" alt="foto de un gatito" />*/}
              <img alt="Amadeus" src={company} />
              {/*<img src="../pics/promo-solution7.png" alt="foto de un gatito" />*/}
              <img alt="Amadeus" src={company1} />
            </div>
          </div>
        </div>
      </div>
      {/* Repeat dropdown for Support & Training, Partners, Resources, Company */}
    </div>
  );
};

export default Navbar;

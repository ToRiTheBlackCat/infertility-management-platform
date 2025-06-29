import React from 'react';
import IMP_logo from '../../assets/img/logo/IMP_logo.jpg';
import { Link, NavLink } from 'react-router-dom';
const Header = () => {
  const isLogin = !!localStorage.getItem('token'); // or from context or Redux

  
  return (
    <header id="home" className="header">
      {/* Header Top */}
      <div className="header-top theme-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="header-top-left text-center text-md-left">
                <ul>
                  <li><a href="#"><i className="lni lni-phone"></i> (+84) 123-456-789</a></li>
                  <li><a href="#"><i className="lni lni-envelope"></i> infertility_management@gmail.com</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="header-top-right d-none d-md-block">
                <ul>
                  <li><a href="#"><i className="lni lni-facebook-filled"></i></a></li>
                  <li><a href="#"><i className="lni lni-twitter-filled"></i></a></li>
                  <li><a href="#"><i className="lni lni-linkedin-original"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="navbar-area navbar-float">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <Link to="/" className="navbar-brand"><img src={IMP_logo} alt="Logo" /></Link>
                {/* <a className="navbar-brand" href="index.html">
                  <img src={IMP_logo} alt="Logo" />
                </a> */}
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                  <ul id="nav" className="navbar-nav ml-auto">
                  
                    <li className="nav-item">
                      <NavLink
                        to="/"
                        className={({ isActive }) => `a page-scroll ${isActive ? 'active' : ''}`}
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/bookings"
                        className={({ isActive }) => `a page-scroll ${isActive ? 'active' : ''}`}
                      >
                        Booking
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/treatments"
                        className={({ isActive }) => `a page-scroll ${isActive ? 'active' : ''}`}
                      >
                        Treatment
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/doctors"
                        className={({ isActive }) => `a page-scroll ${isActive ? 'active' : ''}`}
                      >
                        Doctor
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/blogs"
                        className={({ isActive }) => `a page-scroll ${isActive ? 'active' : ''}`}
                      >
                        Blog
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/contacts"
                        className={({ isActive }) => `a page-scroll ${isActive ? 'active' : ''}`}
                      >
                        Contact
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown user-dropdown">
                      <i className="fas fa-user user-icon"></i>
                      <ul className="user-menu">
                        {isLogin ? (
                          <>
                            <li><a href="/#">My Profile</a></li>
                            <li><a href="/#">My Booking Appointment</a></li>
                            <li><a href="/#">My Booking History</a></li>
                            <li><a href="/login">Sign Out</a></li>
                          </>
                        ) : (
                          <>
                            <li><a href="/login">Login</a></li>
                            <li><a href="/login#register">Register</a></li>
                          </>
                        )}
                      </ul>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

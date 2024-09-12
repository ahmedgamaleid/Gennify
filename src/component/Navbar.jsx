import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import backgroundImagelogo from "../img/Gennify - Transparent.png";

const Navbar = ({ username, handleLogout }) => {
  const [navBackground, setNavBackground] = useState("bg-light");
  const [textColor, setTextColor] = useState("text-dark");
  const navigate = useNavigate();

  const logout = () => {
    if (typeof handleLogout === 'function') {
      handleLogout(); // Call the handleLogout function passed as a prop
    } else {
      console.error('handleLogout is not a function');
    }
    localStorage.removeItem('token'); // Clear token from local storage
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        setNavBackground("bg-dark");
        setTextColor("text-white");
      } else {
        setNavBackground("bg-white");
        setTextColor("text-dark");
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
    <nav className={`navbar navbar-expand-md ${navBackground} mb-3`}>
      <div className="container-fluid">
        <a className={`navbar-brand fs-4 logo mx-5 ${textColor}`} href="#">
          <img src={backgroundImagelogo} style={{ width: "50px" }} alt="Logo" />
        </a>
        <button
          className="navbar-toggler border border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon border border-0"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0`}>
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'active nav-link text-warning' : `nav-link ${textColor}`
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'active nav-link text-warning' : `nav-link ${textColor}`
                    }
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'active nav-link text-warning' : `nav-link ${textColor}`
                    }
                    to="/home"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'active nav-link text-warning' : `nav-link ${textColor}`
                    }
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'active nav-link text-warning' : `nav-link ${textColor}`
                    }
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 ${textColor}`}>
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'active nav-link text-warning' : `nav-link ${textColor}`
                  }
                  to="/cart"
                >
                  <i className="fa-solid fa-cart-shopping px-4 fs-4 align-right"></i>
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <div className="dropdown">
                <button
                  className={`btn rounded-5 ${textColor} px-4 border-warning border-3`}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {username}
                </button>
                <ul className="dropdown-menu border-0">
                  <li className="d-flex justify-content-center align-items-center text-left border-0">
                    <button className="dropdown-item border-0" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { animateScroll as scroll, Link } from "react-scroll";
import ThemeToggle from "./components/UI/ThemeToggle";
import { useTheme } from "./context/ThemeContext";

function Header() {
  const [navbar, setNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const changebackground = () => {
      if (window.scrollY >= 80) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };

    window.addEventListener("scroll", changebackground, { passive: true });
    return () => window.removeEventListener("scroll", changebackground);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="nav-row" id="nav-row">
      <nav
        className={
          navbar
            ? "navbar active navbar-expand-lg navbar-light"
            : "navbar navbar-expand-lg navbar-light"
        }
      >
        <div className="container">
          <a
            onClick={() => {
              scroll.scrollToTop();
              closeMenu();
            }}
            style={{ cursor: "pointer" }}
            className="navbar-brand-link"
          >
            <img
              src="./img/logo6.png"
              style={{ width: "90px", height: "auto", maxHeight: "90px" }}
              alt="logo"
            />
          </a>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="d-flex align-items-center d-lg-none">
            <ThemeToggle className="theme-toggle-mobile me-2" />
            <button
              className={`navbar-toggler-custom ${isOpen ? "open" : ""}`}
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <span className="toggler-icon-bar"></span>
              <span className="toggler-icon-bar"></span>
              <span className="toggler-icon-bar"></span>
            </button>
          </div>

          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarTogglerDemo01"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navbarnav align-items-lg-center">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="about"
                  spy={true}
                  activeClass="active-link"
                  smooth={true}
                  duration={800}
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="skill"
                  spy={true}
                  activeClass="active-link"
                  smooth={true}
                  duration={800}
                  onClick={closeMenu}
                >
                  Skills
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="exprience"
                  spy={true}
                  activeClass="active-link"
                  smooth={true}
                  duration={800}
                  onClick={closeMenu}
                >
                  Experience
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="contact"
                  spy={true}
                  activeClass="active-link"
                  smooth={true}
                  duration={800}
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </li>

              {/* Desktop Theme Toggle */}
              <li className="nav-item ms-lg-3 d-none d-lg-flex align-items-center">
                <ThemeToggle />
              </li>

              {/* Mobile Drawer Mode Toggle */}
              <li className="nav-item d-lg-none mt-3 pt-2 w-100">
                <div className="d-flex align-items-center justify-content-between px-3 py-2 glass-card rounded-3">
                  <span
                    className="font-mono"
                    style={{ fontSize: "14px", color: "var(--text-secondary)" }}
                  >
                    {theme === "dark" ? "Mode: Dark" : "Mode: Light"}
                  </span>
                  <ThemeToggle showLabel={false} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;

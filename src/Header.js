import React, { useState } from "react";
import { animateScroll as scroll, Link } from "react-scroll";

function Header({ toggleConfig }) {
  const [navbar, setNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const changebackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changebackground);

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
          >
            <img
              src="./img/logo6.png"
              style={{ width: "90px", height: "auto", maxHeight: "90px" }}
              alt="logo"
            />
          </a>
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
          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarTogglerDemo01"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navbarnav">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="about"
                  spy={true}
                  activeClass="active-link"
                  smooth={true}
                  duration={1000}
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
                  duration={1000}
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
                  duration={1000}
                  onClick={closeMenu}
                >
                  Experience
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className="nav-link"
                  to="project"
                  spy={true}
                  activeClass="active-link"
                  smooth={true}
                  duration={1000}
                  onClick={closeMenu}
                >
                  Projects
                </Link>
              </li> */}
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="contact"
                  spy={true}
                  activeClass="active-link"
                  smooth={true}
                  duration={1000}
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href="#configure"
                  className="nav-link nav-link-configure"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleConfig();
                    closeMenu();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="18"
                    height="18"
                    className="gear-icon"
                  >
                    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
                  </svg>
                  Configure
                </a>
              </li>
              {/* <li className="nav-item">
                <a
                  href="./img/Het_resume.pdf"
                  target="_blank"
                  className="nav-link"
                  onClick={closeMenu}
                >
                  Resume
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;

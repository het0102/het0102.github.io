import React, { useState } from "react";
import { animateScroll as scroll, Link } from "react-scroll";

function Header() {
  const [navbar, setNavbar] = useState(false);

  const changebackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changebackground);

  return (
    <div className="nav-row" id="nav-row">
      <nav
        className={
          navbar
            ? "navbar active navbar-expand-lg navbar-light"
            : "navbar navbar-expand-lg navbar-light"
        }
      >
        <div className="container-fluid">
          <a onClick={() => scroll.scrollToTop()} style={{ cursor: "pointer" }}>
            <img
              src="./img/logo6.png"
              style={{ width: "90px", height: "auto", maxHeight: "90px" }}
              alt="logo"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0 navbarnav">
              {/*<li className="nav-item">
		          <Link className="nav-link active" aria-current="page" to="home" smooth={true} duration={1000}>Home</Link>
		        </li>*/}
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="about"
                  smooth={true}
                  duration={1000}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="skill"
                  smooth={true}
                  duration={1000}
                >
                  Skills
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="exprience"
                  smooth={true}
                  duration={1000}
                >
                  Exprience
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="statistics"
                  smooth={true}
                  duration={1000}
                >
                  Statistics
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="project"
                  smooth={true}
                  duration={1000}
                >
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="contact"
                  smooth={true}
                  duration={1000}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href="./img/Het_resume.pdf"
                  target="_blank"
                  className="nav-link"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;

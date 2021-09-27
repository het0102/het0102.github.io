import React from "react";
import { animateScroll as scroll, Link } from "react-scroll";

const Footer = () => {
  return (
    <>
      <div class="py-3 footer">
        <div class="container">
          <div class="row d-flex align-items-center justify-content-center">
            <div class="col-lg-5 col-xs-12 d-grid align-items-center justify-content-center">
              <h2 class="footer-content mb-4">Your Dream My Code</h2>
              <p class="text-white footer-content">
                There are three responses to a piece of design — yes, no, and
                WOW! Wow is the one to aim for.{" "}
              </p>
            </div>
            <div class="col-lg-3 col-xs-12 d-flex justify-content-center align-items-center">
              <div
                onClick={() => scroll.scrollToTop()}
                style={{ cursor: "pointer" }}
              >
                <img
                  src="./img/logo4.png"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    maxWidth: "250px",
                  }}
                  alt="logo"
                />
              </div>
            </div>
            <div class="col-lg-4 col-xs-12 footer-content">
              <h4 class="mt-lg-0 mt-sm-4 footer-content mb-4">Contact Us :</h4>

              <a
                href="https://www.facebook.com/profile.php?id=100004012895795"
                target="_blank"
                className=""
              >
                <img
                  src="./img/facebook.png"
                  className="pruthatek-footer-facebook m-2 social-logo"
                />
              </a>
              <a
                href="https://www.instagram.com/__mr.__unique___/"
                target="_blank"
                className=""
              >
                <img
                  src="./img/insta.png"
                  className="pruthatek-footer-insta m-2 social-logo"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/het-shah-4200751b2/"
                target="_blank"
                className=""
              >
                <img
                  src="./img/linkdin.png"
                  className="pruthatek-footer-linkedin m-2 social-logo"
                />
              </a>
              <a href="https://mail.google.com/" target="_blank" className="">
                <img
                  src="./img/gmail-2.png"
                  className="pruthatek-footer-insta m-2 social-logo"
                />
              </a>
            </div>
          </div>
          <div class="row mt-3">
            <hr />
            <div class="col copyright">
              <p class="footer-content">
                <small class="text-white-50">
                  © 2021. All Rights Reserved | Developed by{" "}
                  <a
                    href="https://www.linkedin.com/in/het-shah-4200751b2/"
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "rgba(0,212,255,1)",
                    }}
                  >
                    Het Shah
                  </a>{" "}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

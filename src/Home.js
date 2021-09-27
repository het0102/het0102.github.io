import React, { Component } from "react";

import About from "./About";
import Skill from "./Skill";
import Exprience from "./Exprience";
import Contact from "./Contact";
import Project from "./Project";
import Statistics from "./Statistics";

import Header from "./Header";
import Footer from "./Footer";

import { Link } from "react-scroll";
import Typewriter from "typewriter-effect";
import Fade from "react-reveal/Fade";

class Home extends React.Component {
  render() {
    return (
      <>
        <Header />

        <section id="home">
          <div className="container-fluid">
            <div className="row home d-flex justify-content-center">
              <div className="col-md-12 wallpaper">
                <Fade big>
                  <div>
                    <h1 class="content">
                      I'M Designer & Frontend
                      <br /> Developer.
                    </h1>
                    <p class="content2 mt-3">
                      Hi there! I am{" "}
                      <strong>
                        &nbsp;Het Shah. A passionate programmer and a Learner,
                        born and brought up in India.
                        <br /> I am a Frontend Web Developer with React.js,
                        Redux, Express.js, Node.js as my tech stack.
                      </strong>
                    </p>
                  </div>
                </Fade>

                <div className="sub">
                  <Typewriter
                    options={{
                      strings: [
                        "Frontend Developer",
                        "Learner",
                        "Web Designer",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                    }}
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-outline-secondary content3 d-block mx-auto mt-3"
                  style={{ marginBottom: "180px" }}
                >
                  <Link to="contact" smooth={true} duration={1000}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-emoji-smile mb-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                    </svg>{" "}
                    &nbsp;Hire me
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="about">
          <About />
        </section>

        <section id="skill">
          <Skill />
        </section>

        <section id="exprience">
          <Exprience />
        </section>

        <section id="statistics">
          <Statistics />
        </section>

        <section id="project">
          <Project />
        </section>

        <section id="contact">
          <Contact />
        </section>

        <Footer />
      </>
    );
  }
}

export default Home;

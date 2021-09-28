import React from "react";
import Fade from "react-reveal/Fade";

const mystyle = {
  height: "auto",
  width: "100%",
  objectFit: "cover",
  maxHeight: "300px",
};

const mystyle2 = {
  fontSize: "larger",
  color: "darkblue",
};

const Project = () => {
  return (
    <div className="container-fluid skill">
      <div className="row skill d-flex justify-content-center mx-auto">
        <h1 className="pt-3 text-center my-5 text-white">
          <strong>Projects</strong>
        </h1>

        <Fade left>
          <div className="col-md-4 d-flex justify-content-center mb-5">
            <div className="card">
              <img
                src="./img/reactjsimg2.png"
                className="card-img-top image"
                alt="image"
                style={mystyle}
              />
              <div className="card-body">
                <h5 className="card-title text-center my-3">
                  <h3>
                    <b>Pruthatek.app</b>
                  </h3>
                </h5>
                <p className="card-text" style={mystyle2}>
                  <strong>Description :</strong>&nbsp;Convert your website to an
                  app with just your URL in less than 24 hours.
                </p>
                <p className="card-text" style={mystyle2}>
                  <strong>Technology Used :</strong>&nbsp;Reactjs, Nodejs,
                  Expressjs, MySQL.
                </p>
                <a
                  href="https://pruthatek.app"
                  target="_blank"
                  className="btn btn-outline-primary d-block mx-auto"
                  style={{ width: "fit-content" }}
                >
                  View Project Live&nbsp;
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-double-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Fade>

        <div className="col-md-4 d-flex justify-content-center mb-5">
          <div className="card">
            <img
              src="./img/reactjsimg3.png"
              className="card-img-top image"
              alt="image"
              style={mystyle}
            />
            <div className="card-body">
              <h5 className="card-title text-center my-3">
                <h3>
                  <b>The tiger.live</b>
                </h3>
              </h5>
              <p className="card-text" style={mystyle2}>
                <strong>Description :</strong>&nbsp;It is a price recommendation
                tool for amazon products, that can track prices of products.
              </p>
              <p className="card-text" style={mystyle2}>
                <strong>Technology Used :</strong>&nbsp;Reactjs, Python, Django,
                MongoDB.
              </p>
              <a
                href="https://thetiger.live"
                target="_blank"
                className="btn btn-outline-primary d-block mx-auto"
                style={{ width: "fit-content" }}
              >
                View Project Live&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-double-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <Fade right>
          <div className="col-md-4 d-flex justify-content-center mb-5">
            <div className="card">
              <img
                src="./img/reactjsimg.png"
                className="card-img-top image"
                alt="image"
                style={mystyle}
              />
              <div className="card-body">
                <h5 className="card-title text-center my-3">
                  <h3>
                    <b>Pruthatek.com</b>
                  </h3>
                </h5>
                <p className="card-text" style={mystyle2}>
                  <strong>Description :</strong>&nbsp;I have rebuild company's
                  website on reactjs.
                </p>
                <p className="card-text" style={mystyle2}>
                  <strong>Technology Used :</strong>&nbsp;Reactjs, Nodejs,
                  Expressjs, MySQL.
                </p>
                <a
                  href="https://pruthatek.com"
                  target="_blank"
                  className="btn btn-outline-primary d-block mx-auto"
                  style={{ width: "fit-content" }}
                >
                  View Project Live&nbsp;
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-double-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Project;

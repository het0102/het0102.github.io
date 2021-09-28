import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Tilt from "react-tilt";

const Experience = () => {
  return (
    <div className="skill pb-5" id="experience">
      <h1 className="text-center text-white">
        <strong>Experience</strong>
      </h1>
      <br />
      <br />
      <Container>
        <Tilt>
          <Card>
            <Card.Header
              as="h5"
              className="d-flex justify-content-center flex-wrap"
            >
              <Card.Img
                variant="top"
                className="img-resize"
                src="./img/pruthatek.png"
                alt="Company logo"
              />
            </Card.Header>
            <Card.Body className="d-flex justify-content-center flex-column">
              <div>
                <Card.Text className="text-center style">
                  <strong className="body-title-style">
                    Frontend Web Developer
                  </strong>
                  <br />
                  <strong>Technology:</strong> React JS
                  <br />
                  <strong>Duration:</strong> June 2020 - March 2021
                  <br />
                  <strong> Description </strong>
                  <ul className="" style={{ textAlign: "left" }}>
                    <li>
                      <strong>Developed &amp; enhanced</strong> multiple
                      features with customizability option across web
                      application.
                    </li>
                    <li>
                      <strong>Developed</strong> Price recommendation system UI
                      for amazon products. (website name:"thetiger.live")
                    </li>
                    <li>
                      <strong>Developed</strong> UI for Converter-convert your
                      website to an app. (website name:"pruthatek.app")
                    </li>
                    <li>
                      <strong>Rebuild</strong> Company's website on Reactjs.
                      (website name:"pruthatek.com")
                    </li>
                    <li>
                      <strong>Provided</strong> application maintenance while
                      working as `Production Support`.
                    </li>
                  </ul>
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Tilt>
      </Container>
    </div>
  );
};

export default Experience;

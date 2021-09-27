import React from "react";
import AnimatedNumber from "animated-number-react";
import Card from "react-bootstrap/Card";

const Statistics = () => {
  return (
    <div className="skill pb-5">
      <h1 className="pt-3 text-center pb-5 text-white">
        <strong>Statistics</strong>
      </h1>
      <Card className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-3">
            <Card.Header
              as="h4"
              className="d-flex justify-content-center flex-wrap bg-white"
            >
              <b>Total Projects Done</b>
            </Card.Header>
            <Card.Body className="d-flex justify-content-center flex-column">
              <div>
                <Card.Text className="text-center style">
                  <b>
                    <AnimatedNumber value="5" duration="3000" delay="5000" />
                  </b>
                </Card.Text>
              </div>
            </Card.Body>
          </div>
          <div className="col-md-3">
            <Card.Header
              as="h4"
              className="d-flex justify-content-center flex-wrap bg-white"
            >
              <b>Total Repo's on Github</b>
            </Card.Header>
            <Card.Body className="d-flex justify-content-center flex-column">
              <div>
                <Card.Text className="text-center style">
                  <b>
                    <AnimatedNumber value="10" duration="3000" delay="5000" />
                  </b>
                </Card.Text>
              </div>
            </Card.Body>
          </div>
          <div className="col-md-3">
            <Card.Header
              as="h4"
              className="d-flex justify-content-center flex-wrap bg-white"
            >
              <b>LinkedIn Connections</b>
            </Card.Header>
            <Card.Body className="d-flex justify-content-center flex-column">
              <div>
                <Card.Text className="text-center style">
                  <b>
                    <AnimatedNumber value="1000" duration="3000" delay="5000" />
                  </b>
                </Card.Text>
              </div>
            </Card.Body>
          </div>
          <div className="col-md-3">
            <Card.Header
              as="h4"
              className="d-flex justify-content-center flex-wrap bg-white"
            >
              <b>Total Work Experience (Months)</b>
            </Card.Header>
            <Card.Body className="d-flex justify-content-center flex-column">
              <div>
                <Card.Text className="text-center style">
                  <b>
                    <AnimatedNumber value="16" duration="3000" delay="5000" />
                  </b>
                </Card.Text>
              </div>
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Statistics;

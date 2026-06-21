import React from "react";
import AnimatedNumber from "animated-number-react";
import Fade from "react-reveal/Fade";

const Statistics = () => {
  const stats = [
    { value: 5, label: "Years Experience", suffix: "+" },
    { value: 15, label: "Projects Completed", suffix: "+" },
    { value: 4, label: "Professional Awards", suffix: "" },
    { value: 2000, label: "LinkedIn Network", suffix: "+" },
  ];

  const awards = [
    {
      title: "Achiever of the Quarter",
      organization: "Commerce Pundit Technologies",
      year: "2025",
    },
    {
      title: "Rising Star Award",
      organization: "Commerce Pundit Technologies",
      year: "2024",
    },
    {
      title: "Star Performer of the Month",
      organization: "Commerce Pundit Technologies",
      year: "2023",
    },
    {
      title: "Star Performer of the Month",
      organization: "Commerce Pundit Technologies",
      year: "2022",
    },
  ];

  return (
    <div className="container my-5">
      {/* Stat Numbers */}
      <div className="row g-4 justify-content-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="col-6 col-md-3">
            <Fade bottom delay={idx * 100}>
              <div className="glass-panel stat-box">
                <div className="stat-number">
                  <AnimatedNumber
                    value={stat.value}
                    duration={2000}
                    formatValue={(v) => Math.round(v)}
                  />
                  {stat.suffix}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </Fade>
          </div>
        ))}
      </div>

      {/* Awards Section */}
      <div className="section-title mt-5 pt-4">
        <h2>Awards & Recognition</h2>
      </div>

      <div className="row g-4 mt-4 justify-content-center">
        {awards.map((award, idx) => (
          <div key={idx} className="col-lg-3 col-md-6">
            <Fade bottom delay={idx * 120}>
              <div className="glass-panel p-4 text-center h-100 d-flex flex-column justify-content-center align-items-center">
                <div
                  className="mb-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "rgba(138, 43, 226, 0.15)",
                    border: "1px solid rgba(138, 43, 226, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "var(--glow-purple)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-trophy"
                    viewBox="0 0 16 16"
                    style={{ color: "var(--color-purple)" }}
                  >
                    <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.319.232.319.437a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5c0-.205.125-.389.319-.437L4.25 13.62v-2.17c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.012-.48-.02-1.029-.02-1.618H2.599zM14 5.605A2 2 0 0 0 13.381 1.63a20.09 20.09 0 0 1-.02 1.619H14zM4 1h8v1h-8V1z" />
                  </svg>
                </div>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    marginBottom: "8px",
                    fontFamily: "var(--font-orbitron)",
                  }}
                >
                  {award.title}
                </h4>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    marginBottom: "4px",
                  }}
                >
                  {award.organization}
                </p>
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--color-cyan)",
                    fontWeight: "600",
                  }}
                >
                  {award.year}
                </span>
              </div>
            </Fade>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;

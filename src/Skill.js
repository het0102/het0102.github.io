import React from "react";
import Fade from "react-reveal/Fade";

const Skill = () => {
  const skillsData = [
    {
      category: "Frontend",
      skills: [
        { name: "React.js", level: 95, colorClass: "" },
        { name: "Angular.js / Angular", level: 85, colorClass: "purple-fill" },
        { name: "JavaScript (ES6+)", level: 90, colorClass: "" },
        { name: "HTML5 & CSS3", level: 95, colorClass: "purple-fill" },
      ],
    },
    {
      category: "Backend & Database",
      skills: [
        { name: "Node.js / Express.js", level: 90, colorClass: "purple-fill" },
        { name: "REST APIs Architecture", level: 95, colorClass: "" },
        { name: "MongoDB", level: 88, colorClass: "purple-fill" },
      ],
    },
    {
      category: "Tools & Methodologies",
      skills: [
        { name: "Git & Version Control", level: 90, colorClass: "" },
        {
          name: "RabbitMQ (Message Queuing)",
          level: 85,
          colorClass: "purple-fill",
        },
        { name: "Agile / Scrum Methodologies", level: 92, colorClass: "" },
        {
          name: "Unit Testing & Deployment",
          level: 88,
          colorClass: "purple-fill",
        },
      ],
    },
  ];

  return (
    <div className="container my-5">
      <div className="section-title">
        <h2>Technical Expertise</h2>
      </div>

      <div className="row mt-5 g-4 justify-content-center">
        {skillsData.map((cat, idx) => (
          <div key={idx} className="col-lg-4 col-md-6">
            <Fade bottom delay={idx * 150}>
              <div className="glass-panel skill-category">
                <h3>{cat.category}</h3>
                <div className="mt-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-item">
                      <div className="skill-name-percent">
                        <span>{skill.name}</span>
                        <span
                          style={{
                            color: skill.colorClass
                              ? "var(--color-purple)"
                              : "var(--color-cyan)",
                          }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div className="skill-progress-bar">
                        <div
                          className={`skill-progress-fill ${skill.colorClass}`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Fade>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skill;

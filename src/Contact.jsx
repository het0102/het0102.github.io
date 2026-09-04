import React, { useState } from "react";
import Fade from "react-reveal/Fade";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="container my-5">
      <div className="section-title">
        <h2>Get In Touch</h2>
      </div>

      <div className="row mt-5 g-4 justify-content-center">
        <div className="col-lg-10 glass-panel contact-container">
          <div className="row g-5">
            {/* Left side: Contact info */}
            <div className="col-md-5 contact-info-panel">
              <Fade left>
                <h3>Let's build something epic!</h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: "1.7",
                    marginBottom: "30px",
                  }}
                >
                  I'm currently accepting projects and senior development
                  opportunities. Reach out via email, phone, or any of the
                  social links below.
                </p>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="contact-details">
                    <h4>Direct Email</h4>
                    <a href="mailto:hetshah106@gmail.com">
                      hetshah106@gmail.com
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 00.096.867l-1.13 1.13a11.86 11.86 0 005.478 5.478l1.13-1.13a1 1 0 01.867-.096l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="contact-details">
                    <h4>Hotline</h4>
                    <p>+91 7990035728</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="contact-details">
                    <h4>Base Location</h4>
                    <p>Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
              </Fade>
            </div>

            {/* Right side: Contact form */}
            <div className="col-md-7">
              <Fade right>
                <form
                  onSubmit={handleSubmit}
                  className="d-flex flex-column gap-3"
                >
                  <div>
                    <label
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        marginBottom: "6px",
                      }}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      className="cyber-input"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        marginBottom: "6px",
                      }}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      className="cyber-input"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        marginBottom: "6px",
                      }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      className="cyber-input"
                      placeholder="Project Proposal"
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState({ ...formState, subject: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        marginBottom: "6px",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      required
                      className="cyber-input"
                      placeholder="Let's build a new application..."
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                    />
                  </div>

                  <button type="submit" className="btn btn-cyber mt-2 w-100">
                    {sent ? "TRANSMISSION SENT!" : "INITIATE TRANSMISSION"}
                  </button>
                </form>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

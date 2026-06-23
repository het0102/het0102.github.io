import React from "react";

const Configurator = ({ isOpen, onClose, currentTheme, setTheme }) => {
  const options = [
    {
      id: "developer",
      title: "1. Core Developer",
      desc: "Default workspace featuring rotating cybernetic starfields and interactive particle grids.",
      tag: "Software Engineering",
      colorClass: "theme-cyan-purple",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
    {
      id: "oil",
      title: "2. Food Business",
      desc: "Simulate an Food and Oil business theme with gold fluid dynamics and rising golden bubble particles.",
      tag: "E-Commerce / Food Tech",
      colorClass: "theme-gold",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
    {
      id: "fashion",
      title: "3. T-Shirts & Apparel",
      desc: "Simulate a fashion retail layout with spinning hanger meshes and floating neon threads.",
      tag: "Apparel Retail / Fashion",
      colorClass: "theme-pink",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
    },
    {
      id: "interior",
      title: "4. Interior Designer",
      desc: "Architectural blueprint layout showing rotating rooms, furniture contours, and moving spotlights.",
      tag: "Interior Design / Creative",
      colorClass: "theme-teal",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: "builder",
      title: "5. Builder & Civil Eng",
      desc: "Real estate scaffolding simulation displaying wireframe skyscrapers and climbing grid cranes.",
      tag: "Real Estate / Civil Eng",
      colorClass: "theme-orange",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      id: "cosmos",
      title: "6. Space Cosmos",
      desc: "Stunning 3D planetary simulation featuring textured celestial rings and glowing nebulae.",
      tag: "Cosmos & Aerospace",
      colorClass: "theme-cosmos",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Background backdrop blur overlay */}
      <div
        className={`configurator-backdrop ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Configurator Drawer Panel */}
      <div className={`cyber-configurator ${isOpen ? "open" : ""}`}>
        <div className="configurator-header">
          <div>
            <h3 className="text-cyber-config">CYBER PANEL</h3>
            <p className="configurator-subtitle">
              Configure webiste in 3D with different ideas.
            </p>
          </div>
          <button
            className="btn-close-config"
            onClick={onClose}
            aria-label="Close panel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="24"
              height="24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="configurator-content">
          {/* <div className="configurator-alert">
            <p>
              <strong>Interactive Demo:</strong> Changing the 3D effect adapts
              the WebGL space to suit different client businesses. The resume
              content remains fully intact.
            </p>
          </div> */}

          <div className="options-container">
            {options.map((opt) => (
              <div
                key={opt.id}
                className={`config-option-card glass-card ${currentTheme === opt.id ? `active ${opt.colorClass}` : ""}`}
                onClick={() => {
                  setTheme(opt.id);
                  onClose();
                }}
              >
                <div className="option-card-header">
                  <div className={`option-icon-box ${opt.colorClass}`}>
                    {opt.icon}
                  </div>
                  <span className={`option-tag ${opt.colorClass}`}>
                    {opt.tag}
                  </span>
                </div>
                <h4 className="option-title">{opt.title}</h4>
                <p className="option-desc">{opt.desc}</p>
                <div className="active-indicator">
                  <span className="dot"></span>
                  {currentTheme === opt.id ? "ACTIVE SIMULATION" : "SIMULATE"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="configurator-footer">
          <p>&copy; Het Shah &bull; 3D Portfolio customizer</p>
        </div>
      </div>
    </>
  );
};

export default Configurator;

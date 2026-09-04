import React from 'react';
import Marquee from 'react-fast-marquee';
import { FaReact, FaAngular, FaNodeJs, FaGitAlt, FaDocker } from 'react-icons/fa';
import {
  SiTypescript,
  SiMongodb,
  SiRabbitmq,
  SiJavascript,
  SiThreedotjs,
  SiExpress,
  SiRedux,
} from 'react-icons/si';
import { useTheme } from '../../context/ThemeContext';

export const TechMarquee = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const marqueeBgColor = isDark ? '#0b0c10' : '#f8fafc';

  const techItems = [
    { name: 'React.js', icon: <FaReact color="#00f2fe" />, color: '#00f2fe' },
    { name: 'Angular', icon: <FaAngular color="#dd0031" />, color: '#dd0031' },
    { name: 'Node.js', icon: <FaNodeJs color="#68a063" />, color: '#68a063' },
    { name: 'TypeScript', icon: <SiTypescript color="#3178c6" />, color: '#3178c6' },
    { name: 'JavaScript (ES6+)', icon: <SiJavascript color="#f7df1e" />, color: '#f7df1e' },
    { name: 'Three.js / R3F', icon: <SiThreedotjs color="#00f2fe" />, color: '#00f2fe' },
    { name: 'MongoDB', icon: <SiMongodb color="#47a248" />, color: '#47a248' },
    { name: 'RabbitMQ', icon: <SiRabbitmq color="#ff6600" />, color: '#ff6600' },
    { name: 'Express.js', icon: <SiExpress color={isDark ? '#ffffff' : '#0f172a'} />, color: isDark ? '#ffffff' : '#0f172a' },
    { name: 'Docker', icon: <FaDocker color="#2496ed" />, color: '#2496ed' },
    { name: 'Git & GitHub', icon: <FaGitAlt color="#f05032" />, color: '#f05032' },
    { name: 'Redux', icon: <SiRedux color="#764abc" />, color: '#764abc' },
  ];

  return (
    <div className="tech-marquee-wrapper my-5">
      <div className="container-fluid px-0">
        <div className="marquee-gradient-overlay">
          <Marquee
            gradient={true}
            gradientColor={marqueeBgColor}
            gradientWidth={80}
            speed={45}
            pauseOnHover={true}
          >
            {techItems.map((tech, idx) => (
              <div key={idx} className="tech-marquee-item mx-3">
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default TechMarquee;

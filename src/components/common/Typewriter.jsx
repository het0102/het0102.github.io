import React, { useState, useEffect } from 'react';

export const Typewriter = ({ options = {} }) => {
  const {
    strings = ['Developer', 'Architect'],
    loop = true,
    delay = 50,
    deleteSpeed = 30,
    pauseFor = 1500,
  } = options;

  const [text, setText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentString = strings[stringIndex] || '';
    let timer;

    if (!isDeleting && text === currentString) {
      // Completed typing current string, pause before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseFor);
    } else if (isDeleting && text === '') {
      // Completed deleting, switch to next string
      setIsDeleting(false);
      setStringIndex((prev) => (prev + 1) % strings.length);
    } else {
      // Typing or deleting character
      const speed = isDeleting ? deleteSpeed : delay;
      timer = setTimeout(() => {
        if (!isDeleting) {
          setText(currentString.slice(0, text.length + 1));
        } else {
          setText(currentString.slice(0, text.length - 1));
        }
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, stringIndex, strings, delay, deleteSpeed, pauseFor]);

  return (
    <span className="typewriter-container">
      <span className="typewriter-text">{text}</span>
      <span className="typewriter-cursor" style={{ animation: 'blink 1s infinite' }}>
        |
      </span>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typewriter-cursor {
          color: var(--accent-cyan, #00f2fe);
          margin-left: 2px;
          font-weight: 700;
        }
      `}</style>
    </span>
  );
};

export default Typewriter;

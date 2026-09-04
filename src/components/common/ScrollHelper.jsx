import React from 'react';

export const Link = ({
  to,
  children,
  className = '',
  offset = 0,
  onClick,
  ...props
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);

    if (to) {
      const target = document.getElementById(to);
      if (target) {
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset + offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <a
      href={`#${to}`}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
};

export const animateScroll = {
  scrollToTop: (options = {}) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  },
  scrollTo: (position, options = {}) => {
    window.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  },
};

export const scroller = {
  scrollTo: (to, { offset = 0 } = {}) => {
    const target = document.getElementById(to);
    if (target) {
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  },
};

export default { Link, animateScroll, scroller };

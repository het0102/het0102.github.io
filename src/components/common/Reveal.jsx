import React from 'react';

export const Fade = ({ children, className = '', ...rest }) => (
  <div className={`reveal-on-scroll ${className}`} {...rest}>
    {children}
  </div>
);

export const Tada = ({ children, className = '', ...rest }) => (
  <span className={`reveal-on-scroll ${className}`} {...rest}>
    {children}
  </span>
);

export const Zoom = ({ children, className = '', ...rest }) => (
  <div className={`reveal-on-scroll ${className}`} {...rest}>
    {children}
  </div>
);

export const Bounce = ({ children, className = '', ...rest }) => (
  <div className={`reveal-on-scroll ${className}`} {...rest}>
    {children}
  </div>
);

export default Fade;

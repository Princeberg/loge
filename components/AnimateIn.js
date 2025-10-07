'use client';
import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';

export default function AnimateIn({
  children,
  className = "",
  index = 0,
  threshold = 0.15,
  duration = 900,
  distance = 18,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const delay = Math.min(index * 120, 1200);
  const style = {
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    transitionDelay: `${delay}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : `translateY(${distance}px)`,
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}

AnimateIn.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  index: PropTypes.number,
  threshold: PropTypes.number,
  duration: PropTypes.number,
  distance: PropTypes.number,
};